import { Search, MapPin } from 'lucide-react';

export default function Hero({ searchQuery, setSearchQuery, onSearch }) {
  return (
    <section className="hero">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      
      <div style={{position:'relative', zIndex:2}}>
        <h1 className="hero-title">
          Kıbrıs'ın En İyi <br/>
          <span className="accent">Güzellik Uzmanlarından</span> <br/>
          <span className="accent-2">Hemen Randevu Al.</span>
        </h1>
        
        <div className="search-wrap">
          <div className="search-field">
            <Search size={20} color="#999" />
            <input 
              placeholder="Hizmet veya mekan ara..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button onClick={onSearch} className="search-btn">ARA</button>
        </div>
      </div>
    </section>
  );
}