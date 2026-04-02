"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Store, Lock, ArrowRight, User, Users } from 'lucide-react';

export default function BizLogin() {
  const router = useRouter();
  const [loginType, setLoginType] = useState('owner'); // 'owner' veya 'staff'
  const [username, setUsername] = useState(''); // Owner username veya Shop username
  const [staffName, setStaffName] = useState(''); // Personel adı
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Dükkanı bul (Kullanıcı adına göre)
    const { data: shop, error } = await supabase
      .from('shops')
      .select('*')
      .eq('admin_username', username)
      .single();

    if (error || !shop) {
      alert("Hatalı İşletme Kullanıcı Adı!");
      setLoading(false);
      return;
    }

    if (shop.status !== 'approved') {
      alert("İşletme henüz yönetici tarafından onaylanmamış!");
      setLoading(false);
      return;
    }

    // YÖNETİCİ (PATRON) GİRİŞİ
    if (loginType === 'owner') {
      if (shop.admin_password !== password) {
        alert("Hatalı Şifre!");
        setLoading(false);
        return;
      }
      localStorage.setItem('bookcy_biz_session', JSON.stringify({ role: 'owner', shopData: shop }));
      router.push('/dashboard');
    } 
    // PERSONEL (ÇALIŞAN) GİRİŞİ
    else {
      const staffList = shop.staff || [];
      const validStaff = staffList.find(s => s.name === staffName && s.password === password);
      
      if (!validStaff) {
        alert("Hatalı Personel Adı veya Şifre!");
        setLoading(false);
        return;
      }
      // Personeli içeri al ama sadece kendi yetkisiyle!
      localStorage.setItem('bookcy_biz_session', JSON.stringify({ role: 'staff', staffName: validStaff.name, shopData: shop }));
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center items-center p-6 font-['Outfit']">
      <div className="w-full max-w-md bg-white rounded-[32px] shadow-xl p-8 md:p-12 border border-slate-100">
        
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#E8622A]/10 text-[#E8622A] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner"><Store size={32} /></div>
          <h1 className="text-2xl md:text-3xl font-black text-[#2D1B4E] uppercase tracking-tight mb-2">Giriş Yap</h1>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Bookcy İş Ortağı Paneli</p>
        </div>

        {/* GİRİŞ TİPİ SEÇİCİ */}
        <div className="flex bg-slate-50 p-1 rounded-xl mb-8 border border-slate-100">
          <button onClick={() => setLoginType('owner')} className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all border-none cursor-pointer flex justify-center items-center gap-2 ${loginType === 'owner' ? 'bg-white text-[#E8622A] shadow-sm' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}><User size={14}/> Yönetici</button>
          <button onClick={() => setLoginType('staff')} className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-lg transition-all border-none cursor-pointer flex justify-center items-center gap-2 ${loginType === 'staff' ? 'bg-white text-[#E8622A] shadow-sm' : 'bg-transparent text-slate-400 hover:text-slate-600'}`}><Users size={14}/> Personel</button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <Store className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
            <input 
              type="text" 
              required 
              placeholder="İşletme Kullanıcı Adı" 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-6 font-bold text-sm outline-none focus:border-[#E8622A] text-[#2D1B4E] placeholder:text-slate-400" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {loginType === 'staff' && (
            <div className="relative animate-in fade-in zoom-in-95 duration-300">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
              <input 
                type="text" 
                required 
                placeholder="Personel İsim Soyisim" 
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-6 font-bold text-sm outline-none focus:border-[#E8622A] text-[#2D1B4E] placeholder:text-slate-400" 
                value={staffName} 
                onChange={(e) => setStaffName(e.target.value)}
              />
            </div>
          )}

          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20}/>
            <input 
              type="password" 
              required 
              placeholder="Şifre" 
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-14 pr-6 font-bold text-sm outline-none focus:border-[#E8622A] text-[#2D1B4E] placeholder:text-slate-400" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-[#2D1B4E] hover:bg-[#1a0f2e] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex justify-center items-center gap-2 transition-all shadow-lg mt-6 disabled:opacity-70 border-none cursor-pointer">
            {loading ? 'Giriş Yapılıyor...' : 'Panele Git'} <ArrowRight size={18}/>
          </button>
        </form>
      </div>
    </div>
  );
}