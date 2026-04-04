"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { SITE_CONFIG } from '../lib/constants';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import VenueCard from '../components/VenueCard';
import BookingModal from '../components/BookingModal';
import Footer from '../components/Footer';

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

      <main style={{ paddingTop: '70px' }}>
        {step === 'services' ? (
          <>
            <Hero 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              onSearch={() => setStep('all_shops')} 
            />
            
            {/* Hızlı Kategoriler Buraya Gelecek */}
            <div style={{maxWidth:'1200px', margin:'-50px auto 50px', position:'relative', zIndex:10, display:'flex', gap:'15px', justifyContent:'center', flexWrap:'wrap', padding:'0 20px'}}>
               {['Kuaför','Berber','Lazer','Tırnak','Cilt Bakımı'].map(cat => (
                 <button key={cat} onClick={() => {setSearchQuery(cat); setStep('all_shops');}} style={{background:'white', padding:'15px 30px', borderRadius:'15px', border:'none', fontWeight:700, boxShadow:'0 5px 15px rgba(0,0,0,0.05)', cursor:'pointer'}}>
                   {cat}
                 </button>
               ))}
            </div>
          </>
        ) : (
          <div style={{ maxWidth: '850px', margin: '50px auto', padding: '0 20px' }}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
              <h2 style={{fontWeight: 900, fontSize: '32px', color: SITE_CONFIG.colors.fig}}>Mekanlar</h2>
              <button onClick={() => setStep('services')} style={{color: SITE_CONFIG.colors.terra, background:'none', border:'none', fontWeight:800, cursor:'pointer'}}>← ANA SAYFA</button>
            </div>
            
            {shops
              .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.location.toLowerCase().includes(searchQuery.toLowerCase()))
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