import { Search, MapPin } from 'lucide-react';
import { SITE_CONFIG, TRANSLATIONS } from '../lib/constants';

export default function Hero({ lang, searchQuery, setSearchQuery, filterRegion, setFilterRegion, onSearch }) {
  const t = TRANSLATIONS[lang];

  return (
    <section className="hero">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="hero-content">
        <div className="hero-eyebrow">
          <div className="hero-eyebrow-dot"></div>
          {t.home.eyebrow}
        </div>
        <h1 className="hero-title">
          {t.home.title1}<br/>
          <span className="accent">{t.home.title2}</span><br/>
          <span className="accent-2">{t.home.title3}</span> {t.home.title4}
        </h1>
        <p className="hero-sub">{t.home.subtitle}</p>
        
        <div className="search-wrap">
          <div className="search-field">
            <Search size={18} className="search-icon"/>
            <input type="text" placeholder={t.home.searchPlace} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
          </div>
          <div className="search-divider"></div>
          <div className="search-location">
            <MapPin size={16} color="#94A3B8"/>
            <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
              <option value="All">{t.home.searchLoc}</option>
              {SITE_CONFIG.regions.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <button onClick={onSearch} className="search-btn">{t.home.searchBtn}</button>
        </div>
      </div>
    </section>
  );
}