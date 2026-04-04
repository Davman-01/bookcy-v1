import Link from 'next/link';
import { SITE_CONFIG, TRANSLATIONS } from '../lib/constants';
import { UserCircle, Moon, Sun, ChevronDown } from 'lucide-react';

export default function Navbar({ lang, setLang, theme, toggleTheme, setStep, loggedInShop, handleLogout }) {
  const t = TRANSLATIONS[lang];

  return (
    <nav className="nav">
      <div className="nav-logo" onClick={() => {setStep('services'); window.scrollTo(0,0);}}>
        {/* Orijinal SVG Logonuz */}
        <svg className="nav-logo-icon" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="10" fill="#2D1B4E"/>
          <path d="M14 15.5 Q23 15.5 23 20 Q23 24.5 14 24.5" stroke="#F5C5A3" strokeWidth="3.5" fill="none" />
          <path d="M14 24.5 Q25 24.5 25 29 Q25 33.5 14 33.5" stroke="#E8622A" strokeWidth="3.5" fill="none" />
        </svg>
        <span className="nav-logo-text">bookcy<span>.</span></span>
      </div>

      <ul className="nav-links">
        <li><button onClick={() => setStep('all_shops')}>{t.nav.places}</button></li>
        <li><Link href="/ozellikler">{t.nav.features}</Link></li>
        <li><Link href="/hakkimizda">{t.nav.about}</Link></li>
      </ul>

      <div className="nav-right">
        <div className="lang-pills">
          {['TR', 'EN', 'RU'].map(l => (
            <button key={l} onClick={() => setLang(l)} className={`lang-pill ${lang === l ? 'active' : ''}`}>{l}</button>
          ))}
        </div>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'dark' ? <Sun size={16}/> : <Moon size={16}/>}
        </button>
        {loggedInShop ? (
          <Link href="/dashboard" className="btn-primary"><UserCircle size={18}/> <span>Panel</span></Link>
        ) : (
          <Link href="/isletme-giris" className="btn-primary"><UserCircle size={18}/> <span>{t.nav.login}</span></Link>
        )}
      </div>
    </nav>
  );
}