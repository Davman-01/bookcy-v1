import { SITE_CONFIG } from '../lib/constants';

export default function Hero({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <section style={{
      background: SITE_CONFIG.colors.fig, 
      minHeight: '70vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      textAlign: 'center', 
      color: 'white', 
      padding: '0 20px'
    }}>
      <h1 style={{fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, marginBottom: '30px'}}>
        Kıbrıs'ın En İyi <br/><span style={{color: SITE_CONFIG.colors.terra}}>Güzellik Uzmanları</span>
      </h1>
      
      <div style={{
        background: 'white', padding: '8px', borderRadius: '15px', 
        display: 'flex', width: '100%', maxWidth: '550px'
      }}>
        <input 
          style={{flex: 1, border: 'none', padding: '12px 20px', outline: 'none', color: '#333', fontSize: '16px'}}
          placeholder="Mekan ara..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={onSearch} style={{
          background: SITE_CONFIG.colors.terra, color: 'white', 
          border: 'none', padding: '10px 30px', borderRadius: '10px', 
          fontWeight: 800, cursor: 'pointer'
        }}>ARA</button>
      </div>
    </section>
  );
}