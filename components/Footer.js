import { SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{background: SITE_CONFIG.colors.fig, color: 'white', padding: '60px 40px', textAlign: 'center'}}>
      <div style={{filter: 'brightness(0) invert(1)', marginBottom: '20px', display: 'flex', justifyContent: 'center'}}>
        <img src={SITE_CONFIG.logoPath} alt="Logo" style={{height:'36px'}} />
      </div>
      
      <div style={{marginBottom: '20px'}}>
        <p style={{fontSize: '18px', fontWeight: 'bold'}}>{SITE_CONFIG.supportEmail}</p>
        <p style={{opacity: 0.6}}>Kıbrıs'ın En Büyük Randevu Platformu</p>
      </div>

      <div style={{display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px', opacity: 0.5, marginBottom: '20px'}}>
        <a href="/sartlar" style={{color:'white'}}>Kullanım Şartları</a>
        <a href="/gizlilik" style={{color:'white'}}>Gizlilik Politikası</a>
        <a href="/iletisim" style={{color:'white'}}>İletişim</a>
      </div>

      <p style={{opacity: 0.3, fontSize: '11px'}}>
        © {new Date().getFullYear()} {SITE_CONFIG.name}. Tüm hakları saklıdır.
      </p>
    </footer>
  );
}