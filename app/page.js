"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { SITE_CONFIG } from '@/lib/constants';

// Bileşenler
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VenueCard from '@/components/VenueCard';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';

export default function Home() {
  const [lang, setLang] = useState('TR');
  const [theme, setTheme] = useState('light');
  const [step, setStep] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  // Tema Kontrolü
  useEffect(() => {
    const savedTheme = localStorage.getItem('bookcy_theme') || 'light';
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('bookcy_theme', next);
    document.body.className = next;
  };

  // Veri Çekme
  useEffect(() => {
    async function getShops() {
      const { data } = await supabase.from('shops').select('*').eq('status', 'approved');
      if (data) setShops(data);
    }
    getShops();
  }, []);

  return (
    <div className={`theme-wrapper ${theme}`}>
      <Navbar 
        lang={lang} setLang={setLang} 
        theme={theme} toggleTheme={toggleTheme}
        setStep={setStep} 
      />

      <main>
        {step === 'services' ? (
          <Hero 
            lang={lang} 
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            filterRegion={filterRegion} setFilterRegion={setFilterRegion}
            onSearch={() => setStep('all_shops')}
          />
        ) : (
          /* Mekan Listeleme Alanı (Orijinal Tasarımınla) */
          <div className="all-shops-container">
            {shops.filter(s => filterRegion === 'All' || s.location === filterRegion).map(shop => (
              <VenueCard key={shop.id} shop={shop} onClick={() => setSelectedShop(shop)} />
            ))}
          </div>
        )}
      </main>

      {selectedShop && <BookingModal shop={selectedShop} onClose={() => setSelectedShop(null)} />}
      <Footer lang={lang} />
    </div>
  );
}