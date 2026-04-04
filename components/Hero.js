import { SITE_CONFIG } from '../lib/constants';

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
      margin: '0' // Boşlukları kapattık
    }}>
      <h1 style={{fontSize: 'clamp(35px, 6vw, 60px)', fontWeight: 900, marginBottom: '20px', lineHeight: 1.1}}>
        Kıbrıs'ın En İyi <br/>
        <span style={{color: SITE_CONFIG.colors.terra}}>Güzellik Uzmanları</span>
      </h1>
      
      <div style={{
        background: 'white', padding: '8px', borderRadius: '20px', 
        display: 'flex', width: '100%', maxWidth: '600px', marginTop: '30px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.2)'
      }}>
        <input 
          style={{flex: 1, border: 'none', padding: '15px 20px', outline: 'none', color: '#333', fontSize: '16px'}}
          placeholder="Mekan veya hizmet ara..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={onSearch} style={{
          background: SITE_CONFIG.colors.terra, color: 'white', 
          border: 'none', padding: '12px 30px', borderRadius: '15px', 
          fontWeight: 800, cursor: 'pointer'
        }}>
          ARA
        </button>
      </div>
    </section>
  );
}