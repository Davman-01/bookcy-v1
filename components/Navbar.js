import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';

export default function Navbar({ setStep }) {
  return (
    <nav style={{
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 100, 
      height: '68px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '0 40px', 
      background: 'rgba(255,255,255,0.8)', 
      backdropFilter: 'blur(15px)',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div onClick={() => setStep('services')} style={{cursor:'pointer'}}>
        <img src={SITE_CONFIG.logoPath} alt="Logo" style={{height:'36px'}} />
      </div>
      
      <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
        <button onClick={() => setStep('all_shops')} style={{background:'none', border:'none', fontWeight:700, cursor:'pointer', color: SITE_CONFIG.colors.fig}}>MEKANLAR</button>
        <Link href="/isletme-giris" style={{
          background: SITE_CONFIG.colors.terra, 
          color: 'white', 
          padding: '10px 25px', 
          borderRadius: '50px', 
          textDecoration: 'none', 
          fontWeight: 800, 
          fontSize: '12px'
        }}>GİRİŞ</Link>
      </div>
    </nav>
  );
}