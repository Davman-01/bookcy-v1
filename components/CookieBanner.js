"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Daha önce onaylanmış mı kontrol et
    const cookieConsent = localStorage.getItem('bookcy_cookie_consent');
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('bookcy_cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#2D1B4E] text-white p-4 z-[9999] shadow-2xl border-t border-[#E8622A]/30 flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-10 duration-500">
      <div className="text-sm font-medium text-center md:text-left">
        Deneyiminizi geliştirmek için çerezleri kullanıyoruz. Sitemizi kullanmaya devam ederek <Link href="/gizlilik" className="text-[#E8622A] underline underline-offset-2 hover:text-white transition-colors">Gizlilik Politikamızı</Link> kabul etmiş olursunuz.
      </div>
      <button 
        onClick={acceptCookies} 
        className="bg-[#E8622A] hover:bg-[#d4561f] text-white px-8 py-2 rounded-xl font-black text-xs tracking-widest uppercase transition-colors shadow-lg cursor-pointer whitespace-nowrap"
      >
        Kabul Et
      </button>
    </div>
  );
}