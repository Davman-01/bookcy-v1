"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { SITE_CONFIG } from '@/lib/constants';

// Bileşenleri çağırıyoruz
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VenueCard from '@/components/VenueCard';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';

export default function Home() {
  const [step, setStep] = useState('services');
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    async function getShops() {
      const { data } = await supabase.from('shops').select('*').eq('status', 'approved');
      if (data) setShops(data);
    }
    getShops();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: SITE_CONFIG.colors.bg }}>
      <Navbar setStep={setStep} />

      <main style={{ paddingTop: '72px' }}>
        {step === 'services' ? (
          <Hero 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onSearch={() => setStep('all_shops')} 
          />
        ) : (
          <div style={{ maxWidth: '800px', margin: '60px auto', padding: '0 20px' }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'40px'}}>
               <h2 style={{ fontWeight: 900, fontSize: '32px', color: SITE_CONFIG.colors.fig }}>Mekanlar</h2>
               <button onClick={() => setStep('services')} style={{background:'none', border:'none', color: SITE_CONFIG.colors.terra, fontWeight:700, cursor:'pointer'}}>← Geri Dön</button>
            </div>
            
            {shops
              .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
              .map(shop => (
                <VenueCard 
                  key={shop.id} 
                  shop={shop} 
                  onClick={() => setSelectedShop(shop)} 
                />
              ))}
          </div>
        )}
      </main>

      {selectedShop && (
        <BookingModal 
          shop={selectedShop} 
          onClose={() => setSelectedShop(null)} 
        />
      )}

      <Footer />
    </div>
  );
}