import { SITE_CONFIG } from '../lib/constants';

export default function Footer() {
  return (
    <footer style={{background: SITE_CONFIG.colors.fig, color: 'white', padding: '60px 40px', textAlign: 'center'}}>
      <div style={{marginBottom: '20px', display: 'flex', justifyContent: 'center'}}>
        <img src={SITE_CONFIG.logoPath} alt="Logo" style={{height:'35px', filter:'brightness(0) invert(1)'}} />
      </div>
      
      <div style={{marginBottom: '20px'}}>
        <p style={{fontSize: '18px', fontWeight: 'bold'}}>{SITE_CONFIG.supportEmail}</p>
        <p style={{opacity: 0.5, fontSize: '13px'}}>Kıbrıs'ın En Büyük Randevu Platformu</p>
      </div>

      <div style={{display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px', opacity: 0.5}}>
        <a href="/sartlar" style={{color:'white', textDecoration:'none'}}>Kullanım Şartları</a>
        <a href="/gizlilik" style={{color:'white', textDecoration:'none'}}>Gizlilik Politikası</a>
        <a href="/iletisim" style={{color:'white', textDecoration:'none'}}>İletişim</a>
      </div>
    </footer>
  );
}