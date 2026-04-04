import Link from 'next/link';
import { SITE_CONFIG } from '../lib/constants';

export default function Navbar({ setStep }) {
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000, 
      height: '70px', display: 'flex', alignItems: 'center', 
      justifyContent: 'space-between', padding: '0 40px', 
      background: 'white', borderBottom: '1px solid #eee'
    }}>
      <div onClick={() => setStep('services')} style={{cursor:'pointer'}}>
        <img src={SITE_CONFIG.logoPath} alt="Bookcy" style={{height:'35px', width:'auto', display:'block'}} />
      </div>
      
      <div style={{display:'flex', gap:'20px', alignItems:'center'}}>
        <button onClick={() => setStep('all_shops')} style={{background:'none', border:'none', fontWeight:700, cursor:'pointer', color: SITE_CONFIG.colors.fig}}>MEKANLAR</button>
        <Link href="/isletme-giris" style={{
          background: SITE_CONFIG.colors.terra, color: 'white', 
          padding: '10px 25px', borderRadius: '50px', 
          textDecoration: 'none', fontWeight: 800, fontSize: '12px'
        }}>GİRİŞ</Link>
      </div>
    </nav>
  );
}