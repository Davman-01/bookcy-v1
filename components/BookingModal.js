import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

export default function BookingModal({ shop, onClose }) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000, 
      background: 'rgba(0,0,0,0.5)', display: 'flex', 
      alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{
        background: 'white', width: '100%', maxWidth: '500px', 
        borderRadius: '30px', padding: '30px', position: 'relative',
        maxHeight: '90vh', overflowY: 'auto'
      }}>
        <button onClick={onClose} style={{position:'absolute', right:'20px', top:'20px', border:'none', background:'none', cursor:'pointer'}}>
          <X size={24} />
        </button>

        <h3 style={{fontWeight: 900, fontSize: '24px', marginBottom: '20px'}}>{shop.name} - Randevu</h3>

        {step === 1 && (
          <div>
            <p style={{fontWeight: 700, marginBottom: '10px'}}>Tarih Seçin</p>
            <input 
              type="date" 
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{width:'100%', padding:'15px', borderRadius:'12px', border:'1px solid #ddd', marginBottom:'20px'}}
            />
            <button 
              disabled={!selectedDate}
              onClick={() => setStep(2)}
              style={{width:'100%', background:SITE_CONFIG.colors.terra, color:'white', padding:'15px', borderRadius:'15px', fontWeight:800, border:'none', opacity: selectedDate ? 1 : 0.5}}
            >
              Saat Seçimine Geç
            </button>
          </div>
        )}

        {/* Adımları buraya eklemeye devam edeceğiz (Saat seçimi, İletişim bilgileri vb.) */}
      </div>
    </div>
  );
}