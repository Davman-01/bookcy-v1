import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export default function Navbar({ setStep }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, 
      height: '72px', display: 'flex', alignItems: 'center', 
      justifyContent: 'space-between', padding: '0 40px', 
      background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div onClick={() => setStep('services')} style={{cursor:'pointer'}}>
        <img src={SITE_CONFIG.logoPath} alt="Logo" style={{height:'38px', width:'auto'}} />
      </div>
      
      <div style={{display:'flex', gap:'25px', alignItems:'center'}}>
        <button 
          onClick={() => setStep('all_shops')} 
          style={{background:'none', border:'none', fontWeight:700, cursor:'pointer', color: SITE_CONFIG.colors.fig}}
        >
          MEKANLAR
        </button>
        <Link href="/isletme-giris" style={{
          background: SITE_CONFIG.colors.terra, color: 'white', 
          padding: '12px 28px', borderRadius: '50px', 
          textDecoration: 'none', fontWeight: 800, fontSize: '13px',
          boxShadow: '0 4px 15px rgba(232, 98, 42, 0.2)'
        }}>
          GİRİŞ
        </Link>
      </div>
    </nav>
  );
}