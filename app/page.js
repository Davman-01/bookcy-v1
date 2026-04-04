"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// Parçaladığımız bileşenleri buraya çağırıyoruz
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import VenueCard from '@/components/VenueCard';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';

export default function Home() {
  const [step, setStep] = useState('services'); // 'services' veya 'all_shops'
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShop, setSelectedShop] = useState(null);

  // Supabase'den dükkanları çekiyoruz
  useEffect(() => {
    async function getShops() {
      const { data, error } = await supabase
        .from('shops')
        .select('*')
        .eq('status', 'approved');
      
      if (data) setShops(data);
    }
    getShops();
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#FAF7F2' }}>
      {/* 1. ÜST MENÜ */}
      <Navbar setStep={setStep} />

      <main style={{ paddingTop: '68px' }}>
        {step === 'services' ? (
          /* 2. KARŞILAMA EKRANI */
          <Hero 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onSearch={() => setStep('all_shops')} 
          />
        ) : (
          /* 3. MEKAN LİSTESİ */
          <div style={{ maxWidth: '800px', margin: '50px auto', padding: '0 20px' }}>
            <h2 style={{ fontWeight: 900, fontSize: '28px', marginBottom: '30px' }}>
              Mekanlar ({shops.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())).length})
            </h2>
            
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

      {/* 4. RANDEVU EKRANI (Açılır Pencere) */}
      {selectedShop && (
        <BookingModal 
          shop={selectedShop} 
          onClose={() => setSelectedShop(null)} 
        />
      )}

      {/* 5. ALT KISIM (info@bookcy.co burada) */}
      <Footer />
    </div>
  );
}