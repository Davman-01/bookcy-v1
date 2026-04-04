import { SITE_CONFIG } from '@/lib/constants';

export default function Footer() {
  return (
    <footer style={{background: SITE_CONFIG.colors.fig, color: 'white', padding: '80px 40px 40px', textAlign: 'center'}}>
      <div style={{filter: 'brightness(0) invert(1)', marginBottom: '30px', display: 'flex', justifyContent: 'center'}}>
        <img src={SITE_CONFIG.logoPath} alt="Logo" style={{height:'40px'}} />
      </div>
      
      <div style={{marginBottom: '30px'}}>
        <a href={`mailto:${SITE_CONFIG.supportEmail}`} style={{
          fontSize: '20px', 
          fontWeight: 800, 
          color: 'white', 
          textDecoration: 'none',
          borderBottom: `2px solid ${SITE_CONFIG.colors.terra}`
        }}>
          {SITE_CONFIG.supportEmail}
        </a>
        <p style={{opacity: 0.5, marginTop: '15px'}}>Kıbrıs'ın En Büyük Randevu Platformu</p>
      </div>

      <div style={{display: 'flex', justifyContent: 'center', gap: '25px', fontSize: '14px', opacity: 0.6, marginBottom: '40px'}}>
        <a href="/sartlar" style={{color:'white', textDecoration:'none'}}>Kullanım Şartları</a>
        <a href="/gizlilik" style={{color:'white', textDecoration:'none'}}>Gizlilik Politikası</a>
        <a href="/iletisim" style={{color:'white', textDecoration:'none'}}>İletişim</a>
      </div>

      <p style={{opacity: 0.3, fontSize: '12px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px'}}>
        © {new Date().getFullYear()} {SITE_CONFIG.name}. Tüm hakları saklıdır.
      </p>
    </footer>
  );
}