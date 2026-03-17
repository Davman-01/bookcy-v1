"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, Lock, ArrowRight, X } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [pass, setPass] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (pass === 'BookcyAdmin2026') { // Burayı kendi güvenli şifrenle değiştirebilirsin
      localStorage.setItem('bookcy_admin_access', 'true');
      router.push('/admin/dashboard');
    } else {
      alert("Hatalı Yetki!");
    }
  };

  return (
    <div className="min-h-screen bg-[#2D1B4E] flex items-center justify-center p-6 font-['Outfit']">
      <div className="bg-white w-full max-w-[450px] rounded-[40px] p-12 relative shadow-2xl">
        <div className="w-16 h-16 bg-[#E8622A]/10 text-[#E8622A] rounded-2xl flex items-center justify-center mb-8 mx-auto">
          <ShieldCheck size={32}/>
        </div>
        <h1 className="text-3xl font-black text-center text-[#2D1B4E] uppercase mb-2 tracking-tighter">Merkez Panel</h1>
        <p className="text-slate-400 text-center text-sm font-bold uppercase tracking-widest mb-10">Sadece Yetkili Personel</p>
        
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div className="relative">
            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20}/>
            <input 
              type="password" 
              required 
              placeholder="Yönetici Şifresi" 
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-5 pl-14 pr-6 font-bold text-sm outline-none focus:border-[#E8622A] transition-all"
              onChange={e => setPass(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-[#2D1B4E] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl flex items-center justify-center gap-2 hover:bg-[#1b0f30] transition-all">
            Sisteme Giriş Yap <ArrowRight size={18}/>
          </button>
        </form>
      </div>
    </div>
  );
}