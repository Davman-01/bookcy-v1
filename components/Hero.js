import { SITE_CONFIG } from '@/lib/constants';

export default function Hero({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <section style={{
      background: SITE_CONFIG.colors.fig, 
      minHeight: '75vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center', 
      color: 'white', 
      padding: '0 20px',
      marginTop: '-72px' // Navbar payını kapatmak için
    }}>
      <h1 style={{fontSize: 'clamp(38px, 7vw, 64px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-1px'}}>
        Kıbrıs'ın En İyi <br/>
        <span style={{color: SITE_CONFIG.colors.terra}}>Güzellik Uzmanları</span>
      </h1>
      
      <div style={{
        background: 'white', 
        padding: '8px', 
        borderRadius: '20px', 
        display: 'flex', 
        width: '100%', 
        maxWidth: '600px', 
        marginTop: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }}>
        <input 
          style={{flex: 1, border: 'none', padding: '15px 20px', outline: 'none', color: '#333', fontSize: '16px'}}
          placeholder="Mekan veya hizmet ara..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        />
        <button onClick={onSearch} style={{
          background: SITE_CONFIG.colors.terra, 
          color: 'white', 
          border: 'none', 
          padding: '12px 35px', 
          borderRadius: '15px', 
          fontWeight: 800, 
          cursor: 'pointer',
          transition: 'all 0.2s'
        }}>
          ARA
        </button>
      </div>
    </section>
  );
}