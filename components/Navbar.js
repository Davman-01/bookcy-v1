import Link from 'next/link';
import { SITE_CONFIG } from '../lib/constants';

export default function Navbar({ setStep }) {
  return (
    <nav>
      <div className="nav-logo" onClick={() => setStep('services')} style={{cursor:'pointer', display:'flex', alignItems:'center', gap:'10px'}}>
        <svg className="nav-logo-icon" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="10" fill="#2D1B4E"/>
          <path d="M14 15.5 Q23 15.5 23 20 Q23 24.5 14 24.5" stroke="#F5C5A3" strokeWidth="3.5" fill="none" />
          <path d="M14 24.5 Q25 24.5 25 29 Q25 33.5 14 33.5" stroke="#E8622A" strokeWidth="3.5" fill="none" />
        </svg>
        <span style={{fontWeight:800, fontSize:'22px', color:'#2D1B4E'}}>bookcy<span style={{color:'#E8622A'}}>.</span></span>
      </div>

      <div style={{display:'flex', gap:'25px', alignItems:'center'}}>
        <button onClick={() => setStep('all_shops')} style={{background:'none', border:'none', fontWeight:700, cursor:'pointer', color: '#2D1B4E'}}>MEKANLAR</button>
        <Link href="/isletme-giris" style={{background: '#E8622A', color: 'white', padding: '10px 25px', borderRadius: '50px', textDecoration: 'none', fontWeight: 800, fontSize: '13px'}}>GİRİŞ</Link>
      </div>
    </nav>
  );
}