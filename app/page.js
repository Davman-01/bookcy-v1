"use client";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import { SITE_CONFIG } from '../lib/constants';

export default function Home() {
  const [step, setStep] = useState('services');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div style={{ minHeight: '100vh', background: SITE_CONFIG.colors.bg }}>
      <Navbar setStep={setStep} />
      
      <main style={{ paddingTop: '70px' }}>
        {step === 'services' ? (
          <Hero 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onSearch={() => setStep('all_shops')} 
          />
        ) : (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <h2 style={{fontWeight: 900, color: SITE_CONFIG.colors.fig, fontSize: '28px'}}>Mekanlar</h2>
            <p style={{margin: '20px 0', opacity: 0.6}}>Arama kriterine uygun sonuç bulunamadı.</p>
            <button onClick={() => setStep('services')} style={{color: SITE_CONFIG.colors.terra, background:'none', border:'none', fontWeight:800, cursor:'pointer'}}>← Geri Dön</button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}