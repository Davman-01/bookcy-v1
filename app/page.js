"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { 
  MapPin, Star, Search, Instagram, MessageCircle, Mail, UserCircle, 
  ChevronLeft, Scissors, HeartHandshake, Briefcase, ChevronDown, Moon, Sun
} from 'lucide-react';

const LOGO_PATH = "/logo.png";
const SUPPORT_EMAIL = "info@bookcy.co";

export default function Home() {
  const [theme, setTheme] = useState('light');
  const [step, setStep] = useState('services');
  const [lang, setLang] = useState('TR');
  const [shops, setShops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRegion, setFilterRegion] = useState('All');
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    async function fetchShops() {
      const { data } = await supabase.from('shops').select('*').eq('status', 'approved');
      if (data) setShops(data);
    }
    fetchShops();
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.body.className = next;
  };

  const cyprusRegions = ["Girne", "Lefkoşa", "Mağusa", "İskele", "Güzelyurt", "Lefke"];

  return (
    <div className={theme === 'dark' ? 'dark' : ''} style={{ minHeight: '100vh', background: theme==='dark'?'#0B0710':'#FAF7F2' }}>
      <style dangerouslySetInnerHTML={{__html: `
        nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; height: 68px; display: flex; align-items: center; justify-content: space-between; padding: 0 48px; background: ${theme==='dark'?'rgba(11,7,16,0.85)':'rgba(250,247,242,0.85)'}; backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0,0,0,0.1); }
        .hero { position: relative; min-height: 100vh; background: #2D1B4E; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: white; overflow: hidden; padding: 120px 24px; }
        .hero-title { font-size: clamp(40px, 8vw, 86px); font-weight: 800; line-height: 1; margin-bottom: 24px; letter-spacing: -3px; }
        .search-wrap { display: flex; align-items: center; background: white; border-radius: 20px; padding: 8px 8px 8px 24px; width: 100%; max-width: 680px; box-shadow: 0 24px 80px rgba(0,0,0,0.35); margin: 40px auto; }
        .search-wrap input { border: none; outline: none; flex: 1; font-size: 16px; color: #333; padding: 10px; }
        .search-btn { background: #E8622A; color: white; border: none; padding: 14px 28px; border-radius: 14px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; }
        .pop-tag { font-size: 12px; padding: 6px 14px; border-radius: 50px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.65); cursor: pointer; margin: 5px; }
        .stat-box { display: flex; gap: 40px; margin-top: 60px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 40px; }
        .stat-item { text-align: center; }
        .stat-num { font-size: 32px; font-weight: 800; }
        .stat-label { font-size: 11px; opacity: 0.5; text-transform: uppercase; }
        .cat-card { text-align: center; cursor: pointer; transition: 0.3s; }
        .cat-card:hover { transform: translateY(-5px); }
        .cat-icon { width: 80px; height: 80px; border-radius: 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .venue-card { background: white; border-radius: 24px; padding: 20px; display: flex; align-items: center; gap: 20px; margin-bottom: 15px; border: 1px solid #eee; cursor: pointer; transition: 0.2s; color: #333; }
        .venue-card:hover { border-color: #E8622A; transform: scale(1.01); }
        .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.2; pointer-events: none; }
        @media (max-width: 768px) { nav { padding: 0 20px; } .stat-box { flex-direction: column; gap: 20px; } .search-wrap { flex-direction: column; padding: 15px; } }
      `}} />

      <nav>
        <div className="nav-logo" onClick={() => setStep('services')} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
           <img src={LOGO_PATH} alt="Bookcy" style={{ height: '36px' }} />
           <span style={{ fontWeight: 800, fontSize: '22px', color: theme==='dark'?'#fff':'#2D1B4E' }}>bookcy<span>.</span></span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button onClick={() => setStep('all_shops')} style={{ background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', color: theme==='dark'?'#fff':'#2D1B4E' }}>MEKANLAR</button>
          <button onClick={toggleTheme} style={{ background: 'none', border: 'none', cursor: 'pointer', color: theme==='dark'?'#fff':'#2D1B4E' }}>{theme==='dark'?<Sun size={20}/>:<Moon size={20}/>}</button>
          <Link href="/isletme-giris" style={{ background: '#E8622A', color: 'white', padding: '10px 22px', borderRadius: '50px', textDecoration: 'none', fontWeight: 800, fontSize: '13px' }}>GİRİŞ</Link>
        </div>
      </nav>

      <main>
        {step === 'services' ? (
          <div className="animate-in fade-in">
            <section className="hero">
              <div className="orb" style={{ width: '600px', height: '600px', background: '#E8622A', top: '-100px', right: '-100px' }}></div>
              <div className="orb" style={{ width: '400px', height: '400px', background: '#F5C5A3', bottom: '100px', left: '-50px' }}></div>
              
              <div style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ background: 'rgba(255,255,255,0.1)', padding: '6px 16px', borderRadius: '50px', fontSize: '12px', display: 'inline-block', marginBottom: '20px' }}>KIBRIS'IN #1 GÜZELLİK PLATFORMU</div>
                <h1 className="hero-title">Kıbrıs'ın En İyi <br/><span style={{ color: '#E8622A' }}>Güzellik Uzmanlarından</span> <br/>Hemen Randevu Al.</h1>
                <p style={{ opacity: 0.6, maxWidth: '500px', margin: '0 auto 40px' }}>Kendine iyi bak, zamanın sana kalsın. En iyi salonları saniyeler içinde bul.</p>
                
                <form className="search-wrap" onSubmit={(e) => { e.preventDefault(); setStep('all_shops'); }}>
                  <Search size={20} color="#94A3B8" />
                  <input placeholder="Hizmet veya mekan ara..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                  <div style={{ width: '1px', height: '30px', background: '#eee', margin: '0 15px' }}></div>
                  <MapPin size={20} color="#94A3B8" />
                  <select style={{ border: 'none', outline: 'none', background: 'transparent', fontWeight: 600, paddingRight: '20px' }} value={filterRegion} onChange={(e)=>setFilterRegion(e.target.value)}>
                    <option value="All">Nerede?</option>
                    {cyprusRegions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <button type="submit" className="search-btn">ARA</button>
                </form>

                <div style={{ marginTop: '20px' }}>
                   {['Berber', 'Kuaför', 'Tırnak', 'Lazer'].map(tag => (
                     <button key={tag} className="pop-tag" onClick={() => { setSearchQuery(tag); setStep('all_shops'); }}>{tag}</button>
                   ))}
                </div>

                <div className="stat-box">
                   <div className="stat-item"><div className="stat-num">140+</div><div className="stat-label">Aktif İşletme</div></div>
                   <div className="stat-item"><div className="stat-num">3.8K+</div><div className="stat-label">Mutlu Müşteri</div></div>
                   <div className="stat-item"><div className="stat-num">%98</div><div className="stat-label">Memnuniyet</div></div>
                </div>
              </div>
            </section>

            {/* Kategoriler */}
            <section style={{ padding: '80px 48px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: '1200px', margin: '0 auto 40px' }}>
                  <div>
                    <div style={{ color: '#E8622A', fontWeight: 800, letterSpacing: '2px', fontSize: '12px' }}>KATEGORİLER</div>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: theme==='dark'?'#fff':'#2D1B4E' }}>Ne arıyorsun?</h2>
                  </div>
               </div>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                  {[
                    { n: 'Berber', e: '💈', b: '#1a1a2e' },
                    { n: 'Kuaför', e: '✂️', b: '#f5c5a3' },
                    { n: 'Tırnak', e: '💅', b: '#ffd6e7' },
                    { n: 'Dövme', e: '🖋️', b: '#eee' },
                    { n: 'Spa', e: '💆', b: '#d4f5e9' },
                    { n: 'Cilt', e: '🧴', b: '#e8f4fd' }
                  ].map(c => (
                    <div key={c.n} className="cat-card" onClick={() => { setSearchQuery(c.n); setStep('all_shops'); }}>
                       <div className="cat-icon" style={{ background: c.b }}>{c.e}</div>
                       <div style={{ fontWeight: 700, fontSize: '12px', color: theme==='dark'?'#fff':'#2D1B4E' }}>{c.n.toUpperCase()}</div>
                    </div>
                  ))}
               </div>
            </section>
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto', paddingTop: '100px', paddingBottom: '100px', paddingLeft: '20px', paddingRight: '20px' }}>
             <button onClick={() => setStep('services')} style={{ background: 'none', border: 'none', color: '#E8622A', fontWeight: 800, cursor: 'pointer', marginBottom: '20px' }}>← GERİ DÖN</button>
             <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '30px', color: theme==='dark'?'#fff':'#2D1B4E' }}>Mekanlar</h2>
             {shops.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) && (filterRegion==='All' || s.location===filterRegion)).map(shop => (
               <div key={shop.id} className="venue-card" onClick={() => setSelectedShop(shop)}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#eee', overflow: 'hidden' }}>
                    <img src={shop.logo_url || LOGO_PATH} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: '20px' }}>{shop.name}</div>
                    <div style={{ fontSize: '13px', opacity: 0.6 }}><MapPin size={14} style={{ display: 'inline' }}/> {shop.location}</div>
                  </div>
                  <div style={{ background: '#E8622A', color: 'white', padding: '10px 20px', borderRadius: '12px', fontWeight: 800, fontSize: '12px' }}>RANDEVU</div>
               </div>
             ))}
          </div>
        )}
      </main>

      <footer style={{ background: '#2D1B4E', color: 'white', padding: '80px 48px 40px', textAlign: 'center' }}>
         <img src={LOGO_PATH} alt="Logo" style={{ height: '40px', filter: 'brightness(0) invert(1)', marginBottom: '20px' }} />
         <p style={{ fontSize: '18px', fontWeight: 800, marginBottom: '10px' }}>{SUPPORT_EMAIL}</p>
         <p style={{ opacity: 0.5, fontSize: '14px', marginBottom: '30px' }}>Kıbrıs'ın En Büyük Randevu Platformu</p>
         <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '13px', opacity: 0.6 }}>
            <Link href="/sartlar" style={{ color: 'white' }}>Kullanım Şartları</Link>
            <Link href="/gizlilik" style={{ color: 'white' }}>Gizlilik Politikası</Link>
            <Link href="/iletisim" style={{ color: 'white' }}>İletişim</Link>
         </div>
         <p style={{ marginTop: '40px', opacity: 0.3, fontSize: '11px' }}>© 2026 BOOKCY KIBRIS. Tüm hakları saklıdır. 🇹🇷</p>
      </footer>
    </div>
  );
}