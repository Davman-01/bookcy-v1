"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  ChevronLeft, Store, Lock, User, Users, ArrowRight, 
  CheckCircle2, XCircle, Upload, MessageCircle, X
} from 'lucide-react';

const cyprusRegions = ["Girne", "Lefkoşa", "Mağusa", "İskele", "Güzelyurt", "Lefke"];
const packages = [
  { name: "Standard", price: "£60 / Ay" }, 
  { name: "Premium", price: "£100 / Ay" }
];
const categories = [ 
  { key: "barber", dbName: "Berber" }, 
  { key: "hair", dbName: "Kuaför" }, 
  { key: "nail", dbName: "Tırnak & Güzellik" }, 
  { key: "tattoo", dbName: "Dövme" }, 
  { key: "spa", dbName: "Spa & Masaj" }, 
  { key: "skincare", dbName: "Cilt Bakımı" }, 
  { key: "makeup", dbName: "Makyaj" }, 
  { key: "club", dbName: "Bar & Club" } 
];

export default function BusinessAuthPage() {
  const router = useRouter();
  
  // Sayfa modları: 'login' veya 'register'
  const [mode, setMode] = useState('login'); 
  
  // --- GİRİŞ (LOGIN) STATELERİ ---
  const [loginType, setLoginType] = useState('owner');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginStaffName, setLoginStaffName] = useState('');
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  // --- KAYIT (REGISTER) STATELERİ ---
  const [newShop, setNewShop] = useState({ 
    name: '', category: 'Berber', location: 'Girne', address: '', maps_link: '', 
    phoneCode: '+90', contactPhone: '', contactInsta: '', contactEmail: '', 
    username: '', password: '', email: '', description: '', logoFile: null, package: 'Standard' 
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  
  const [emailValid, setEmailValid] = useState(null);
  const [phoneValid, setPhoneValid] = useState(null);
  const [adminEmailValid, setAdminEmailValid] = useState(null);

  // Tüm işletmeleri çek (Giriş doğrulaması için)
  const [shops, setShops] = useState([]);
  
  useEffect(() => {
    async function fetchShops() {
      const { data } = await supabase.from('shops').select('*');
      if (data) setShops(data);
    }
    fetchShops();
  }, []);

  // --- DOĞRULAMA FONKSİYONLARI ---
  const handleEmailChange = (e) => {
    const val = e.target.value;
    setNewShop(prev => ({...prev, email: val}));
    setEmailValid(val === '' ? null : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
  };
  const handleAdminEmailChange = (e) => {
    const val = e.target.value;
    setNewShop(prev => ({...prev, contactEmail: val}));
    setAdminEmailValid(val === '' ? null : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val));
  };
  const handlePhoneChange = (e) => {
    const val = e.target.value;
    setNewShop(prev => ({...prev, contactPhone: val}));
    setPhoneValid(val === '' ? null : val.replace(/\s/g, '').length >= 7);
  };

  // --- GİRİŞ YAPMA İŞLEMİ ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    const inputUser = loginUsername.trim().toLowerCase();
    const inputPass = loginPassword.trim();
    const shop = shops.find(s => s.admin_username?.toLowerCase() === inputUser);
    
    if (!shop) { 
      alert("Hatalı İşletme Kullanıcı Adı!"); 
      setIsLoginLoading(false); 
      return; 
    }
    if (shop.status !== 'approved' && shop.status) { 
      alert("Hesabınız henüz onaylanmamış! Lütfen dekontunuzu iletip onay bekleyiniz."); 
      setIsLoginLoading(false); 
      return; 
    }
    
    if (loginType === 'owner') {
      if (shop.admin_password !== inputPass) { 
        alert("Hatalı Şifre!"); 
        setIsLoginLoading(false); 
        return; 
      }
      localStorage.setItem('bookcy_biz_session', JSON.stringify({ role: 'owner', shopData: shop }));
      setIsLoginLoading(false); 
      router.push('/dashboard');
    } else {
      const staffList = shop.staff || [];
      const validStaff = staffList.find(s => s.name.toLowerCase() === loginStaffName.trim().toLowerCase() && s.password === inputPass);
      if (!validStaff) { 
        alert("Hatalı Personel Adı veya Şifre!"); 
        setIsLoginLoading(false); 
        return; 
      }
      localStorage.setItem('bookcy_biz_session', JSON.stringify({ role: 'staff', staffName: validStaff.name, shopData: shop }));
      setIsLoginLoading(false); 
      router.push('/dashboard');
    }
  };

  // --- KAYIT OLMA İŞLEMİ ---
  async function handleRegisterSubmit(e) {
    e.preventDefault();
    if (emailValid === false || phoneValid === false || adminEmailValid === false) {
      return alert("Lütfen iletişim bilgilerinizi doğru formatta giriniz.");
    }
    
    setIsUploading(true);
    let uploadedLogoUrl = null;
    
    if (newShop.logoFile) {
      const fileName = `${Math.random()}.${newShop.logoFile.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('logos').upload(fileName, newShop.logoFile);
      if (!uploadError) {
        uploadedLogoUrl = supabase.storage.from('logos').getPublicUrl(fileName).data.publicUrl;
      }
    }
    
    const fullPhone = newShop.phoneCode + " " + newShop.contactPhone;

    const { error } = await supabase.from('shops').insert([
      { 
        name: newShop.name, 
        category: newShop.category, 
        location: newShop.location, 
        address: newShop.address, 
        maps_link: newShop.maps_link, 
        admin_email: newShop.email, 
        admin_username: newShop.username, 
        admin_password: newShop.password, 
        description: newShop.description, 
        logo_url: uploadedLogoUrl, 
        package: newShop.package, 
        status: 'pending', 
        contact_phone: fullPhone, 
        contact_insta: newShop.contactInsta, 
        contact_email: newShop.contactEmail, 
        services: [], 
        staff: [], 
        gallery: [], 
        closed_dates: [], 
        events: [] 
      }
    ]);
    
    setIsUploading(false);
    
    if (!error) {
        setRegisterSuccess(true);
        const regEmailHtml = `
          <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; background: #ffffff;">
            <div style="background: #2D1B4E; padding: 32px 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 900;">BOOKCY<span style="color: #E8622A;">.</span></h1>
            </div>
            <div style="padding: 40px 32px;">
              <h2 style="color: #2D1B4E; margin-top: 0; font-size: 22px;">Merhaba ${newShop.name},</h2>
              <p style="color: #64748b; font-size: 16px; line-height: 1.6;">Bizi tercih ettiğiniz için teşekkür ederiz. İşletme profilinizin onaylanıp yayına alınabilmesi için lütfen ödeme dekontunuzu WhatsApp destek hattımız üzerinden bize iletiniz.</p>
            </div>
          </div>
        `; 
        try { 
          await fetch('/api/email', { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({ 
              to: newShop.email, 
              subject: 'BOOKCY - Başvurunuz Alındı!', 
              html: regEmailHtml, 
              text: 'Başvurunuz alındı. İşlemler sürüyor. Dekontunuzu WhatsApp üzerinden iletmeyi unutmayınız.' 
            }) 
          }); 
        } catch(err) {}
    } else { 
      alert("Hata oluştu. Lütfen tüm alanları doldurduğunuzdan emin olun."); 
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans flex flex-col">
        {/* Üst Kısım / Banner */}
        <div className="bg-[#2D1B4E] pt-12 pb-24 px-8 text-center relative overflow-hidden border-b border-slate-800 shrink-0">
            <div className="absolute top-6 left-6 z-20">
                <Link href="/" className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors">
                    &larr; Ana Sayfaya Dön
                </Link>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8622A]/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5C5A3]/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="w-16 h-16 bg-[#E8622A]/20 text-[#E8622A] rounded-2xl flex items-center justify-center mx-auto mb-6 relative z-10 shadow-inner">
                <Store size={32} />
            </div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white mb-2 relative z-10">İŞ ORTAĞI PANELİ</h1>
            <p className="text-sm md:text-base font-bold text-slate-400 uppercase tracking-widest relative z-10">Bookcy'e Hoş Geldiniz</p>
        </div>

        <div className="flex-1 w-full max-w-[800px] mx-auto px-4 py-8 -mt-20 relative z-20">
            <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-2xl border border-[#E2E8F0] animate-in slide-in-from-bottom-8 duration-500">
                
                {/* Başarı Ekranı (Kayıt Sonrası) */}
                {registerSuccess ? (
                    <div className="text-center py-10 animate-in zoom-in duration-300">
                        <CheckCircle2 size={64} className="mx-auto text-[#00c48c] mb-6" />
                        <h2 className="text-2xl md:text-3xl font-black text-[#E8622A] uppercase italic mb-4">BAŞVURUNUZ ALINDI!</h2>
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 inline-block text-left mt-4 text-[#2D1B4E] w-full max-w-sm">
                            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Banka Bilgileri / Bank Details:</p>
                            <p className="font-bold text-sm">Banka: <span className="font-normal">İş Bankası</span></p>
                            <p className="font-bold text-sm">Alıcı: <span className="font-normal">BOOKCY LTD.</span></p>
                            <p className="font-bold text-sm">IBAN: <span className="text-[#E8622A]">TR99 0006 4000 0012 3456 7890 12</span></p>
                            
                            <p className="text-sm font-bold text-slate-500 mt-6 mb-4 text-center">Bizi tercih ettiğiniz için teşekkür ederiz. İşletme profilinizin onaylanıp yayına alınabilmesi için lütfen ödeme dekontunuzu WhatsApp destek hattımız üzerinden bize iletiniz.</p>
                            <a href="https://wa.me/905555555555?text=Merhaba,%20Bookcy%20işletme%20kaydımı%20yaptım.%20Dekontumu%20iletiyorum." target="_blank" rel="noreferrer" className="w-full bg-[#25D366] text-white font-black py-4 rounded-xl uppercase tracking-widest hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 flex justify-center items-center gap-2 text-decoration-none text-xs border-none cursor-pointer">
                                <MessageCircle size={18}/> DEKONTU İLET
                            </a>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Tab Butonları */}
                        <div className="flex bg-slate-50 p-1.5 rounded-xl mb-10 border border-slate-200">
                            <button 
                                onClick={() => setMode('login')} 
                                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-lg transition-all border-none cursor-pointer ${mode === 'login' ? 'bg-white text-[#E8622A] shadow-md border border-slate-100' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                GİRİŞ YAP
                            </button>
                            <button 
                                onClick={() => setMode('register')} 
                                className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-lg transition-all border-none cursor-pointer ${mode === 'register' ? 'bg-white text-[#E8622A] shadow-md border border-slate-100' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}
                            >
                                YENİ KAYIT
                            </button>
                        </div>

                        {/* --- GİRİŞ YAP FORMU --- */}
                        {mode === 'login' && (
                            <div className="max-w-[480px] mx-auto animate-in fade-in zoom-in-95 duration-300">
                                <div className="flex bg-slate-50 p-1 rounded-xl mb-8 border border-slate-200">
                                    <button onClick={() => setLoginType('owner')} className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all border-none cursor-pointer flex justify-center items-center gap-2 ${loginType === 'owner' ? 'bg-white text-[#2D1B4E] shadow-sm' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}><User size={14}/> YÖNETİCİ</button>
                                    <button onClick={() => setLoginType('staff')} className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all border-none cursor-pointer flex justify-center items-center gap-2 ${loginType === 'staff' ? 'bg-white text-[#2D1B4E] shadow-sm' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}><Users size={14}/> PERSONEL</button>
                                </div>
                                <form onSubmit={handleLogin} className="space-y-4">
                                    <div className="relative">
                                        <Store className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                                        <input type="text" required placeholder="İşletme Kullanıcı Adı" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-6 font-bold text-sm outline-none focus:border-[#E8622A] text-[#2D1B4E] placeholder:text-slate-400 transition-colors" value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} />
                                    </div>
                                    {loginType === 'staff' && (
                                        <div className="relative animate-in fade-in slide-in-from-top-2 duration-300">
                                            <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                                            <input type="text" required placeholder="Personel İsim Soyisim" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-6 font-bold text-sm outline-none focus:border-[#E8622A] text-[#2D1B4E] placeholder:text-slate-400 transition-colors" value={loginStaffName} onChange={(e) => setLoginStaffName(e.target.value)} />
                                        </div>
                                    )}
                                    <div className="relative">
                                        <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
                                        <input type="password" required placeholder="Şifre" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-6 font-bold text-sm outline-none focus:border-[#E8622A] text-[#2D1B4E] placeholder:text-slate-400 transition-colors" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                                    </div>
                                    <button type="submit" disabled={isLoginLoading} className="w-full bg-[#2D1B4E] hover:bg-[#1a0f2e] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-all shadow-lg mt-8 disabled:opacity-70 border-none cursor-pointer">
                                        {isLoginLoading ? 'Giriş Yapılıyor...' : 'PANELE GİT'} <ArrowRight size={18}/>
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* --- KAYIT OL FORMU --- */}
                        {mode === 'register' && (
                            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input required placeholder="İşletme Adı" className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E] transition-colors" value={newShop.name} onChange={e => setNewShop({...newShop, name: e.target.value})} />
                                    <select className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold text-[#2D1B4E] outline-none focus:border-[#E8622A] cursor-pointer transition-colors" value={newShop.category} onChange={e => setNewShop({...newShop, category: e.target.value})}>
                                        {categories.map(c => <option key={c.dbName} value={c.dbName}>{c.dbName}</option>)}
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <select required className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold text-[#2D1B4E] outline-none focus:border-[#E8622A] cursor-pointer uppercase transition-colors" value={newShop.location} onChange={e => setNewShop({...newShop, location: e.target.value})}>
                                        {cyprusRegions.map(region => <option key={region} value={region}>{region}</option>)}
                                    </select>
                                    <input required placeholder="Tam Adres" className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none uppercase text-[#2D1B4E] transition-colors" value={newShop.address} onChange={e => setNewShop({...newShop, address: e.target.value})} />
                                </div>
                                
                                <div className="border-t border-slate-200 pt-5">
                                    <input type="url" placeholder="Google Maps Linki (İsteğe Bağlı)" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E] transition-colors" value={newShop.maps_link} onChange={e => setNewShop({...newShop, maps_link: e.target.value})} />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-200 pt-5">
                                    <div className="flex gap-2 w-full relative">
                                        <select className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-3 outline-none focus:border-[#E8622A] font-bold text-xs text-[#2D1B4E] cursor-pointer w-20 shrink-0 transition-colors" value={newShop.phoneCode} onChange={e => setNewShop({...newShop, phoneCode: e.target.value})}>
                                            <option value="+90">TR</option>
                                            <option value="+357">CY</option>
                                            <option value="+44">UK</option>
                                        </select>
                                        <div className="relative flex-1">
                                            <input required type="tel" placeholder="İşletme Telefonu" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-4 pr-10 outline-none focus:border-[#E8622A] font-bold text-xs text-[#2D1B4E] transition-colors" value={newShop.contactPhone} onChange={handlePhoneChange} />
                                            {phoneValid === true && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={16}/>}
                                            {phoneValid === false && <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={16}/>}
                                        </div>
                                    </div>
                                    <input placeholder="Instagram Linki" className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E] transition-colors" value={newShop.contactInsta} onChange={e => setNewShop({...newShop, contactInsta: e.target.value})} />
                                    <div className="relative">
                                        <input type="email" placeholder="İletişim E-Posta" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 pr-10 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E] transition-colors" value={newShop.contactEmail} onChange={handleAdminEmailChange} />
                                        {adminEmailValid === true && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={16}/>}
                                        {adminEmailValid === false && <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={16}/>}
                                    </div>
                                </div>
                                
                                <div className="border-t border-slate-200 pt-5 relative">
                                    <input required type="email" placeholder="Yönetici E-Posta (Giriş için)" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 pr-10 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E] transition-colors" value={newShop.email} onChange={handleEmailChange} />
                                    {emailValid === true && <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={16}/>}
                                    {emailValid === false && <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500" size={16}/>}
                                </div>
                                
                                <textarea placeholder="Açıklama / Hakkımızda" rows="2" className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none resize-none text-[#2D1B4E] transition-colors" value={newShop.description} onChange={e => setNewShop({...newShop, description: e.target.value})}></textarea>
                                
                                <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-4 relative group hover:border-[#E8622A] transition-all">
                                    {newShop.logoFile ? (
                                        <span className="text-[10px] font-bold text-[#00c48c] flex items-center justify-center gap-2"><CheckCircle2 size={16}/> {newShop.logoFile.name}</span>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-center cursor-pointer">
                                            <Upload size={20} className="text-slate-400 mb-2 group-hover:text-[#E8622A] transition-colors" />
                                            <span className="text-[10px] font-bold text-slate-500 uppercase">Logo Yükle</span>
                                        </div>
                                    )}
                                    <input type="file" accept=".png, .jpg, .jpeg" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setNewShop({...newShop, logoFile: e.target.files[0]})} />
                                </div>
                                
                                <div className="border-t border-slate-200 pt-4">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">Paket Seçimi</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {packages.map(p => (
                                            <div key={p.name} onClick={() => setNewShop({...newShop, package: p.name})} className={`cursor-pointer p-5 rounded-2xl border transition-all ${newShop.package === p.name ? 'bg-orange-50 border-[#E8622A]' : 'bg-white border-slate-200 hover:border-[#E8622A]'}`}>
                                                <div className="flex justify-between items-center mb-2">
                                                    <h4 className={`text-sm font-black uppercase ${newShop.package === p.name ? 'text-[#E8622A]' : 'text-[#2D1B4E]'}`}>{p.name}</h4>
                                                    {newShop.package === p.name && <CheckCircle2 size={16} className="text-[#E8622A]"/>}
                                                </div>
                                                <p className="text-xs font-bold text-slate-500">{p.price}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-2 gap-4 mt-2 border-t border-slate-200 pt-4">
                                    <input required placeholder="Kullanıcı Adı" className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E] transition-colors" value={newShop.username} onChange={e => setNewShop({...newShop, username: e.target.value})} />
                                    <input required placeholder="Şifre" className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E] transition-colors" value={newShop.password} onChange={e => setNewShop({...newShop, password: e.target.value})} />
                                </div>
                                
                                <button type="submit" disabled={isUploading || emailValid === false || phoneValid === false || adminEmailValid === false} className="w-full bg-[#E8622A] hover:bg-[#d4561f] text-white py-5 rounded-2xl mt-4 uppercase font-black text-xs tracking-[0.2em] shadow-lg shadow-orange-500/30 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                                    {isUploading ? 'YÜKLENİYOR...' : 'BAŞVURUYU TAMAMLA'}
                                </button>
                            </form>
                        )}
                    </>
                )}
            </div>
        </div>
    </div>
  );
}