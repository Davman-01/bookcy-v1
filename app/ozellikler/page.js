"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ChevronLeft, ShieldCheck, Target, TrendingUp, 
  Briefcase, Store, Users, MousePointerClick, 
  Smartphone, CalendarCheck, HeartHandshake, PieChart 
} from 'lucide-react';

// Sitedeki tüm özelliklerin verileri (Hafifletilmiş ve Türkçe olarak sabitlenmiş hali)
const featuresData = [
  { id: 'profile', name: "Bookcy Profili", icon: Briefcase, desc: "İşletmenizin dijital vitrinini saniyeler içinde oluşturun. Hizmetlerinizi ve çalışma saatlerinizi sergileyin.", purpose: "Bookcy Profili, işletmenizin çevrimiçi ortamdaki 7/24 açık dijital vitrinidir.", adv1: { title: "Profesyonel İmaj", desc: "Kaliteli fotoğraflar ve detaylı menü ile ilk intibanızı güçlendirin." }, adv2: { title: "Güven İnşası", desc: "Doğrulanmış müşteri yorumları sayesinde güveni hızla kazanın." }, adv3: { title: "Kolay Keşfedilebilirlik", desc: "Arama motorlarında işletmenizin daha üst sıralarda bulunmasını sağlar." } },
  { id: 'market', name: "Pazaryeri Listeleme", icon: Store, desc: "Bookcy kullanan binlerce aktif müşteriye doğrudan ulaşın. Boş koltuklarınızı hızla doldurun.", purpose: "Pazaryeri Listeleme, hizmet arayan binlerce hazır müşteriyi doğrudan sizin işletmenizle buluşturur.", adv1: { title: "Yeni Müşteriler", desc: "Bölgenizde hizmet arayan binlerce aktif kullanıcıya ulaşın." }, adv2: { title: "Boşlukları Doldurun", desc: "İptal edilen randevuları pazar yerinde sergileyerek zarar etmekten kurtulun." }, adv3: { title: "Rekabet Avantajı", desc: "Rakiplerinizin önünde yer alarak marka bilinirliğinizi yükseltin." } },
  { id: 'team', name: "Ekip Yönetimi", icon: Users, desc: "Personelinizin çalışma saatlerini ve randevu performanslarını tek bir ekrandan kolayca yönetin.", purpose: "Ekip Yönetimi, personelinizin mesailerini zahmetsizce koordine etmenizi sağlar.", adv1: { title: "Kolay Planlama", desc: "Vardiyaları ve molaları dijital olarak düzenleyerek hataları önleyin." }, adv2: { title: "Performans Takibi", desc: "Hangi personelinizin ne kadar gelir getirdiğini anlık görün." }, adv3: { title: "Bireysel Takvimler", desc: "Her çalışana özel takvim sunarak çakışmaları tamamen ortadan kaldırın." } },
  { id: 'booking', name: "Online Randevu", icon: MousePointerClick, desc: "Müşterilerinizin telefon açmadan, saniyeler içinde 7/24 randevu almasını sağlayın.", purpose: "Online Randevu, müşterilerinizin 7/24 otonom olarak kendi randevularını oluşturmasını sağlar.", adv1: { title: "Zaman Tasarrufu", desc: "Randevu telefonlarına cevap vermek yerine işinize odaklanın." }, adv2: { title: "Sıfır Hata", desc: "İnsan kaynaklı not alma hatalarını ve randevu çakışmalarını sıfıra indirin." }, adv3: { title: "Kesintisiz Hizmet", desc: "İşletmeniz kapalıyken bile rezervasyon kabul etmeye devam edin." } },
  { id: 'app', name: "Müşteri Uygulaması", icon: Smartphone, desc: "Müşterilerinize özel mobil uygulama konforu sunun. Randevularını kolayca takip etsinler.", purpose: "Müşteri Uygulaması, işletmenizle müşterilerinizin pürüzsüz bir bağ kurmalarını sağlar.", adv1: { title: "Kusursuz Deneyim", desc: "Kullanıcı dostu bir arayüzle VIP a deneyim sunun." }, adv2: { title: "Kolay Takip", desc: "Müşterilerinizin yaklaşan randevularını kendi ekranlarından takip etmelerini sağlayın." }, adv3: { title: "Anlık İptal", desc: "Gelemeyeceği randevuyu anında iptal edebilir, saat takviminize boş yansır." } },
  { id: 'marketing', name: "Pazarlama Araçları", icon: Target, desc: "Doğru zamanda doğru mesajı gönderin. SMS ve E-posta kampanyalarıyla sadakat yaratın.", purpose: "Pazarlama Araçları, eski müşterilerinizi geri kazanmanızı sağlayan iletişim asistanınızdır.", adv1: { title: "Hedefli Kampanyalar", desc: "Uzun süredir gelmeyen müşterilerinize özel fırsatlar sunun." }, adv2: { title: "SMS ve E-posta", desc: "Özel günlerde otomatik kutlama ve indirim mesajları gönderin." }, adv3: { title: "Ciro Artışı", desc: "Akıllı hatırlatmalarla müşteri ziyaret sıklığını ve gelirinizi artırın." } },
  { id: 'calendar', name: "Takvim & Planlama", icon: CalendarCheck, desc: "Karmaşık ajandaları unutun. Akıllı dijital takvim ile çakışmaları önleyin.", purpose: "Akıllı dijital takvim, randevuları kusursuz bir matematikle organize eden yapıdır.", adv1: { title: "Çakışma Koruması", desc: "Aynı saate iki farklı müşterinin randevu almasını imkansız hale getirir." }, adv2: { title: "Boşluk Optimizasyonu", desc: "Takvimdeki boşlukları analiz eder ve sadece uygun kombinasyonları gösterir." }, adv3: { title: "Sürükle & Bırak", desc: "Randevu saatlerini farenizle sürükleyerek anında değiştirin." } },
  { id: 'crm', name: "Müşteri Yönetimi", icon: HeartHandshake, desc: "Müşteri geçmişini ve özel notlarınızı güvenle saklayıp onlara kendilerini özel hissettirin.", purpose: "Müşteri Yönetimi, her müşterinizin geçmişini ve tercihlerini güvenle saklayan arşivinizdir.", adv1: { title: "Müşteri Profili", desc: "Müşterinizin en son ne zaman geldiğini ve hangi işlemi yaptırdığını görün." }, adv2: { title: "Özel Notlar", desc: "Kahve tercihinden, saç boya numarasına kadar detayları sisteme kaydedin." }, adv3: { title: "Sadakat İnşası", desc: "Müşterilerinize onları tanıdığınızı hissettirerek kırılmaz bir bağ oluşturun." } },
  { id: 'boost', name: "Öne Çık", icon: TrendingUp, desc: "Bölgenizdeki aramalarda üst sıralara çıkarak rakiplerinizin önüne geçin.", purpose: "Öne Çık, görünürlüğünüzü yapay zeka destekli olarak en üst seviyeye taşıyan pakettir.", adv1: { title: "Aramalarda Zirve", desc: "Hizmet arayan müşterilerde listelerde her zaman en üst sıralarda yer alın." }, adv2: { title: "Ana Sayfa Vitrini", desc: "Uygulamaya giren müşterilere 'Önerilenler' listesinde doğrudan gösterilin." }, adv3: { title: "Prestijli İmaj", desc: "Öne çıkan mekan rozetleriyle kalitesinizi vurgulayın." } },
  { id: 'stats', name: "İstatistik & Raporlar", icon: PieChart, desc: "Hangi hizmetten ne kadar kazandığınızı anlık ve net raporlarla görün.", purpose: "İstatistik & Raporlar, işletmenizin verilerle doğru kararlar almanızı sağlayan sistemdir.", adv1: { title: "Gerçek Zamanlı Ciro", desc: "Günlük, haftalık veya aylık kazançlarınızı anlık olarak takip edin." }, adv2: { title: "Hizmet Analizi", desc: "Size en fazla kar getiren hizmetlerinizi tespit ederek stratejinizi belirleyin." }, adv3: { title: "Personel Raporları", desc: "Hangi uzmanın daha çok randevu aldığını ve yüksek puanlandığını görün." } }
];

