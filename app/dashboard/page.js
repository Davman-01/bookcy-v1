"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
// Hatalı kütüphane ismi düzeltildi: lucide-react
import { 
  LayoutDashboard, Calendar, Users, Settings, LogOut, Plus, 
  TrendingUp, Star, DollarSign, Clock, CheckCircle2, XCircle, 
  ChevronRight, ArrowLeft, UserPlus, PieChart, Bell, Search, 
  Filter, Download, MoreHorizontal, UserCheck, CalendarDays, Wallet
} from 'lucide-react';

const allTimeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];

export default function Dashboard() {
  const router = useRouter();
  const [shop, setShop] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [quickForm, setQuickForm] = useState({ 
    customer_name: '', customer_surname: '', customer_phone: '', 
    service_name: '', appointment_date: new Date().toISOString().split('T')[0], 
    appointment_time: '10:00', staff_name: '' 
  });

  useEffect(() => {
    const session = localStorage.getItem('bookcy_biz_session');
    if (!session) {
      router.push('/');
    } else {
      const parsedShop = JSON.parse(session);
      setShop(parsedShop);
      fetchDashboardData(parsedShop.id);
    }
  }, []);

  async function fetchDashboardData(shopId) {
    setLoading(true);
    const { data } = await supabase
      .from('appointments')
      .select('*')
      .eq('shop_id', shopId)
      .order('appointment_date', { ascending: false });
    if (data) setAppointments(data);
    setLoading(false);
  }

  const handleLogout = () => {
    localStorage.removeItem('bookcy_biz_session');
    router.push('/');
  };

  const handleQuickAdd = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('appointments').insert([{
      shop_id: shop.id,
      customer_name: quickForm.customer_name,
      customer_surname: quickForm.customer_surname,
      customer_phone: quickForm.customer_phone,
      service_name: quickForm.service_name,
      appointment_date: quickForm.appointment_date,
      appointment_time: quickForm.appointment_time,
      staff_name: quickForm.staff_name || 'Genel',
      occupied_slots: [quickForm.appointment_time]
    }]);

    if (!error) {
      alert("Randevu başarıyla eklendi!");
      setShowQuickAdd(false);
      fetchDashboardData(shop.id);
    }
  };

  const today = new Date().toISOString().split('T')[0];
  const todayAppts = appointments.filter(a => a.appointment_date === today);
  const totalRevenue = appointments.length * 150;
  const uniqueCustomers = [...new Set(appointments.map(a => a.customer_phone))].length;

  if (!shop) return <div className="p-20 text-center">Yükleniyor...</div>;

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-[#2D1B4E]" style={{cursor: 'default'}}>
      <aside className="w-64 bg-[#2D1B4E] text-white flex flex-col sticky top-0 h-screen shrink-0 shadow-2xl z-20">
        <div className="p-8 flex items-center gap-3 border-b border-white/10">
          <div className="w-10 h-10 bg-[#E8622A] rounded-xl flex items-center justify-center font-black shadow-lg text-white">B</div>
          <span className="font-black text-xl tracking-tighter lowercase">bookcy<span className="text-[#E8622A]">.</span>biz</span>
        </div>
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all border-none cursor-pointer text-left ${activeTab === 'overview' ? 'bg-[#E8622A] text-white' : 'bg-transparent text-white/60 hover:text-white'}`}><LayoutDashboard size={18}/> Özet Panel</button>
          <button onClick={() => setActiveTab('calendar')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all border-none cursor-pointer text-left ${activeTab === 'calendar' ? 'bg-[#E8622A] text-white' : 'bg-transparent text-white/60 hover:text-white'}`}><Calendar size={18}/> Takvim Yönetimi</button>
          <button onClick={() => setActiveTab('clients')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all border-none cursor-pointer text-left ${activeTab === 'clients' ? 'bg-[#E8622A] text-white' : 'bg-transparent text-white/60 hover:text-white'}`}><Users size={18}/> Müşteri Listesi</button>
          <button onClick={() => setActiveTab('stats')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all border-none cursor-pointer text-left ${activeTab === 'stats' ? 'bg-[#E8622A] text-white' : 'bg-transparent text-white/60 hover:text-white'}`}><PieChart size={18}/> Finansal Raporlar</button>
        </nav>
        <div className="p-4 border-t border-white/10"><button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm text-red-400 hover:bg-red-500/10 transition-all border-none bg-transparent cursor-pointer"><LogOut size={18}/> Çıkış Yap</button></div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
          <div className="flex flex-col"><h1 className="text-xl font-black uppercase tracking-tight">{shop.name}</h1><p className="text-xs text-slate-400 font-bold uppercase tracking-widest">{shop.location} Şubesi</p></div>
          <button onClick={() => setShowQuickAdd(true)} className="bg-[#E8622A] text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 border-none cursor-pointer shadow-lg"><Plus size={18}/> Hızlı Randevu</button>
        </header>

        <div className="p-8 max-w-[1400px] mx-auto">
          {activeTab === 'overview' && (
            <div className="animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm"><div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-lg flex items-center justify-center mb-4"><Calendar size={20}/></div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Bugünkü Randevu</p><p className="text-3xl font-black">{todayAppts.length}</p></div>
                    <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm"><div className="w-10 h-10 bg-green-50 text-green-500 rounded-lg flex items-center justify-center mb-4"><DollarSign size={20}/></div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tahmini Gelir</p><p className="text-3xl font-black">₺{totalRevenue.toLocaleString()}</p></div>
                    <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm"><div className="w-10 h-10 bg-yellow-50 text-yellow-500 rounded-lg flex items-center justify-center mb-4"><Star size={20}/></div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Müşteri Puanı</p><p className="text-3xl font-black">4.9/5</p></div>
                    <div className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm"><div className="w-10 h-10 bg-purple-50 text-purple-500 rounded-lg flex items-center justify-center mb-4"><TrendingUp size={20}/></div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Doluluk Oranı</p><p className="text-3xl font-black">%84</p></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100 flex justify-between items-center"><h3 className="font-black uppercase tracking-tight text-sm">Son Randevular</h3></div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead><tr className="bg-slate-50"><th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Müşteri</th><th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Hizmet</th><th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Tarih</th><th className="px-6 py-4 text-[10px] font-black uppercase text-slate-400">Durum</th></tr></thead>
                                <tbody>
                                    {appointments.slice(0,6).map((appt) => (
                                        <tr key={appt.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-sm">{appt.customer_name} {appt.customer_surname}</td>
                                            <td className="px-6 py-4 text-xs font-medium text-slate-600">{appt.service_name}</td>
                                            <td className="px-6 py-4"><div className="text-xs font-black">{appt.appointment_date}</div><div className="text-[10px] text-slate-400 font-bold">{appt.appointment_time}</div></td>
                                            <td className="px-6 py-4"><span className="bg-green-100 text-green-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">Onaylandı</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="bg-[#2D1B4E] p-8 rounded-[32px] text-white">
                        <h3 className="font-black uppercase text-sm mb-6 flex items-center gap-2"><PieChart size={18} className="text-[#E8622A]"/> Personel Analizi</h3>
                        <div className="space-y-6">
                            {(shop.staff || [{name: 'Genel'}]).map((s, idx) => (
                                <div key={idx}><div className="flex justify-between text-xs font-bold mb-2"><span>{s.name}</span><span>%{95 - (idx*12)}</span></div><div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#E8622A]" style={{width: `${95 - (idx*12)}%`}}></div></div></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          )}

          {activeTab === 'calendar' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-8"><h2 className="text-2xl font-black uppercase tracking-tight">Günlük Ajanda</h2><input type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} className="bg-white border border-slate-200 rounded-xl px-4 py-2 font-bold text-sm outline-none focus:border-[#E8622A]" /></div>
                  <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
                      <div className="grid grid-cols-1 gap-4">
                          {allTimeSlots.map((slot) => {
                              const slotAppts = appointments.filter(a => a.appointment_date === selectedDate && (a.occupied_slots ? a.occupied_slots.includes(slot) : a.appointment_time === slot));
                              return (
                                <div key={slot} className="flex gap-6 items-center p-4 border-b border-slate-50 last:border-0 group">
                                    <div className="w-16 font-black text-slate-300 text-sm group-hover:text-[#E8622A] transition-colors">{slot}</div>
                                    <div className="flex-1">{slotAppts.length > 0 ? slotAppts.map(a => (<div key={a.id} className="bg-[#2D1B4E] text-white p-3 rounded-2xl flex justify-between items-center shadow-md animate-in zoom-in-95"><div><p className="font-bold text-sm">{a.customer_name} {a.customer_surname}</p><p className="text-[10px] text-white/60 uppercase font-black">{a.service_name} • {a.staff_name}</p></div><CheckCircle2 size={18} className="text-[#00c48c]"/></div>)) : <div className="border border-dashed border-slate-200 rounded-2xl p-3 text-center text-slate-400 text-xs font-bold hover:border-[#E8622A] cursor-pointer">Boş Slot</div>}</div>
                                </div>
                              );
                          })}
                      </div>
                  </div>
              </div>
          )}

          {activeTab === 'clients' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                  <div className="flex justify-between items-center mb-8"><h2 className="text-2xl font-black uppercase tracking-tight">Müşteri Portföyü</h2></div>
                  <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm overflow-hidden">
                      <table className="w-full text-left"><thead className="bg-slate-50"><tr className="text-[10px] font-black uppercase text-slate-400"><th className="px-8 py-5">Müşteri</th><th className="px-8 py-5">İletişim</th><th className="px-8 py-5">Ziyaret Sayısı</th><th className="px-8 py-5">Son İşlem</th></tr></thead>
                          <tbody>
                              {Array.from(new Set(appointments.map(a => a.customer_phone))).map((phone, idx) => {
                                  const customerAppts = appointments.filter(a => a.customer_phone === phone);
                                  const lastAppt = customerAppts[0];
                                  return (
                                    <tr key={idx} className="border-t border-slate-50 hover:bg-slate-50 transition-colors"><td className="px-8 py-5"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-[#2D1B4E]">{lastAppt.customer_name[0]}</div><span className="font-bold text-sm">{lastAppt.customer_name} {lastAppt.customer_surname}</span></div></td><td className="px-8 py-5 text-sm font-medium text-slate-500">{phone}</td><td className="px-8 py-5"><span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black">{customerAppts.length} KEZ GELDİ</span></td><td className="px-8 py-5 text-xs font-bold">{lastAppt.appointment_date}</td></tr>
                                  );
                              })}
                          </tbody>
                      </table>
                  </div>
              </div>
          )}

          {activeTab === 'stats' && (
              <div className="animate-in slide-in-from-bottom-4 duration-500">
                  <h2 className="text-2xl font-black uppercase tracking-tight mb-8">Finansal Analiz</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm"><div className="flex justify-between items-start mb-4"><div className="w-12 h-12 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center"><Wallet size={24}/></div><span className="text-xs font-black text-green-500">+%12.5</span></div><p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Toplam Ciro</p><p className="text-4xl font-black text-[#2D1B4E]">₺{totalRevenue.toLocaleString()}</p></div>
                      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm"><div className="flex justify-between items-start mb-4"><div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center"><CalendarDays size={24}/></div></div><p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Randevu Başı Gelir</p><p className="text-4xl font-black text-[#2D1B4E]">₺150</p></div>
                      <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm"><div className="flex justify-between items-start mb-4"><div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center"><UserCheck size={24}/></div></div><p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Toplam Müşteri</p><p className="text-4xl font-black text-[#2D1B4E]">{uniqueCustomers}</p></div>
                  </div>
                  <div className="bg-white p-10 rounded-[40px] border border-slate-200 shadow-sm"><h3 className="font-black uppercase text-sm mb-10">Haftalık Kazanç Trendi</h3><div className="h-64 flex items-end justify-between gap-4">{[40, 60, 45, 90, 65, 85, 100].map((h, i) => (<div key={i} className="flex-1 flex flex-col items-center gap-4"><div className="w-full bg-[#2D1B4E]/5 rounded-t-xl relative overflow-hidden h-full group"><div className="absolute bottom-0 w-full bg-[#E8622A] rounded-t-xl transition-all duration-1000 group-hover:bg-[#2D1B4E]" style={{height: `${h}%`}}></div></div><span className="text-[10px] font-black text-slate-400 uppercase">Hafta {i+1}</span></div>))}</div></div>
              </div>
          )}
        </div>
      </main>

      {showQuickAdd && (
        <div className="fixed inset-0 bg-[#2D1B4E]/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[500px] rounded-[32px] p-10 relative animate-in zoom-in-95 duration-300 shadow-2xl">
            <button onClick={() => setShowQuickAdd(false)} className="absolute top-6 right-6 text-slate-400 hover:text-black border-none bg-transparent cursor-pointer"><XCircle size={28}/></button>
            <div className="text-center mb-8"><div className="w-16 h-16 bg-[#E8622A]/10 text-[#E8622A] rounded-2xl flex items-center justify-center mb-4 mx-auto"><UserPlus size={32}/></div><h2 className="text-2xl font-black uppercase text-[#2D1B4E]">Hızlı Randevu</h2></div>
            <form onSubmit={handleQuickAdd} className="space-y-4">
              <div className="grid grid-cols-2 gap-4"><input required placeholder="Adı" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold text-sm outline-none focus:border-[#E8622A]" value={quickForm.customer_name} onChange={e => setQuickForm({...quickForm, customer_name: e.target.value})} /><input required placeholder="Soyadı" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold text-sm outline-none focus:border-[#E8622A]" value={quickForm.customer_surname} onChange={e => setQuickForm({...quickForm, customer_surname: e.target.value})} /></div>
              <input required placeholder="Telefon" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold text-sm outline-none focus:border-[#E8622A]" value={quickForm.customer_phone} onChange={e => setQuickForm({...quickForm, customer_phone: e.target.value})} />
              <input required placeholder="Hizmet" className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold text-sm outline-none focus:border-[#E8622A]" value={quickForm.service_name} onChange={e => setQuickForm({...quickForm, service_name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4"><input required type="date" className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold text-sm outline-none" value={quickForm.appointment_date} onChange={e => setQuickForm({...quickForm, appointment_date: e.target.value})} /><select required className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 font-bold text-sm outline-none" value={quickForm.appointment_time} onChange={e => setQuickForm({...quickForm, appointment_time: e.target.value})}>{allTimeSlots.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
              <button type="submit" className="w-full bg-[#E8622A] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl border-none cursor-pointer">Randevuyu Kaydet</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}