export default function FeaturesPage() {
  const [activeFeatureId, setActiveFeatureId] = useState(null);

  // Sayfanın en üstüne kaydırma efekti
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeFeatureId]);

  const activeFeature = featuresData.find(f => f.id === activeFeatureId);

  return (
    <div className="w-full theme-bg-main min-h-screen font-sans">
      
      {/* Üst Kısım / Banner */}
      <div className="bg-[#2D1B4E] pt-32 pb-24 px-8 text-center relative overflow-hidden border-b border-slate-800">
        
        {/* Navigasyon Butonları */}
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-4">
            <Link href="/" className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors">
                &larr; Ana Sayfaya Dön
            </Link>
            {activeFeature && (
                <button onClick={() => setActiveFeatureId(null)} className="text-[#E8622A] hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors bg-transparent border-none cursor-pointer">
                    <ChevronLeft size={16}/> Özelliklere Dön
                </button>
            )}
        </div>

        <div className="absolute top-0 left-0 w-96 h-96 bg-[#E8622A]/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F5C5A3]/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        {activeFeature ? (
          <div className="animate-in fade-in zoom-in duration-300">
            <div className="flex justify-center mb-8 relative z-10">
              <activeFeature.icon size={64} className="text-[#E8622A] drop-shadow-lg" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 relative z-10">{activeFeature.name}</h1>
          </div>
        ) : (
          <div className="animate-in fade-in duration-300">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 relative z-10">Tüm Bookcy Özellikleri</h1>
            <p className="text-lg md:text-xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed relative z-10">İşletmenizi büyütmek, zaman kazanmak ve müşteri memnuniyetini artırmak için ihtiyacınız olan her şey.</p>
          </div>
        )}
      </div>

      <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24 relative z-20">
        
        {/* DETAY GÖRÜNÜMÜ */}
        {activeFeature ? (
          <div className="theme-bg-card p-8 md:p-16 rounded-[40px] shadow-2xl theme-border border -mt-20 relative bg-white animate-in slide-in-from-bottom-8 duration-500">
              <div className="text-center max-w-3xl mx-auto mb-16 border-b theme-border-sub pb-12">
                  <h2 className="text-xl font-black text-[#E8622A] uppercase tracking-widest mb-4">Amacı ve Ne İşe Yarar?</h2>
                  <p className="text-xl md:text-2xl text-[#2D1B4E] font-medium leading-relaxed">{activeFeature.purpose}</p>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-[#2D1B4E] mb-12 text-center">İşletmenize Sağlayacağı Avantajlar</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Avantaj 1 */}
                  <div className="bg-[#F8FAFC] p-8 rounded-[24px] border border-[#F1F5F9] hover:border-[#E8622A] transition-colors group">
                      <div className="w-12 h-12 bg-white text-[#E8622A] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#E8622A] group-hover:text-white transition-colors"><ShieldCheck size={20}/></div>
                      <h3 className="font-black text-lg text-[#2D1B4E] mb-3 leading-tight">{activeFeature.adv1.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{activeFeature.adv1.desc}</p>
                  </div>
                  {/* Avantaj 2 */}
                  <div className="bg-[#F8FAFC] p-8 rounded-[24px] border border-[#F1F5F9] hover:border-[#E8622A] transition-colors group">
                      <div className="w-12 h-12 bg-white text-[#E8622A] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#E8622A] group-hover:text-white transition-colors"><Target size={20}/></div>
                      <h3 className="font-black text-lg text-[#2D1B4E] mb-3 leading-tight">{activeFeature.adv2.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{activeFeature.adv2.desc}</p>
                  </div>
                  {/* Avantaj 3 */}
                  <div className="bg-[#F8FAFC] p-8 rounded-[24px] border border-[#F1F5F9] hover:border-[#E8622A] transition-colors group">
                      <div className="w-12 h-12 bg-white text-[#E8622A] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#E8622A] group-hover:text-white transition-colors"><TrendingUp size={20}/></div>
                      <h3 className="font-black text-lg text-[#2D1B4E] mb-3 leading-tight">{activeFeature.adv3.title}</h3>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{activeFeature.adv3.desc}</p>
                  </div>
              </div>
          </div>
        ) : (
          /* LİSTE GÖRÜNÜMÜ */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in slide-in-from-bottom-8 duration-500">
              {featuresData.map((feature) => (
                  <div key={feature.id} onClick={() => setActiveFeatureId(feature.id)} className="bg-white p-8 rounded-[32px] border border-slate-100 hover:border-[#E8622A] hover:shadow-xl transition-all cursor-pointer group flex flex-col items-start">
                      <div className="w-16 h-16 bg-[#F8FAFC] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                        <feature.icon size={28} className="text-[#2D1B4E] group-hover:text-[#E8622A] transition-colors" />
                      </div>
                      <h3 className="text-2xl font-black text-[#2D1B4E] mb-3 group-hover:text-[#E8622A] transition-colors">{feature.name}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed mb-6">{feature.desc}</p>
                      
                      <div className="mt-auto text-xs font-black uppercase tracking-widest text-[#E8622A] flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0">
                        Detayları İncele &rarr;
                      </div>
                  </div>
              ))}
          </div>
        )}
      </div>

      {/* CTA ALANI */}
      <div className="bg-[#F8FAFC] py-24 text-center border-t border-slate-200">
          <h2 className="text-3xl md:text-5xl font-black uppercase text-[#2D1B4E] mb-8 tracking-tight">Kazancınızı Katlamaya Hazır mısınız?</h2>
          <Link href="/isletme-giris" className="inline-block bg-[#E8622A] text-white px-12 py-5 font-black uppercase tracking-widest text-sm rounded-full shadow-[0_0_40px_rgba(232,98,42,0.5)] hover:bg-[#d4561f] transition-colors text-decoration-none">İŞLETMENİZİ HEMEN EKLEYİN</Link>
      </div>

    </div>
  );
}