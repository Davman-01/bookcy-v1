"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { MapPin, Star, ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, ChevronDown, Phone, Calendar, Clock, Lock, Upload, FileText, Image as ImageIcon, Briefcase, MessageSquare, Mail, Settings, Edit3, ImagePlus, Target, TrendingUp, Users, Crown, Search, SlidersHorizontal, Instagram, MessageCircle, Scissors, Tag, User, UserCircle, MousePointerClick, CalendarCheck, ShieldCheck, Smartphone, Bell, HeartHandshake, Grid, X, Gem, Zap, Check, ArrowRightCircle, Award, LayoutDashboard, PieChart, Store, FilterX } from 'lucide-react';

function parseDuration(durationStr) {
  if (!durationStr) return 30;
  const match = durationStr.match(/\d+/);
  return match ? parseInt(match[0]) : 30;
}
function getRequiredSlots(durationStr) {
  return Math.ceil(parseDuration(durationStr) / 30);
}

export default function Home() {
  const router = useRouter(); 
  const [step, setStep] = useState('services'); 
  const [shops, setShops] = useState([]);
  const [lang, setLang] = useState('TR');
  const [showFeaturesMenu, setShowFeaturesMenu] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);
  
  const approvedShops = shops.filter(shop => shop.status === 'approved');

  const [selectedService, setSelectedService] = useState(null);
  const [selectedShop, setSelectedShop] = useState(null);
  
  const [bookingData, setBookingData] = useState({ date: new Date().toISOString().split('T')[0], time: '', selectedShopService: null, selectedStaff: null });
  const [formData, setFormData] = useState({ name: '', surname: '', phone: '', email: '' });
  const [bookingPhase, setBookingPhase] = useState(1);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [loggedInShop, setLoggedInShop] = useState(null);

  const [filterRegion, setFilterRegion] = useState('All');
  const [filterService, setFilterService] = useState('All');
  const [filterSort, setFilterSort] = useState('High'); 
  const [searchQuery, setSearchQuery] = useState('');

  const [newShop, setNewShop] = useState({ name: '', category: 'Berber', location: 'Girne', address: '', contactPhone: '', contactInsta: '', contactEmail: '', username: '', password: '', email: '', description: '', logoFile: null, package: 'Standart' });
  const [isUploading, setIsUploading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [appointments, setAppointments] = useState([]);
  const [closedSlots, setClosedSlots] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ name: '', rating: 5, comment: '' });
  const [profileTab, setProfileTab] = useState('services'); 
  const [lightboxImg, setLightboxImg] = useState(null);

  const cyprusRegions = ["Girne", "Lefkoşa", "Mağusa", "İskele", "Güzelyurt", "Lefke"];

  const t = {
    TR: {
      nav: { places: "Mekanlar", features: "Özellikler", contact: "İletişim", about: "Kurumsal", addShop: "İşletme Ekle", login: "İşletme Girişi", logout: "Çıkış Yap", dashboard: "Panelime Git" },
      megaMenu: { col1Title: "Kurulum", col2Title: "Müşterileri Etkile", col3Title: "İşletmeni Yönet", col4Title: "Büyümeye Devam Et", btn: "Tüm Özellikleri Keşfet" },
      featNames: { profile: "Bookcy Profili", market: "Pazaryeri Listeleme", team: "Ekip Yönetimi", booking: "Online Randevu", app: "Müşteri Uygulaması", marketing: "Pazarlama Araçları", calendar: "Takvim & Planlama", crm: "Müşteri Yönetimi", boost: "Öne Çık", stats: "İstatistik & Raporlar" },
      featDesc: {
        profile: "İşletmenizin dijital vitrinini saniyeler içinde oluşturun. Hizmetlerinizi ve çalışma saatlerinizi sergileyin.",
        market: "Bookcy kullanan binlerce aktif müşteriye doğrudan ulaşın. Boş koltuklarınızı hızla doldurun.",
        team: "Personelinizin çalışma saatlerini ve randevu performanslarını tek bir ekrandan kolayca yönetin.",
        booking: "Müşterilerinizin telefon açmadan, saniyeler içinde 7/24 randevu almasını sağlayın.",
        app: "Müşterilerinize özel mobil uygulama konforu sunun. Randevularını kolayca takip etsinler.",
        marketing: "Doğru zamanda doğru mesajı gönderin. SMS ve E-posta kampanyalarıyla sadakat yaratın.",
        calendar: "Karmaşık ajandaları unutun. Akıllı dijital takvim ile çakışmaları önleyin.",
        crm: "Müşteri geçmişini ve özel notlarınızı güvenle saklayıp onlara kendilerini özel hissettirin.",
        boost: "Bölgenizdeki aramalarda üst sıralara çıkarak rakiplerinizin önüne geçin.",
        stats: "Hangi hizmetten ne kadar kazandığınızı anlık ve net raporlarla görün."
      },
      featDetails: {
        profile: { purpose: "Bookcy Profili, işletmenizin çevrimiçi ortamdaki 7/24 açık dijital vitrinidir.", adv1: { title: "Profesyonel İmaj", desc: "Kaliteli fotoğraflar ve detaylı menü ile ilk intibanızı güçlendirin." }, adv2: { title: "Güven İnşası", desc: "Doğrulanmış müşteri yorumları sayesinde güveni hızla kazanın." }, adv3: { title: "Kolay Keşfedilebilirlik", desc: "Arama motorlarında işletmenizin daha üst sıralarda bulunmasını sağlar." } },
        market: { purpose: "Pazaryeri Listeleme, hizmet arayan binlerce hazır müşteriyi doğrudan sizin işletmenizle buluşturur.", adv1: { title: "Yeni Müşteriler", desc: "Bölgenizde hizmet arayan binlerce aktif kullanıcıya ulaşın." }, adv2: { title: "Boşlukları Doldurun", desc: "İptal edilen randevuları pazar yerinde sergileyerek zarar etmekten kurtulun." }, adv3: { title: "Rekabet Avantajı", desc: "Rakiplerinizin önünde yer alarak marka bilinirliğinizi yükseltin." } },
        team: { purpose: "Ekip Yönetimi, personelinizin mesailerini zahmetsizce koordine etmenizi sağlar.", adv1: { title: "Kolay Planlama", desc: "Vardiyaları ve molaları dijital olarak düzenleyerek hataları önleyin." }, adv2: { title: "Performans Takibi", desc: "Hangi personelinizin ne kadar gelir getirdiğini anlık görün." }, adv3: { title: "Bireysel Takvimler", desc: "Her çalışana özel takvim sunarak çakışmaları tamamen ortadan kaldırın." } },
        booking: { purpose: "Online Randevu, müşterilerinizin 7/24 otonom olarak kendi randevularını oluşturmasını sağlar.", adv1: { title: "Zaman Tasarrufu", desc: "Randevu telefonlarına cevap vermek yerine işinize odaklanın." }, adv2: { title: "Sıfır Hata", desc: "İnsan kaynaklı not alma hatalarını ve randevu çakışmalarını sıfıra indirin." }, adv3: { title: "Kesintisiz Hizmet", desc: "İşletmeniz kapalıyken bile rezervasyon kabul etmeye devam edin." } },
        app: { purpose: "Müşteri Uygulaması, işletmenizle müşterilerinizin pürüzsüz bir bağ kurmalarını sağlar.", adv1: { title: "Kusursuz Deneyim", desc: "Kullanıcı dostu bir arayüzle VIP bir deneyim sunun." }, adv2: { title: "Kolay Takip", desc: "Müşterilerinizin yaklaşan randevularını kendi ekranlarından takip etmelerini sağlayın." }, adv3: { title: "Anlık İptal", desc: "Gelemeyeceği randevuyu anında iptal edebilir, saat takviminize boş yansır." } },
        marketing: { purpose: "Pazarlama Araçları, eski müşterilerinizi geri kazanmanızı sağlayan iletişim asistanınızdır.", adv1: { title: "Hedefli Kampanyalar", desc: "Uzun süredir gelmeyen müşterilerinize özel fırsatlar sunun." }, adv2: { title: "SMS ve E-posta", desc: "Özel günlerde otomatik kutlama ve indirim mesajları gönderin." }, adv3: { title: "Ciro Artışı", desc: "Akıllı hatırlatmalarla müşteri ziyaret sıklığını ve gelirinizi artırın." } },
        calendar: { purpose: "Akıllı dijital takvim, randevuları kusursuz bir matematikle organize eden yapıdır.", adv1: { title: "Çakışma Koruması", desc: "Aynı saate iki farklı müşterinin randevu almasını imkansız hale getirir." }, adv2: { title: "Boşluk Optimizasyonu", desc: "Takvimdeki boşlukları analiz eder ve sadece uygun kombinasyonları gösterir." }, adv3: { title: "Sürükle & Bırak", desc: "Randevu saatlerini farenizle sürükleyerek anında değiştirin." } },
        crm: { purpose: "Müşteri Yönetimi, her müşterinizin geçmişini ve tercihlerini güvenle saklayan arşivinizdir.", adv1: { title: "Müşteri Profili", desc: "Müşterinizin en son ne zaman geldiğini ve hangi işlemi yaptırdığını görün." }, adv2: { title: "Özel Notlar", desc: "Kahve tercihinden, saç boya numarasına kadar detayları sisteme kaydedin." }, adv3: { title: "Sadakat İnşası", desc: "Müşterilerinize onları tanıdığınızı hissettirerek kırılmaz bir bağ oluşturun." } },
        boost: { purpose: "Öne Çık, görünürlüğünüzü yapay zeka destekli olarak en üst seviyeye taşıyan pakettir.", adv1: { title: "Aramalarda Zirve", desc: "Hizmet arayan müşterilerde listelerde her zaman en üst sıralarda yer alın." }, adv2: { title: "Ana Sayfa Vitrini", desc: "Uygulamaya giren müşterilere 'Önerilenler' listesinde doğrudan gösterilin." }, adv3: { title: "Prestijli İmaj", desc: "Öne çıkan mekan rozetleriyle kalitesinizi vurgulayın." } },
        stats: { purpose: "İstatistik & Raporlar, işletmenizin verilerle doğru kararlar almanızı sağlayan sistemdir.", adv1: { title: "Gerçek Zamanlı Ciro", desc: "Günlük, haftalık veya aylık kazançlarınızı anlık olarak takip edin." }, adv2: { title: "Hizmet Analizi", desc: "Size en fazla kar getiren hizmetlerinizi tespit ederek stratejinizi belirleyin." }, adv3: { title: "Personel Raporları", desc: "Hangi uzmanın daha çok randevu aldığını ve yüksek puanlandığını görün." } }
      },
      featUI: { purposeTitle: "Amacı ve Ne İşe Yarar?", benefitsTitle: "İşletmenize Sağlayacağı Avantajlar", allFeaturesTitle: "Tüm Bookcy Özellikleri", allFeaturesSub: "İşletmenizi büyütmek, zaman kazanmak ve müşteri memnuniyetini artırmak için ihtiyacınız olan her şey." },
      home: { eyebrow: "Kıbrıs'ın #1 Güzellik Platformu", title1: "Kendine", title2: "iyi bak,", title3: "hemen rezerve", title4: "et.", subtitle: "Yakınındaki en iyi berber, kuaför, spa ve güzellik uzmanlarını bul. Tek tıkla randevu al, zamanın senin.", searchPlace: "Hizmet veya mekan ara...", searchLoc: "Nerede?", searchBtn: "Ara", popTitle: "Popüler:", stats: {s1:"Aktif İşletme", s2:"Mutlu Müşteri", s3:"Tamamlanan Randevu", s4:"Ortalama Puan"} },
      cats: { catTitle: "Kategoriler", catSub: "Ne arıyorsun?", seeAll: "Tümünü Gör →", tattoo: "Dövme", barber: "Berber", hair: "Kuaför", nail: "Tırnak & Güzellik", club: "Bar & Club", spa: "Spa & Masaj", makeup: "Makyaj", skincare: "Cilt Bakımı" },
      homeInfo: { 
          recLabel: "Öne Çıkanlar", recTitle: "Kıbrıs'ta Bu Hafta 🔥", 
          howLabel: "Nasıl Çalışır?", howTitle: "4 adımda randevun hazır",
          how1Title: "Keşfet", how1Desc: "Yakındaki mekanları harita veya liste görünümünde incele, filtrele.",
          how2Title: "Tarih Seç", how2Desc: "Müsait saatleri gör, sana en uygun zamanı tek tıkla seç.",
          how3Title: "Onayla", how3Desc: "Saniyeler içinde rezervasyonun onaylanır. WhatsApp bildirimi alırsın.",
          how4Title: "Keyif Çıkar", how4Desc: "Git, hizmetini al, puan ver. Bir sonraki randevu için sadakat puanı kazan.",
          ctaLabel: "İşletme Sahibi misiniz?", ctaTitle1: "Bookcy ile", ctaTitle2: "işletmeni büyüt.", ctaSub: "Randevu sistemini dijitalleştir. Yeni müşteri kazan. Komisyonsuz, sabit ücret."
      },
      filters: { title: "Arama Sonuçları", search: "Mekan Ara...", region: "Bölge Seçimi", service: "Kategoriler", sortHigh: "En Yüksek Puan", sortLow: "En Düşük Puan", clear: "Temizle", count: "Mekan Bulundu" },
      reg: { title: "İŞLETME KAYIT BAŞVURUSU", subtitle: "Sadece İşletme Sahipleri İçindir", shopName: "İşletme Adı", location: "Bölge Seçin", address: "Tam Adres", desc: "Açıklama / Hakkımızda", email: "Admin E-Posta", contactPhone: "İşletme Telefonu", contactInsta: "Instagram (Kullanıcı Adı)", contactEmail: "İletişim E-Posta", user: "Kullanıcı Adı", pass: "Şifre", pack: "Paket Seçimi", upload: "Logo Yükle", submit: "BAŞVURUYU TAMAMLA", success: "BAŞVURUNUZ ALINDI!", uploading: "YÜKLENİYOR..." },
      shops: { back: "GERİ DÖN", empty: "Bu kriterlere uygun işletme bulunamadı.", score: "Yorum" },
      profile: { tabServices: "Hizmet Menüsü", tabGallery: "Galeri", about: "Hakkında", contactTitle: "İLETİŞİM", bookBtn: "SEÇ", reviewBtn: "Yorumlar", noDesc: "İşletme henüz bir açıklama eklememiş.", noServices: "İşletme henüz hizmet listesi eklememiş.", noGallery: "İşletme henüz galeriye fotoğraf eklememiş." },
      book: { change: "Geri", selectService: "Devam etmek için bir hizmet seçin.", selectStaff: "UZMAN SEÇİN", anyStaff: "Fark Etmez", date: "Tarih Seçin", time: "Saat Seçin", name: "Adınız", surname: "Soyadınız", phone: "Telefon Numaranız", email: "E-Posta (Opsiyonel)", submit: "ONAYLA", success: "RANDEVU ONAYLANDI", successSub: "Bilgileriniz işletmeye başarıyla iletildi.", backHome: "ANA SAYFAYA DÖN", total: "Toplam", details: "Randevu Detayları", service: "Hizmet", staff: "Uzman", dateTime: "Tarih / Saat", contactInfo: "İletişim Bilgileriniz", btnBook: "Rezervasyon Yap →" },
      review: { title: "DENEYİMİNİ PAYLAŞ", name: "İSMİNİZ (İsteğe Bağlı)", comment: "Harika bir deneyimdi...", submit: "YORUMU GÖNDER", empty: "HENÜZ YORUM YAPILMAMIŞ" },
      about: { title: "Sektörün Dijital Devrimi", subtitle: "İşletmenizi Büyütün, Zamanınızı Geri Kazanın.", missionDesc: "Telefon trafiğinden, ajanda karmaşasından ve unutulan randevulardan kurtulun. BOOKCY, Kıbrıs'ın pazar lideri randevu platformudur.", bizTitle: "İşletmeler İçin Karlı Çözümler", biz1: "Kesintisiz 7/24 Rezervasyon", biz1Desc: "Siz uyurken veya çalışırken sistem sizin yerinize randevu alır.", biz2: "Boş Koltuklara Son", biz2Desc: "Son dakika iptallerini minimuma indirin.", biz3: "Sıfır Komisyon", biz3Desc: "Her randevudan komisyon kesen sistemleri unutun!", biz4: "Bölgenizin Lideri Olun", biz4Desc: "Gerçek müşteri yorumları ve dijital portfolyonuzla rakiplerinizin önüne geçin.", usrTitle: "Müşteriler Neden Bookcy'i Seçiyor?", usr1: "Sırada Beklemeye Son", usr1Desc: "Saatlerce sıra beklemek yok. Kendi planınıza göre saatinizi seçin.", usr2: "Şeffaf Fiyatlandırma", usr2Desc: "Ne kadar ödeyeceğinizi net bir şekilde bilin.", usr3: "Güvenilir Uzman Yorumları", usr3Desc: "Sadece o işletmeden hizmet almış kişilerin gerçek deneyimlerini okuyun.", packTitle: "Büyüme Hedefinize Uygun Paketler", packSub: "Sürpriz kesintiler yok, gizli ücretler yok.", pkg1Name: "Standart Paket", pkg1Price: "1.500 TL", pkg1Period: "/ Ay", pkg1Feat1: "Sınırsız Randevu Alımı", pkg1Feat2: "Kapsamlı İşletme Paneli", pkg1Feat3: "Personel Optimizasyonu", pkg1Feat4: "Müşteri Yorumları", pkg1Feat5: "Standart Listelenme", pkg2Name: "Premium VIP", pkg2Price: "3.000 TL", pkg2Period: "/ Ay", pkg2Feat1: "Standart Paketteki Her Şey", pkg2Feat2: "Ana Sayfada 'Önerilenler' Vitrini", pkg2Feat3: "Arama Sonuçlarında Üst Sıra", pkg2Feat4: "VIP Gold Çerçeve", pkg2Feat5: "Gelişmiş Portfolyo", ctaTitle: "Kazancınızı Katlamaya Hazır mısınız?", ctaBtn: "İŞLETMENİZİ HEMEN EKLEYİN" },
      contact: { title: "BİZE ULAŞIN", sub: "Platform hakkında sorularınız ve destek talepleriniz için bize 7/24 ulaşabilirsiniz.", whatsapp: "WhatsApp Destek", wpDesc: "Anında yanıt almak için WhatsApp hattımızdan bize ulaşın.", insta: "Instagram", instaDesc: "En yeni mekanları keşfetmek için takip edin.", email: "Kurumsal E-Posta", emailDesc: "Sponsorluk ve kurumsal görüşmeler için e-posta gönderebilirsiniz.", btnWp: "MESAJ AT", btnInsta: "TAKİP ET", btnEmail: "MAİL GÖNDER", ofis: "Ofisimiz" },
      admin: { loginTitle: "İşletme Yönetimi", user: "Kullanıcı Adı", pass: "Şifre", loginBtn: "GİRİŞ YAP" },
      footer: { desc: "Kıbrıs'ın güzellik ve bakım hizmetleri için tek rezervasyon platformu.", links: "Platform", cities: "İşletmeler", legal: "Hakkımızda", copy: "Tüm hakları saklıdır. Kıbrıs'ta kurulmuştur. 🇨🇾" }
    },
    EN: {
      nav: { places: "Places", features: "Features", contact: "Contact", about: "Pricing", addShop: "Add Business", login: "Login", logout: "Logout", dashboard: "Dashboard" },
      megaMenu: { col1Title: "Set up shop", col2Title: "Wow your clients", col3Title: "Run your business", col4Title: "Keep growing", btn: "Explore All Features" },
      featNames: { profile: "Bookcy Profile", market: "Marketplace", team: "Team Management", booking: "Online Booking", app: "Customer App", marketing: "Marketing Tools", calendar: "Calendar", crm: "Client Management", boost: "Boost", stats: "Stats & Reports" },
      featDesc: { profile: "Create your digital storefront.", market: "Reach active customers.", team: "Manage staff hours.", booking: "Let clients book 24/7.", app: "Mobile app for clients.", marketing: "Send SMS/Email campaigns.", calendar: "Smart digital calendar.", crm: "Store client history.", boost: "Rank higher in searches.", stats: "Track your revenue." },
      featDetails: {
        profile: { purpose: "Your 24/7 open digital storefront.", adv1: { title: "Professional Image", desc: "Quality photos and detailed menu." }, adv2: { title: "Build Trust", desc: "Gain trust through reviews." }, adv3: { title: "Discoverability", desc: "Found on search engines." } },
        market: { purpose: "Connects customers directly with your business.", adv1: { title: "Thousands of Clients", desc: "Reach active users." }, adv2: { title: "Fill Empty Seats", desc: "Display canceled appointments." }, adv3: { title: "Competitive Edge", desc: "Stay ahead of competitors." } },
        team: { purpose: "Coordinate your staff's shifts and performance.", adv1: { title: "Easy Scheduling", desc: "Digitally arrange shifts." }, adv2: { title: "Performance", desc: "See staff revenue." }, adv3: { title: "Calendars", desc: "Eliminate conflicts." } },
        booking: { purpose: "Allows clients to book autonomously 24/7.", adv1: { title: "Save Time", desc: "Focus on your work." }, adv2: { title: "Zero Errors", desc: "Eliminate double bookings." }, adv3: { title: "24/7 Service", desc: "Accept bookings anytime." } },
        app: { purpose: "Ensures a seamless connection with your business.", adv1: { title: "Flawless Experience", desc: "Provide a VIP experience." }, adv2: { title: "Easy Tracking", desc: "Clients view appointments." }, adv3: { title: "Updates", desc: "Clients cancel easily." } },
        marketing: { purpose: "Your automated assistant to build loyalty.", adv1: { title: "Targeted Campaigns", desc: "Offer special deals." }, adv2: { title: "SMS & Email", desc: "Automated greetings." }, adv3: { title: "Revenue Boost", desc: "Increase client frequency." } },
        calendar: { purpose: "Perfectly organizes staff hours and appointments.", adv1: { title: "Conflict Protection", desc: "No double-booking." }, adv2: { title: "Optimization", desc: "Shows optimal times." }, adv3: { title: "Drag & Drop", desc: "Modify times easily." } },
        crm: { purpose: "Safely stores all history and preferences.", adv1: { title: "Detailed Profiles", desc: "See past visits." }, adv2: { title: "Private Notes", desc: "Save important details." }, adv3: { title: "Build Loyalty", desc: "Make clients feel special." } },
        boost: { purpose: "Maximizes your visibility using AI.", adv1: { title: "Top Search Ranks", desc: "Appear at the top." }, adv2: { title: "Homepage", desc: "Get featured directly." }, adv3: { title: "Image", desc: "Exclusive badges." } },
        stats: { purpose: "Helps you make data-driven decisions.", adv1: { title: "Real-Time Revenue", desc: "Track earnings." }, adv2: { title: "Service Analysis", desc: "Identify profitable services." }, adv3: { title: "Staff Reports", desc: "See top specialists." } }
      },
      featUI: { purposeTitle: "Purpose & What It Does", benefitsTitle: "Benefits For Your Business", allFeaturesTitle: "All Features", allFeaturesSub: "Everything you need to grow your business." },
      home: { eyebrow: "Cyprus's #1 Beauty Platform", heroTitle: "Take care", heroSub: "of yourself, book instantly.", searchPlace: "Search services...", searchLoc: "Where?", searchBtn: "Search", popTitle: "Popular:", stats: {s1:"Active Places", s2:"Happy Clients", s3:"Appointments", s4:"Average Rating"} },
      cats: { catTitle: "Categories", catSub: "What are you looking for?", seeAll: "See All →", tattoo: "Tattoo", barber: "Barber", hair: "Hair Salon", nail: "Nail Art", club: "Bar & Club", spa: "Spa & Massage", makeup: "Makeup", skincare: "Skin Care" },
      homeInfo: { recLabel: "Featured", recTitle: "Trending This Week 🔥", howLabel: "How it works?", howTitle: "Ready in 4 steps", how1Title: "Discover", how1Desc: "Find nearby places.", how2Title: "Select Date", how2Desc: "Pick the best time.", how3Title: "Confirm", how3Desc: "Booking confirmed.", how4Title: "Enjoy", how4Desc: "Get your service.", ctaLabel: "Business owner?", ctaTitle1: "Grow your business", ctaTitle2: "with Bookcy.", ctaSub: "Digitize your booking system." },
      filters: { title: "Search Results", search: "Search places...", region: "Location", service: "Categories", sortHigh: "Highest Rated", sortLow: "Lowest Rated", clear: "Clear", count: "Places Found" },
      reg: { title: "BUSINESS REGISTRATION", subtitle: "For Business Owners Only", shopName: "Business Name", location: "Select Region", address: "Full Address", desc: "Description", email: "Admin Email", contactPhone: "Business Phone", contactInsta: "Instagram Username", contactEmail: "Contact Email", user: "Username", pass: "Password", pack: "Select Package", upload: "Upload Logo", submit: "COMPLETE APPLICATION", success: "APPLICATION RECEIVED!", uploading: "UPLOADING..." },
      shops: { back: "GO BACK", empty: "No businesses found.", score: "Reviews" },
      profile: { tabServices: "Service Menu", tabGallery: "Gallery", about: "About Us", contactTitle: "CONTACT INFO", bookBtn: "SELECT", reviewBtn: "Reviews", noDesc: "No description yet.", noServices: "No services yet.", noGallery: "No photos yet." },
      book: { change: "Back", selectService: "Select a service to continue.", selectStaff: "SELECT STAFF", anyStaff: "Any Staff", date: "Select Date", time: "Select Time", name: "First Name", surname: "Last Name", phone: "Phone", email: "Email", submit: "CONFIRM", success: "APPOINTMENT CONFIRMED", successSub: "Your details have been sent.", backHome: "RETURN TO HOME", total: "Total", details: "Appointment Details", service: "Service", staff: "Staff", dateTime: "Date / Time", contactInfo: "Contact Info", btnBook: "Book Now →" },
      review: { title: "SHARE EXPERIENCE", name: "YOUR NAME", comment: "Great experience...", submit: "SUBMIT", empty: "NO REVIEWS YET" },
      about: { title: "Digital Revolution", subtitle: "Grow Your Business.", missionDesc: "Get rid of phone traffic. BOOKCY is Cyprus's market-leading booking platform.", bizTitle: "Solutions for Businesses", biz1: "24/7 Booking", biz1Desc: "Accept bookings while you sleep.", biz2: "No Empty Chairs", biz2Desc: "Minimize cancellations.", biz3: "Zero Commissions", biz3Desc: "Pay only a fixed fee.", biz4: "Be the Leader", biz4Desc: "Stand out from competitors.", usrTitle: "Why Customers Choose Bookcy?", usr1: "No More Waiting", usr1Desc: "Choose a time that fits.", usr2: "Transparent Pricing", usr2Desc: "Know what you will pay.", usr3: "Reliable Reviews", usr3Desc: "Read verified reviews.", packTitle: "Packages", packSub: "No hidden fees.", pkg1Name: "Standard", pkg1Price: "1.500 TL", pkg1Period: "/ Month", pkg1Feat1: "Unlimited Bookings", pkg1Feat2: "Dashboard", pkg1Feat3: "Staff Management", pkg1Feat4: "Reviews", pkg1Feat5: "Standard Ranking", pkg2Name: "Premium VIP", pkg2Price: "3.000 TL", pkg2Period: "/ Month", pkg2Feat1: "Everything in Standard", pkg2Feat2: "Homepage 'Recommended'", pkg2Feat3: "Top Ranks in Search", pkg2Feat4: "VIP Border", pkg2Feat5: "Advanced Gallery", ctaTitle: "Ready to Multiply Your Income?", ctaBtn: "ADD YOUR BUSINESS" },
      contact: { title: "CONTACT US", sub: "We are here 24/7.", whatsapp: "WhatsApp", wpDesc: "Contact us via WhatsApp.", insta: "Instagram", instaDesc: "Follow us.", email: "Corporate Email", emailDesc: "Email us for inquiries.", btnWp: "MESSAGE", btnInsta: "FOLLOW", btnEmail: "EMAIL", ofis: "Our Office" },
      admin: { loginTitle: "Business Login", user: "Username", pass: "Password", loginBtn: "LOGIN" },
      footer: { desc: "Cyprus's premier booking platform for beauty & wellness.", links: "Platform", cities: "Businesses", legal: "About Us", copy: "All rights reserved. Made in Cyprus. 🇨🇾" }
    },
    RU: {
      nav: { places: "Места", features: "Функции", contact: "Контакты", about: "Пакеты", addShop: "Добавить бизнес", login: "Вход", logout: "Выйти", dashboard: "Панель" },
      megaMenu: { col1Title: "Настройка", col2Title: "Клиенты", col3Title: "Бизнес", col4Title: "Развитие", btn: "Узнать все функции" },
      featNames: { profile: "Профиль Bookcy", market: "Маркетплейс", team: "Команда", booking: "Онлайн-бронирование", app: "Приложение", marketing: "Маркетинг", calendar: "Календарь", crm: "Управление клиентами", boost: "Продвижение", stats: "Статистика" },
      featDesc: { profile: "Создайте витрину за секунды.", market: "Охватите тысячи клиентов.", team: "Управляйте персоналом.", booking: "Бронирование 24/7.", app: "Мобильное приложение.", marketing: "SMS и Email кампании.", calendar: "Умный календарь.", crm: "Управление клиентами.", boost: "Выше в поиске.", stats: "Следите за доходами." },
      featDetails: {
        profile: { purpose: "Ваша цифровая витрина.", adv1: { title: "Имидж", desc: "Улучшите первое впечатление." }, adv2: { title: "Доверие", desc: "Отзывы клиентов." }, adv3: { title: "Поиск", desc: "Легкий поиск." } },
        market: { purpose: "Связывает клиентов с вашим бизнесом.", adv1: { title: "Клиенты", desc: "Активные пользователи." }, adv2: { title: "Пустые места", desc: "Отмененные записи." }, adv3: { title: "Конкуренция", desc: "Опережайте конкурентов." } },
        team: { purpose: "Управление командой.", adv1: { title: "Планирование", desc: "Избегайте ошибок." }, adv2: { title: "Оценка", desc: "Отслеживайте доходы." }, adv3: { title: "Календари", desc: "Исключите конфликты." } },
        booking: { purpose: "Онлайн-бронирование 24/7.", adv1: { title: "Экономия времени", desc: "Сосредоточьтесь на работе." }, adv2: { title: "Ноль ошибок", desc: "Без человеческого фактора." }, adv3: { title: "Сервис 24/7", desc: "Принимайте записи всегда." } },
        app: { purpose: "Приложение для клиентов.", adv1: { title: "Опыт", desc: "Современный интерфейс." }, adv2: { title: "Отслеживание", desc: "Прошлые визиты." }, adv3: { title: "Обновления", desc: "Отмена записей." } },
        marketing: { purpose: "Маркетинг.", adv1: { title: "Кампании", desc: "Скидки." }, adv2: { title: "SMS", desc: "Поздравления." }, adv3: { title: "Рост", desc: "Напоминания." } },
        calendar: { purpose: "Календарь организует работу.", adv1: { title: "Защита", desc: "Без двойного бронирования." }, adv2: { title: "Оптимизация", desc: "Идеальное время." }, adv3: { title: "Легкость", desc: "Перетаскивание." } },
        crm: { purpose: "Управление клиентами.", adv1: { title: "Профили", desc: "Последние визиты." }, adv2: { title: "Заметки", desc: "Предпочтения." }, adv3: { title: "Лояльность", desc: "Каждый клиент особенный." } },
        boost: { purpose: "Продвижение с помощью ИИ.", adv1: { title: "Топ", desc: "Всегда вверху." }, adv2: { title: "На главной", desc: "'Рекомендуемые'." }, adv3: { title: "Имидж", desc: "Значки профиля." } },
        stats: { purpose: "Статистика.", adv1: { title: "Доход", desc: "Заработок." }, adv2: { title: "Услуги", desc: "Прибыльные процедуры." }, adv3: { title: "Отчеты", desc: "Кто получает больше записей." } }
      },
      featUI: { purposeTitle: "Цель", benefitsTitle: "Преимущества", allFeaturesTitle: "Все функции", allFeaturesSub: "Всё для роста бизнеса." },
      home: { eyebrow: "Платформа красоты #1", heroTitle: "Запишитесь", heroSub: "Найдите лучших специалистов и бронируйте мгновенно.", searchPlace: "Поиск услуг...", searchLoc: "Где?", searchBtn: "ПОИСК", popTitle: "Популярные:", stats: {s1:"Активные", s2:"Клиенты", s3:"Записи", s4:"Рейтинг"} },
      cats: { catTitle: "Категории", catSub: "Что вы ищете?", seeAll: "Все →", tattoo: "Тату", barber: "Барбер", hair: "Парикмахерская", nail: "Маникюр", club: "Бар", spa: "Спа", makeup: "Макияж", skincare: "Уход за кожей" },
      homeInfo: { recLabel: "Популярные", recTitle: "В тренде 🔥", howLabel: "Как это работает?", howTitle: "Готово за 4 шага", how1Title: "Найти", how1Desc: "Найдите салоны.", how2Title: "Дата", how2Desc: "Свободное время.", how3Title: "Подтвердить", how3Desc: "Бронь подтверждена.", how4Title: "Наслаждаться", how4Desc: "Оставьте отзыв.", ctaLabel: "Владелец бизнеса?", ctaTitle1: "Развивайте бизнес", ctaTitle2: "с Bookcy.", ctaSub: "Оцифруйте бизнес." },
      filters: { title: "Результаты", search: "Поиск...", region: "Где?", service: "Услуги", sortHigh: "С высоким рейтингом", sortLow: "С низким рейтингом", clear: "Очистить", count: "Найдено" },
      reg: { title: "РЕГИСТРАЦИЯ", subtitle: "Для бизнеса", shopName: "Название", location: "Регион", address: "Адрес", desc: "Описание", email: "Email", contactPhone: "Телефон", contactInsta: "Instagram", contactEmail: "Контактный Email", user: "Имя пользователя", pass: "Пароль", pack: "Пакет", upload: "Логотип", submit: "ЗАВЕРШИТЬ", success: "ЗАЯВКА ПОЛУЧЕНА!", uploading: "ЗАГРУЗКА..." },
      shops: { back: "НАЗАД", empty: "Не найдено.", score: "Отзывы" },
      profile: { tabServices: "Услуги", tabGallery: "Галерея", about: "О НАС", contactTitle: "КОНТАКТЫ", bookBtn: "ВЫБРАТЬ", reviewBtn: "Отзывы", noDesc: "Нет описания.", noServices: "Нет услуг.", noGallery: "Нет фото." },
      book: { change: "Назад", selectService: "Выберите услугу", selectStaff: "ВЫБЕРИТЕ СПЕЦИАЛИСТА", anyStaff: "Любой", date: "Дата", time: "Время", name: "Имя", surname: "Фамилия", phone: "Телефон", email: "Email", submit: "ПОДТВЕРДИТЬ", success: "БРОНЬ ПОДТВЕРЖДЕНА", successSub: "Данные отправлены.", backHome: "НА ГЛАВНУЮ", total: "Итого", details: "Детали", service: "Услуга", staff: "Специалист", dateTime: "Дата / Время", contactInfo: "Контакты", btnBook: "Забронировать →" },
      review: { title: "ОТЗЫВ", name: "ИМЯ", comment: "Отлично...", submit: "ОТПРАВИТЬ", empty: "НЕТ ОТЗЫВОВ" },
      about: { title: "Революция", subtitle: "Развивайте бизнес.", missionDesc: "BOOKCY — платформа Кипра.", bizTitle: "Решения", biz1: "Бронь 24/7", biz1Desc: "Принимайте заказы.", biz2: "Нет отменам", biz2Desc: "Сведите к минимуму отмены.", biz3: "Без комиссий", biz3Desc: "Фиксированная плата.", biz4: "Лидерство", biz4Desc: "Выделяйтесь.", usrTitle: "Почему Bookcy?", usr1: "Без очередей", usr1Desc: "Удобное время.", usr2: "Прозрачные цены", usr2Desc: "Точная цена.", usr3: "Отзывы", usr3Desc: "Читайте реальные отзывы.", packTitle: "Пакеты", packSub: "Никаких скрытых платежей.", pkg1Name: "Стандарт", pkg1Price: "1.500 TL", pkg1Period: "/ Месяц", pkg1Feat1: "Безлимит", pkg1Feat2: "Панель", pkg1Feat3: "Персонал", pkg1Feat4: "Отзывы", pkg1Feat5: "Стандарт", pkg2Name: "Премиум VIP", pkg2Price: "3.000 TL", pkg2Period: "/ Месяц", pkg2Feat1: "Всё включено", pkg2Feat2: "Топ на главной", pkg2Feat3: "Высший рейтинг", pkg2Feat4: "VIP Рамка", pkg2Feat5: "Галерея", ctaTitle: "Готовы расти?", ctaBtn: "ДОБАВИТЬ БИЗНЕС" },
      contact: { title: "КОНТАКТЫ", sub: "Мы здесь 24/7.", whatsapp: "WhatsApp", wpDesc: "Свяжитесь.", insta: "Instagram", instaDesc: "Подписывайтесь.", email: "Эл. почта", emailDesc: "Напишите нам.", btnWp: "НАПИСАТЬ", btnInsta: "ПОДПИСАТЬСЯ", btnEmail: "ОТПРАВИТЬ", ofis: "Офис" },
      admin: { loginTitle: "Вход", user: "Имя", pass: "Пароль", loginBtn: "ВОЙТИ" },
      footer: { desc: "Платформа бронирования на Кипре.", links: "Платформа", cities: "Бизнес", legal: "О нас", copy: "Все права защищены. Сделано на Кипре. 🇨🇾" }
    }
  };

  const megaMenuStructure = {
      col1: ['profile', 'market', 'team'],
      col2: ['booking', 'app'],
      col3: ['marketing', 'calendar', 'crm'],
      col4: ['boost', 'stats']
  };

  const featureIcons = {
      profile: <Briefcase size={40} className="text-[#E8622A] mb-4"/>,
      market: <Store size={40} className="text-[#E8622A] mb-4"/>,
      team: <Users size={40} className="text-[#E8622A] mb-4"/>,
      booking: <MousePointerClick size={40} className="text-[#E8622A] mb-4"/>,
      app: <Smartphone size={40} className="text-[#E8622A] mb-4"/>,
      marketing: <Target size={40} className="text-[#E8622A] mb-4"/>,
      calendar: <CalendarCheck size={40} className="text-[#E8622A] mb-4"/>,
      crm: <HeartHandshake size={40} className="text-[#E8622A] mb-4"/>,
      boost: <TrendingUp size={40} className="text-[#E8622A] mb-4"/>,
      stats: <PieChart size={40} className="text-[#E8622A] mb-4"/>,
  };

  const featureIconsSmall = {
      profile: <Briefcase size={20}/>, market: <Store size={20}/>, team: <Users size={20}/>, booking: <MousePointerClick size={20}/>, app: <Smartphone size={20}/>, marketing: <Target size={20}/>, calendar: <CalendarCheck size={20}/>, crm: <HeartHandshake size={20}/>, boost: <TrendingUp size={20}/>, stats: <PieChart size={20}/>,
  };

  const packages = [{ name: "Standart", price: "1.500 TL / Ay" }, { name: "Premium", price: "3.000 TL / Ay" }];
  const categories = [ 
      { key: "barber", dbName: "Berber", bg: "linear-gradient(135deg,#1a1a2e,#2d1b4e)", emoji: "💈" }, 
      { key: "hair", dbName: "Kuaför", bg: "linear-gradient(135deg,#f5c5a3,#e8622a)", emoji: "✂️" }, 
      { key: "nail", dbName: "Tırnak & Güzellik", bg: "linear-gradient(135deg,#ffd6e7,#ff88b2)", emoji: "💅" }, 
      { key: "tattoo", dbName: "Dövme", bg: "linear-gradient(135deg,#1a1a1a,#444)", emoji: "🖋️" }, 
      { key: "spa", dbName: "Spa & Masaj", bg: "linear-gradient(135deg,#d4f5e9,#00c48c)", emoji: "💆" }, 
      { key: "skincare", dbName: "Cilt Bakımı", bg: "linear-gradient(135deg,#e8f4fd,#3498db)", emoji: "🧴" }, 
      { key: "makeup", dbName: "Makyaj", bg: "linear-gradient(135deg,#fff0e6,#e8622a)", emoji: "💄" }, 
      { key: "club", dbName: "Bar & Club", bg: "linear-gradient(135deg,#1a0a0a,#3d1515)", emoji: "🍸" } 
  ];
  const allTimeSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];

  useEffect(() => { 
      fetchShops(); 
      fetchReviews(); 
      const session = localStorage.getItem('bookcy_biz_session');
      if(session) setLoggedInShop(JSON.parse(session));
  }, []);
  
  useEffect(() => { 
      if (selectedShop && bookingData.date) { 
          fetchAppointments(selectedShop.id, bookingData.date); 
          fetchClosedSlots(selectedShop.id, bookingData.date); 
      } 
  }, [selectedShop, bookingData.date]);

  // ANIMATIONS
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if(e.isIntersecting) { e.target.classList.add('visible'); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(r => observer.observe(r));

    const handleScroll = () => {
        const nav = document.querySelector('nav');
        if(nav) nav.style.background = window.scrollY > 50 ? 'rgba(250,247,242,0.97)' : 'rgba(250,247,242,0.85)';
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
    };
  }, [step]);

  async function fetchShops() { const { data } = await supabase.from('shops').select('*'); if (data) setShops(data); }
  async function fetchReviews() { const { data } = await supabase.from('reviews').select('*').order('created_at', { ascending: false }); if (data) setReviews(data); }
  async function fetchAppointments(shopId, date = null) {
    let query = supabase.from('appointments').select('*').eq('shop_id', shopId);
    if (date) query = query.eq('appointment_date', date);
    const { data } = await query;
    if (data) setAppointments(data);
  }
  async function fetchClosedSlots(shopId, date = null) {
     let query = supabase.from('closed_slots').select('*').eq('shop_id', shopId);
     if (date) query = query.eq('date', date);
     const { data } = await query;
     if (data) setClosedSlots(data.map(item => item.slot));
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const inputUser = loginForm.user.trim().toLowerCase();
    const inputPass = loginForm.pass.trim();
    const shop = shops.find(s => s.admin_username.toLowerCase() === inputUser && s.admin_password === inputPass);
    if (shop) {
      if (shop.status !== 'approved' && shop.status) { alert("Hesabınız henüz onaylanmamış! Lütfen dekontunuzu iletip onay bekleyiniz."); return; }
      localStorage.setItem('bookcy_biz_session', JSON.stringify(shop));
      setShowLogin(false);
      router.push('/dashboard'); 
    } else alert("Kullanıcı adı veya şifre hatalı!");
  };

  const handleLogout = () => { localStorage.removeItem('bookcy_biz_session'); setLoggedInShop(null); };
  const handleHeroSearch = (e) => { e.preventDefault(); setStep('all_shops'); window.scrollTo(0,0); };
  const goToFeature = (featureKey) => { setActiveFeature(featureKey); setStep('feature_detail'); setShowFeaturesMenu(false); window.scrollTo(0,0); };

  async function handleRegisterSubmit(e) {
    e.preventDefault();
    setIsUploading(true);
    let uploadedLogoUrl = null;
    if (newShop.logoFile) {
      const fileName = `${Math.random()}.${newShop.logoFile.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage.from('logos').upload(fileName, newShop.logoFile);
      if (!uploadError) uploadedLogoUrl = supabase.storage.from('logos').getPublicUrl(fileName).data.publicUrl;
    }
    const { error } = await supabase.from('shops').insert([
      { name: newShop.name, category: newShop.category, location: newShop.location, address: newShop.address, admin_email: newShop.email, admin_username: newShop.username, admin_password: newShop.password, description: newShop.description, logo_url: uploadedLogoUrl, package: newShop.package, status: 'pending', contact_phone: newShop.contactPhone, contact_insta: newShop.contactInsta, contact_email: newShop.contactEmail, services: [], staff: [], gallery: [] }
    ]);
    setIsUploading(false);
    if (!error) {
        setRegisterSuccess(true);
        try { await fetch('/api/email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: newShop.email, subject: 'BOOKCY - Başvurunuz Alındı!', text: `Başvurunuz alındı. İşlemler sürüyor.` }) }); } catch(err) {}
    } else alert("Hata oluştu. Veritabanı sütunlarını kontrol ediniz.");
  }

  async function handleBooking(e) {
    e.preventDefault();
    if(!bookingData.selectedShopService) { alert(t[lang].book.selectService); return; }
    if(!bookingData.selectedStaff) { alert(t[lang].book.selectStaff); return; }

    const startIndex = allTimeSlots.indexOf(bookingData.time);
    const neededSlots = getRequiredSlots(bookingData.selectedShopService.duration);
    const occupied_slots = allTimeSlots.slice(startIndex, startIndex + neededSlots);

    let assignedStaffName = bookingData.selectedStaff.name;
    if (assignedStaffName === t[lang].book.anyStaff || assignedStaffName === 'Fark Etmez') {
        if (selectedShop.staff && selectedShop.staff.length > 0) {
            const availableStaff = selectedShop.staff.find(staff => {
                return occupied_slots.every(checkSlot => {
                    if (closedSlots.includes(checkSlot)) return false;
                    const isBooked = appointments.some(a => a.staff_name === staff.name && (a.occupied_slots ? a.occupied_slots.includes(checkSlot) : a.appointment_time === checkSlot));
                    return !isBooked;
                });
            });
            assignedStaffName = availableStaff ? availableStaff.name : 'Genel';
        }
    }

    const { error } = await supabase.from('appointments').insert([{ 
        shop_id: selectedShop.id, customer_name: formData.name, customer_surname: formData.surname, customer_phone: formData.phone, customer_email: formData.email, appointment_date: bookingData.date, appointment_time: bookingData.time, 
        service_name: bookingData.selectedShopService.name, staff_name: assignedStaffName, occupied_slots: occupied_slots 
    }]);

    if (!error) {
        setStep('success');
        window.scrollTo(0,0);
        if (formData.email) { 
            try { await fetch('/api/email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: formData.email, subject: `BOOKCY - Randevu Onayı`, text: `Randevunuz onaylandı.` }) }); } catch(err) {} 
        }
        if (selectedShop.admin_email) { 
            try { await fetch('/api/email', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ to: selectedShop.admin_email, subject: 'Yeni Randevu Talebi!', text: `Yeni randevu alındı.` }) }); } catch(err) {} 
        }
    } else alert("Randevu alınırken bir hata oluştu!");
  }

  async function submitReview(e) {
    e.preventDefault();
    const finalName = reviewForm.name.trim() === '' ? 'Anonim' : reviewForm.name.trim();
    const { data, error } = await supabase.from('reviews').insert([{ shop_id: selectedShop.id, customer_name: finalName, rating: reviewForm.rating, comment: reviewForm.comment }]).select();
    if (!error && data) { setReviews(prevReviews => [data[0], ...prevReviews]); setReviewForm({ name: '', rating: 5, comment: '' }); alert("Yorumunuz eklendi."); }
  }

  function getAverageRating(shopId) {
    const shopReviews = reviews.filter(r => r.shop_id == shopId);
    if (shopReviews.length === 0) return "5.0"; 
    const sum = shopReviews.reduce((acc, curr) => acc + curr.rating, 0);
    return (sum / shopReviews.length).toFixed(1);
  }
  function getAverageRatingNum(shopId) { return parseFloat(getAverageRating(shopId)); }

  const isSearching = searchQuery.trim().length > 0 || filterRegion !== 'All';
  
  const displayShops = approvedShops.filter(shop => {
      const matchRegion = filterRegion === 'All' || (shop.location && shop.location.toLowerCase().includes(filterRegion.toLowerCase()));
      const matchService = filterService === 'All' || shop.category === filterService;
      const matchSearch = shop.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchRegion && matchService && matchSearch;
  });

  const sortedShops = [...displayShops].sort((a, b) => {
      if (filterSort === 'High') return getAverageRatingNum(b.id) - getAverageRatingNum(a.id);
      if (filterSort === 'Low') return getAverageRatingNum(a.id) - getAverageRatingNum(b.id);
      return 0;
  });
  
  const recommendedShops = approvedShops.filter(s => getAverageRatingNum(s.id) >= 4.0).slice(0, 8);

  return (
    <>
    <style dangerouslySetInnerHTML={{__html: `
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600;700&display=swap');
      :root {
        --fig: #2D1B4E;
        --terra: #E8622A;
        --blush: #F5C5A3;
        --sand: #FAF7F2;
        --white: #FFFFFF;
        --muted: #8B7FA0;
        --light: #F0ECF8;
      }
      body {
        background: var(--sand);
        color: var(--fig);
        font-family: 'Outfit', sans-serif;
        overflow-x: hidden;
      }
      nav {
        position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 0 48px; height: 68px;
        display: flex; align-items: center; justify-content: space-between;
        background: rgba(250,247,242,0.85); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(45,27,78,0.07);
        transition: background 0.3s;
      }
      .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; cursor: pointer; }
      .nav-logo-icon { width: 36px; height: 36px; }
      .nav-logo-text { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; color: var(--fig); letter-spacing: -1px; display:flex; align-items:baseline; }
      .nav-logo-text span { color: var(--terra); }
      .nav-links { display: flex; align-items: center; gap: 36px; list-style: none; height: 100%; margin:0; padding:0; }
      .nav-links button { text-decoration: none; font-size: 14px; font-weight: 600; color: var(--fig); opacity: 0.7; transition: opacity 0.2s; position: relative; background:none; border:none; outline:none; font-family:'Outfit', sans-serif; cursor:pointer;}
      .nav-links button:hover, .nav-links button.active { opacity:1; color: var(--terra); }
      .lang-pills { display: flex; flex-direction: row; gap: 4px; }
      .lang-pill { font-size: 11px; font-weight:600; padding: 4px 10px; border-radius: 20px; border: 1.5px solid transparent; transition: all 0.2s; color: var(--muted); cursor:pointer;}
      .lang-pill.active { background: var(--fig); color: white; border-color: var(--fig); }
      .lang-pill:hover:not(.active) { border-color: var(--fig); color: var(--fig); }
      .nav-right { display: flex; flex-direction: row; align-items: center; gap: 16px; flex-shrink: 0; white-space: nowrap; }
      .btn-outline { font-family:'Outfit',sans-serif; font-size: 13px; font-weight: 600; padding: 9px 20px; border-radius: 50px; border: 1.5px solid var(--fig); background: transparent; color: var(--fig); transition: all 0.25s; cursor:pointer;}
      .btn-outline:hover { background:var(--fig); color:white; }
      .btn-primary { font-family:'Outfit',sans-serif; font-size: 13px; font-weight: 700; padding: 10px 22px; border-radius: 50px; border: none; background: var(--terra); color: white; transition: all 0.25s; display:flex; align-items:center; gap:7px; cursor:pointer;}
      .btn-primary:hover { background: #d4561f; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(232,98,42,0.35); }
      .hero { position: relative; min-height: 100vh; background: var(--fig); overflow: hidden; display: flex; flex-direction:column; align-items: center; justify-content: center; padding-top: 120px; padding-bottom: 120px; }
      .hero::before { content:''; position:absolute; inset:0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); pointer-events: none; z-index:1; opacity:0.4; }
      .orb { position:absolute; border-radius:50%; filter: blur(80px); pointer-events:none; }
      .orb-1 { width:600px; height:600px; background: radial-gradient(circle, rgba(232,98,42,0.25) 0%, transparent 70%); top:-100px; right:-100px; animation: float1 8s ease-in-out infinite; }
      .orb-2 { width:400px; height:400px; background: radial-gradient(circle, rgba(245,197,163,0.15) 0%, transparent 70%); bottom:100px; left:50px; animation: float2 10s ease-in-out infinite; }
      .orb-3 { width:300px; height:300px; background: radial-gradient(circle, rgba(0,196,140,0.1) 0%, transparent 70%); top: 40%; left:40%; animation: float1 12s ease-in-out infinite reverse; }
      @keyframes float1 { 0%,100%{ transform: translateY(0) scale(1); } 50% { transform: translateY(-30px) scale(1.05); } }
      @keyframes float2 { 0%,100%{ transform: translateY(0) rotate(0deg); } 50% { transform: translateY(20px) rotate(5deg); } }
      .hero-content { position:relative; z-index:2; text-align:center; padding: 0 24px; max-width: 860px; animation: fadeUp 0.8s ease both; }
      @keyframes fadeUp { from { opacity:0; transform:translateY(30px); } to { opacity:1; transform:translateY(0); } }
      .hero-eyebrow { display:inline-flex; align-items:center; gap:8px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); border-radius:50px; padding: 6px 16px 6px 8px; font-size:12px; font-weight:600; color:rgba(255,255,255,0.7); letter-spacing:1px; text-transform:uppercase; margin-bottom:28px; animation: fadeUp 0.8s 0.1s ease both; }
      .hero-eyebrow-dot { width:6px; height:6px; border-radius:50%; background:var(--terra); animation: pulse 2s infinite; }
      @keyframes pulse { 0%,100%{ box-shadow:0 0 0 0 rgba(232,98,42,0.6); } 50% { box-shadow:0 0 0 6px rgba(232,98,42,0); } }
      .hero-title { font-family:'Syne',sans-serif; font-size: clamp(52px, 8vw, 96px); font-weight:800; color: white; letter-spacing: -4px; line-height: 0.95; margin-bottom:24px; animation: fadeUp 0.8s 0.2s ease both; }
      .hero-title .accent { color: var(--terra); }
      .hero-title .accent-2 { position:relative; display:inline-block; color: var(--blush); }
      .hero-title .accent-2::after { content:''; position:absolute; bottom:-4px; left:0; right:0; height:4px; border-radius:2px; background: linear-gradient(90deg, var(--terra), transparent); }
      .hero-sub { font-size:17px; font-weight:400; color: rgba(255,255,255,0.55); line-height:1.6; margin-bottom: 48px; max-width:520px; margin-left:auto; margin-right:auto; animation: fadeUp 0.8s 0.3s ease both; }
      .search-wrap { display:flex; align-items:center; background: white; border-radius: 20px; padding: 8px 8px 8px 24px; gap: 0; max-width: 680px; width:100%; box-shadow: 0 24px 80px rgba(0,0,0,0.35); margin: 0 auto; animation: fadeUp 0.8s 0.4s ease both; transition: box-shadow 0.3s; }
      .search-wrap:focus-within { box-shadow: 0 24px 80px rgba(0,0,0,0.4), 0 0 0 3px rgba(232,98,42,0.3); }
      .search-field { flex:1; display:flex; align-items:center; gap:10px; }
      .search-icon { color: var(--muted); font-size:18px; flex-shrink:0; }
      .search-field input, .search-location select { border:none; outline:none; width:100%; font-family:'Outfit',sans-serif; font-size:15px; font-weight:600; color:var(--fig); background:transparent; }
      .search-field input::placeholder { color:#B0A8C0; font-weight:400; }
      .search-divider { width:1px; height:32px; background: rgba(45,27,78,0.12); margin: 0 16px; }
      .search-location { display:flex; align-items:center; gap:8px; min-width:140px; flex:1; }
      .search-btn { border:none; background: var(--terra); color:white; font-family:'Outfit',sans-serif; font-size:14px; font-weight:700; padding: 14px 28px; border-radius:14px; transition: all 0.25s; white-space:nowrap; display:flex; align-items:center; gap:8px; cursor:pointer;}
      .search-btn:hover { background:#d4561f; transform:scale(1.03); }
      .hero-popular { display:flex; align-items:center; gap:10px; margin-top:20px; flex-wrap:wrap; justify-content:center; animation: fadeUp 0.8s 0.5s ease both; }
      .hero-popular span { font-size:12px; color:rgba(255,255,255,0.4); font-weight:500; letter-spacing:0.5px; }
      .pop-tag { font-size:12px; font-weight:500; padding:5px 14px; border-radius:50px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.65); transition:all 0.2s; cursor:pointer;}
      .pop-tag:hover { background:rgba(255,255,255,0.15); color:white; }
      .hero-stats { display:flex; gap:0; margin-top: 60px; margin-bottom: 20px; border-top:1px solid rgba(255,255,255,0.08); padding-top:40px; width:100%; max-width:680px; animation: fadeUp 0.8s 0.6s ease both; position: relative; z-index: 10; }
      .stat { flex:1; text-align:center; border-right:1px solid rgba(255,255,255,0.08); }
      .stat:last-child { border-right:none; }
      .stat-num { font-family:'Syne',sans-serif; font-size:32px; font-weight:800; color:white; letter-spacing:-1px; line-height:1; }
      .stat-num span { color:var(--terra); }
      .stat-label { font-size:11px; font-weight:500; color:rgba(255,255,255,0.4); text-transform:uppercase; letter-spacing:1.5px; margin-top:6px; }
      .wave { position:absolute; bottom:-5px; left:0; right:0; z-index:3; width: 100%; height: auto; }
      .section-categories { background: var(--sand); padding: 80px 48px 60px; }
      .section-header { display:flex; align-items:flex-end; justify-content:space-between; max-width:1200px; margin:0 auto 48px; }
      .section-label-sm { font-size:11px; font-weight:700; letter-spacing:4px; text-transform:uppercase; color:var(--terra); margin-bottom:8px; }
      .section-title { font-family:'Syne',sans-serif; font-size:36px; font-weight:800; color:var(--fig); letter-spacing:-1.5px; line-height:1.1; }
      .see-all { font-size:13px; font-weight:600; color:var(--terra); text-decoration:none; display:flex; align-items:center; gap:6px; transition:gap 0.2s; background:none; border:none; padding:0; cursor:pointer;}
      .see-all:hover { gap:10px; }
      .categories-grid { display:grid; grid-template-columns: repeat(8, 1fr); gap:16px; max-width:1200px; margin:0 auto; }
      .cat-card { display:flex; flex-direction:column; align-items:center; gap:12px; transition:transform 0.25s; cursor:pointer;}
      .cat-card:hover { transform:translateY(-6px); }
      .cat-img-wrap { width:100%; aspect-ratio:1; border-radius:20px; overflow:hidden; position:relative; box-shadow: 0 4px 20px rgba(45,27,78,0.1); transition:box-shadow 0.3s; }
      .cat-card:hover .cat-img-wrap { box-shadow: 0 12px 40px rgba(45,27,78,0.2); }
      .cat-img-wrap::after { content:''; position:absolute; inset:0; background: linear-gradient(180deg, transparent 40%, rgba(45,27,78,0.5) 100%); transition: opacity 0.3s; }
      .cat-card:hover .cat-img-wrap::after { opacity:0.7; }
      .cat-emoji-bg { width:100%; height:100%; display:flex; align-items:center; justify-content:center; font-size:40px; border-radius:20px; }
      .cat-name { font-size:11px; font-weight:700; letter-spacing:1.5px; text-transform:uppercase; color:var(--fig); text-align:center; }
      .section-featured { background: var(--white); padding: 80px 48px; }
      .featured-grid { display:grid; grid-template-columns: 1fr 1fr 1fr; gap:24px; max-width:1200px; margin:0 auto; }
      .venue-card { border-radius:24px; overflow:hidden; background: var(--sand); transition:transform 0.3s, box-shadow 0.3s; position:relative; display:flex; flex-direction:column; cursor:pointer;}
      .venue-card:hover { transform:translateY(-8px); box-shadow:0 24px 60px rgba(45,27,78,0.15); }
      .venue-card.featured { grid-row: span 2; }
      .venue-img { width:100%; height:200px; background:var(--light); position:relative; overflow:hidden; display:flex; align-items:center; justify-content:center; font-size:60px; }
      .venue-card.featured .venue-img { height:320px; }
      .venue-img img { width:100%; height:100%; object-fit:cover; }
      .venue-badge { position:absolute; top:14px; left:14px; background:var(--terra); color:white; font-size:10px; font-weight:700; letter-spacing:1px; text-transform:uppercase; padding:4px 10px; border-radius:50px; z-index:10; }
      .venue-badge.hot { background:linear-gradient(135deg,#E8622A,#c94e1f); display:flex; align-items:center; gap:4px; }
      .venue-badge.new { background:var(--fig); }
      .venue-fav { position:absolute; top:14px; right:14px; width:32px; height:32px; border-radius:50%; background:rgba(255,255,255,0.9); backdrop-filter:blur(8px); display:flex; align-items:center; justify-content:center; font-size:14px; transition:transform 0.2s; z-index:10; }
      .venue-fav:hover { transform:scale(1.15); }
      .venue-info { padding:20px; display:flex; flex-direction:column; flex:1; }
      .venue-cat { font-size:10px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:var(--terra); margin-bottom:6px; }
      .venue-name { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; color:var(--fig); letter-spacing:-0.5px; margin-bottom:8px; }
      .venue-meta { display:flex; align-items:center; gap:16px; font-size:12px; color:var(--muted); }
      .venue-rating { display:flex; align-items:center; gap:4px; font-weight:600; color:var(--fig); }
      .star { color:#F4C430; font-size:12px; }
      .venue-price { margin-left:auto; font-size:13px; font-weight:700; color:var(--fig); }
      .venue-price span { color:var(--muted); font-weight:400; font-size:11px; }
      .venue-tags { display:flex; gap:6px; flex-wrap:wrap; margin-top:12px; }
      .vtag { font-size:10px; font-weight:600; padding:3px 10px; border-radius:50px; background:var(--light); color:var(--fig); }
      .venue-book-btn { width:100%; margin-top:auto; padding:11px; background:var(--fig); color:white; border:none; border-radius:12px; font-family:'Outfit',sans-serif; font-size:13px; font-weight:700; transition:all 0.25s; display:flex; align-items:center; justify-content:center; gap:8px; cursor:pointer;}
      .venue-book-btn:hover { background:var(--terra); }
      .section-how { background: var(--fig); padding: 100px 48px; position:relative; overflow:hidden; }
      .section-how::before { content:''; position:absolute; inset:0; background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.02'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); }
      .how-inner { max-width:1200px; margin:0 auto; position:relative; z-index:1; }
      .how-header { text-align:center; margin-bottom:72px; }
      .how-header .section-label-sm { color:var(--blush); opacity:0.7; }
      .how-header .section-title { color:white; }
      .steps-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:32px; position:relative; }
      .steps-grid::before { content:''; position:absolute; top:40px; left:12.5%; right:12.5%; height:1px; background: linear-gradient(90deg, transparent, rgba(232,98,42,0.4), rgba(232,98,42,0.4), transparent); z-index:0; }
      .step { text-align:center; position:relative; z-index:1; animation: fadeUp 0.6s ease both; }
      .step:nth-child(1){ animation-delay:0.1s; } .step:nth-child(2){ animation-delay:0.2s; } .step:nth-child(3){ animation-delay:0.3s; } .step:nth-child(4){ animation-delay:0.4s; }
      .step-icon { width:80px; height:80px; border-radius:24px; display:flex; align-items:center; justify-content:center; font-size:32px; margin:0 auto 20px; position:relative; }
      .step-icon::before { content:''; position:absolute; inset:-1px; border-radius:25px; background: linear-gradient(135deg, rgba(232,98,42,0.6), rgba(245,197,163,0.2)); z-index:-1; }
      .step-num { position:absolute; top:-8px; right:-8px; width:24px; height:24px; border-radius:50%; background:var(--terra); color:white; font-size:11px; font-weight:800; display:flex; align-items:center; justify-content:center; }
      .step-title { font-family:'Syne',sans-serif; font-size:18px; font-weight:800; color:white; margin-bottom:10px; letter-spacing:-0.5px; }
      .step-desc { font-size:13px; line-height:1.6; color:rgba(255,255,255,0.45); }
      .section-cta { padding:80px 48px; background:var(--sand); }
      .cta-inner { max-width:1200px; margin:0 auto; background:var(--fig); border-radius:32px; padding:72px 80px; display:flex; align-items:center; gap:64px; position:relative; overflow:hidden; }
      .cta-inner::before { content:''; position:absolute; right:-100px; top:-100px; width:400px; height:400px; border-radius:50%; background:radial-gradient(circle, rgba(232,98,42,0.3), transparent 70%); }
      .cta-text { flex:1; position:relative; z-index:1; }
      .cta-text .section-label-sm { color:var(--blush); opacity:0.6; }
      .cta-title { font-family:'Syne',sans-serif; font-size:42px; font-weight:800; color:white; letter-spacing:-2px; line-height:1.1; margin:12px 0 16px; }
      .cta-title span { color:var(--terra); }
      .cta-sub { font-size:15px; color:rgba(255,255,255,0.5); line-height:1.6; max-width:380px; }
      .cta-actions { display:flex; gap:14px; position:relative; z-index:1; flex-shrink:0; }
      .app-badge { display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.12); border-radius:14px; padding:12px 20px; transition:all 0.25s; color:white; text-decoration:none; cursor:pointer;}
      .app-badge:hover { background:rgba(255,255,255,0.15); transform:translateY(-2px); }
      .app-badge-icon { font-size:24px; }
      .app-badge-text { line-height:1.2; text-align:left; }
      .app-badge-text .small { font-size:10px; opacity:0.55; letter-spacing:0.5px; }
      .app-badge-text .big { font-size:14px; font-weight:700; }
      footer { background:var(--fig); padding:60px 48px 32px; color:rgba(255,255,255,0.5); }
      .footer-top { display:grid; grid-template-columns:2fr 1fr 1fr 1fr; gap:48px; max-width:1200px; margin:0 auto 48px; }
      .footer-brand-name { font-family:'Syne',sans-serif; font-size:24px; font-weight:800; color:white; letter-spacing:-1px; margin-bottom:12px; display:flex; align-items:baseline; }
      .footer-brand-name span { color:var(--terra); }
      .footer-desc { font-size:13px; line-height:1.7; max-width:260px; }
      .footer-col-title { font-size:11px; font-weight:700; letter-spacing:2px; text-transform:uppercase; color:white; margin-bottom:20px; }
      .footer-links { list-style:none; display:flex; flex-direction:column; gap:10px; padding:0; margin:0; }
      .footer-links a, .footer-links button { font-size:13px; color:rgba(255,255,255,0.45); text-decoration:none; transition:color 0.2s; background:none; border:none; text-align:left; padding:0; font-family:'Outfit',sans-serif; cursor:pointer;}
      .footer-links a:hover, .footer-links button:hover { color:white; }
      .footer-bottom { max-width:1200px; margin:0 auto; border-top:1px solid rgba(255,255,255,0.07); padding-top:24px; display:flex; justify-content:space-between; align-items:center; font-size:12px; }
      .footer-socials { display:flex; gap:12px; }
      .social-btn { width:36px; height:36px; border-radius:10px; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); display:flex; align-items:center; justify-content:center; transition:all 0.2s; text-decoration:none; color:white; }
      .social-btn:hover { background:rgba(232,98,42,0.3); border-color:var(--terra); }
      .reveal { opacity:0; transform:translateY(24px); transition: opacity 0.7s ease, transform 0.7s ease; }
      .reveal.visible { opacity:1; transform:translateY(0); }
      .reveal-delay-1 { transition-delay:0.1s; }
      .reveal-delay-2 { transition-delay:0.2s; }
      .reveal-delay-3 { transition-delay:0.3s; }
      .reveal-delay-4 { transition-delay:0.4s; }
      @media(max-width:900px){
        nav { padding:0 20px; }
        .nav-links { display:none; }
        .categories-grid { grid-template-columns:repeat(4,1fr); }
        .featured-grid { grid-template-columns:1fr; }
        .steps-grid { grid-template-columns:1fr 1fr; }
        .steps-grid::before { display:none; }
        .cta-inner { flex-direction:column; gap:32px; padding:48px 32px; }
        .cta-actions { flex-direction:column; width:100%; }
        .footer-top { grid-template-columns:1fr 1fr; }
        .hero-stats { flex-direction:column; gap:24px; }
        .stat { border-right:none; border-bottom:1px solid rgba(255,255,255,0.08); padding-bottom:16px; }
        .search-wrap { flex-direction: column; border-radius:16px; padding:16px; gap:12px; }
        .search-divider { height:1px; width:100%; margin:4px 0; }
        .nav-right .btn-outline { display:none; }
        .nav-right .btn-primary span { display:none; }
      }
    `}} />

    <nav>
      <div className="nav-logo" onClick={() => {setStep('services'); setShowLogin(false); setShowRegister(false); window.scrollTo(0,0);}}>
        <svg className="nav-logo-icon" viewBox="0 0 36 36" fill="none">
          <rect width="36" height="36" rx="10" fill="#2D1B4E"/>
          <circle cx="18" cy="10" r="4.5" fill="#F5C5A3"/>
          <rect x="10" y="15.5" width="4" height="15" rx="2" fill="#F5C5A3"/>
          <path d="M14 15.5 Q23 15.5 23 20 Q23 24.5 14 24.5" stroke="#F5C5A3" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <path d="M14 24.5 Q25 24.5 25 29 Q25 33.5 14 33.5" stroke="#E8622A" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
          <circle cx="28" cy="8" r="4.5" fill="#E8622A"/>
          <polyline points="25.5,8 27.5,10 31,6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </svg>
        <span className="nav-logo-text">bookcy<span>.</span></span>
      </div>

      <ul className="nav-links">
        <li><button onClick={() => {setStep('all_shops'); setShowLogin(false); setShowRegister(false); window.scrollTo(0,0);}} className={['all_shops', 'shops', 'shop_profile', 'booking'].includes(step) ? 'active' : ''}>{t[lang].nav.places}</button></li>
        <li style={{height:'100%', display:'flex', alignItems:'center'}}>
            <div className="relative h-full flex items-center group" onMouseEnter={() => setShowFeaturesMenu(true)} onMouseLeave={() => setShowFeaturesMenu(false)}>
                <button onClick={() => {setStep('all_features'); setShowFeaturesMenu(false); window.scrollTo(0,0);}} className={`flex items-center gap-1 transition-colors h-full ${['features', 'feature_detail', 'all_features'].includes(step) || showFeaturesMenu ? 'active' : ''}`}>
                    {t[lang].nav.features} <ChevronDown size={14} className={`transition-transform duration-200 ${showFeaturesMenu ? 'rotate-180' : ''}`} />
                </button>
                {showFeaturesMenu && (
                    <div className="absolute top-[68px] left-1/2 -translate-x-1/2 w-screen bg-[#1b0f30] text-white shadow-2xl border-t border-slate-800 cursor-default animate-in slide-in-from-top-2 duration-200">
                        <div className="max-w-[1000px] mx-auto py-12 px-8">
                            <div className="grid grid-cols-4 gap-8 mb-10 text-left">
                                <div><h4 className="font-black text-[11px] uppercase tracking-widest mb-6 text-[#E8622A]">{t[lang].megaMenu.col1Title}</h4><ul className="space-y-5 font-bold text-slate-300 capitalize text-sm">{megaMenuStructure.col1.map(key => <li key={key} onClick={() => goToFeature(key)} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-[#E8622A]"/> {t[lang].featNames[key]}</li>)}</ul></div>
                                <div><h4 className="font-black text-[11px] uppercase tracking-widest mb-6 text-[#E8622A]">{t[lang].megaMenu.col2Title}</h4><ul className="space-y-5 font-bold text-slate-300 capitalize text-sm">{megaMenuStructure.col2.map(key => <li key={key} onClick={() => goToFeature(key)} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-[#E8622A]"/> {t[lang].featNames[key]}</li>)}</ul></div>
                                <div><h4 className="font-black text-[11px] uppercase tracking-widest mb-6 text-[#E8622A]">{t[lang].megaMenu.col3Title}</h4><ul className="space-y-5 font-bold text-slate-300 capitalize text-sm">{megaMenuStructure.col3.map(key => <li key={key} onClick={() => goToFeature(key)} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-[#E8622A]"/> {t[lang].featNames[key]}</li>)}</ul></div>
                                <div><h4 className="font-black text-[11px] uppercase tracking-widest mb-6 text-[#E8622A]">{t[lang].megaMenu.col4Title}</h4><ul className="space-y-5 font-bold text-slate-300 capitalize text-sm">{megaMenuStructure.col4.map(key => <li key={key} onClick={() => goToFeature(key)} className="hover:text-white cursor-pointer transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-[#E8622A]"/> {t[lang].featNames[key]}</li>)}</ul></div>
                            </div>
                            <div className="flex justify-center border-t border-slate-800 pt-8"><button onClick={() => {setStep('all_features'); setShowFeaturesMenu(false); window.scrollTo(0,0);}} className="border border-slate-700 bg-[#1b0f30] text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 hover:text-[#E8622A] transition-colors">{t[lang].megaMenu.btn}</button></div>
                        </div>
                    </div>
                )}
            </div>
        </li>
        <li><button onClick={() => {setStep('about'); setShowLogin(false); setShowRegister(false); window.scrollTo(0,0);}} className={step === 'about' ? 'active' : ''}>{t[lang].nav.about}</button></li>
        <li><button onClick={() => {setStep('contact'); setShowLogin(false); setShowRegister(false); window.scrollTo(0,0);}} className={step === 'contact' ? 'active' : ''}>{t[lang].nav.contact}</button></li>
      </ul>

      <div className="nav-right">
        <div className="lang-pills">
          <div onClick={()=>setLang('TR')} className={`lang-pill ${lang==='TR' ? 'active' : ''}`}>TR</div>
          <div onClick={()=>setLang('EN')} className={`lang-pill ${lang==='EN' ? 'active' : ''}`}>EN</div>
          <div onClick={()=>setLang('RU')} className={`lang-pill ${lang==='RU' ? 'active' : ''}`}>RU</div>
        </div>
        
        {loggedInShop ? (
             <div className="flex gap-2 items-center">
                 <button onClick={handleLogout} className="btn-outline">{t[lang].nav.logout}</button>
                 <button onClick={() => router.push('/dashboard')} className="btn-primary"><User size={14}/> <span>{t[lang].nav.dashboard}</span></button>
             </div>
        ) : (
            <>
                <button onClick={() => setShowRegister(true)} className="btn-outline">{t[lang].nav.addShop}</button>
                <button onClick={() => setShowLogin(true)} className="btn-primary">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="white" strokeWidth="1.5"/><path d="M7 4v3l2 1.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span>{t[lang].nav.login}</span>
                </button>
            </>
        )}
      </div>
    </nav>

    {/* İŞLETME KAYIT MODALI */}
    {showRegister && (
        <div className="fixed inset-0 w-screen h-screen bg-[#2D1B4E]/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4 overflow-y-auto pt-20">
          <div className="bg-white border border-slate-200 w-full max-w-[800px] rounded-[32px] p-8 md:p-10 relative shadow-2xl my-auto animate-in zoom-in-95 duration-300">
            <button onClick={() => {setShowRegister(false); setRegisterSuccess(false);}} className="absolute top-6 right-6 md:right-8 text-slate-400 hover:text-[#2D1B4E] p-2 font-bold bg-transparent border-none cursor-pointer"><X size={24}/></button>
            {registerSuccess ? (
                <div className="text-center py-20">
                    <CheckCircle2 size={64} className="mx-auto text-[#00c48c] mb-6" />
                    <h2 className="text-2xl md:text-3xl font-black text-[#E8622A] uppercase italic mb-4">{t[lang].reg.success}</h2>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 inline-block text-left mt-4 text-slate-700">
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Banka Bilgileri / Bank Details:</p>
                        <p className="font-bold text-sm">Banka: <span className="font-normal">İş Bankası</span></p>
                        <p className="font-bold text-sm">Alıcı: <span className="font-normal">BOOKCY LTD.</span></p>
                        <p className="font-bold text-sm">IBAN: <span className="text-[#E8622A]">TR99 0006 4000 0012 3456 7890 12</span></p>
                        <p className="font-bold text-sm mt-4 text-[#00c48c]">Lütfen Dekontu WhatsApp'tan İletin.</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex flex-col mb-8 text-center">
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic text-[#2D1B4E]">{t[lang].reg.title}</h2>
                        <p className="text-[10px] text-[#E8622A] font-bold uppercase tracking-[0.2em] mt-2 flex items-center justify-center gap-2"><Lock size={12}/> {t[lang].reg.subtitle}</p>
                    </div>
                    <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input required placeholder={t[lang].reg.shopName} className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E]" onChange={e => setNewShop({...newShop, name: e.target.value})} />
                            <select className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold text-[#2D1B4E] outline-none focus:border-[#E8622A] cursor-pointer" onChange={e => setNewShop({...newShop, category: e.target.value})}>
                                {categories.map(c => <option key={c.dbName} value={c.dbName}>{t[lang].cats[c.key]}</option>)}
                            </select>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select required className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold text-[#2D1B4E] outline-none focus:border-[#E8622A] cursor-pointer uppercase" onChange={e => setNewShop({...newShop, location: e.target.value})}>
                                {cyprusRegions.map(region => <option key={region} value={region}>{region}</option>)}
                            </select>
                            <input required placeholder={t[lang].reg.address} className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none uppercase text-[#2D1B4E]" onChange={e => setNewShop({...newShop, address: e.target.value})} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-5">
                            <input required placeholder={t[lang].reg.contactPhone} className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E]" onChange={e => setNewShop({...newShop, contactPhone: e.target.value})} />
                            <input placeholder={t[lang].reg.contactInsta} className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E]" onChange={e => setNewShop({...newShop, contactInsta: e.target.value})} />
                            <input type="email" placeholder={t[lang].reg.contactEmail} className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E]" onChange={e => setNewShop({...newShop, contactEmail: e.target.value})} />
                        </div>
                        <div className="border-t border-slate-100 pt-5">
                            <input required type="email" placeholder={t[lang].reg.email} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E]" onChange={e => setNewShop({...newShop, email: e.target.value})} />
                        </div>
                        <textarea placeholder={t[lang].reg.desc} rows="2" className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none resize-none text-[#2D1B4E]" onChange={e => setNewShop({...newShop, description: e.target.value})}></textarea>
                        <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-4 relative group hover:border-[#E8622A] transition-all">
                            {newShop.logoFile ? (
                                <span className="text-[10px] font-bold text-[#00c48c] flex items-center justify-center gap-2"><CheckCircle2 size={16}/> {newShop.logoFile.name}</span>
                            ) : (
                                <div className="flex flex-col items-center justify-center text-center cursor-pointer">
                                    <Upload size={20} className="text-slate-400 mb-2 group-hover:text-[#E8622A]" />
                                    <span className="text-[10px] font-bold text-slate-500 uppercase">{t[lang].reg.upload}</span>
                                </div>
                            )}
                            <input type="file" accept=".png, .jpg, .jpeg" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setNewShop({...newShop, logoFile: e.target.files[0]})} />
                        </div>
                        <div className="border-t border-slate-100 pt-4">
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-3">{t[lang].reg.pack}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {packages.map(p => (
                                    <div key={p.name} onClick={() => setNewShop({...newShop, package: p.name})} className={`cursor-pointer p-5 rounded-2xl border transition-all ${newShop.package === p.name ? 'bg-[#E8622A]/10 border-[#E8622A]' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                        <div className="flex justify-between items-center mb-2"><h4 className={`text-sm font-black uppercase ${newShop.package === p.name ? 'text-[#E8622A]' : 'text-[#2D1B4E]'}`}>{p.name}</h4>{newShop.package === p.name && <CheckCircle2 size={16} className="text-[#E8622A]"/>}</div>
                                        <p className="text-xs font-bold text-slate-500">{p.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mt-2 border-t border-slate-100 pt-4">
                            <input required placeholder={t[lang].reg.user} className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E]" onChange={e => setNewShop({...newShop, username: e.target.value})} />
                            <input required placeholder={t[lang].reg.pass} className="bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 text-xs font-bold focus:border-[#E8622A] outline-none text-[#2D1B4E]" onChange={e => setNewShop({...newShop, password: e.target.value})} />
                        </div>
                        <button type="submit" disabled={isUploading} className="w-full btn-primary justify-center py-5 rounded-2xl mt-2 uppercase text-xs tracking-[0.2em] shadow-lg border-none">
                        {isUploading ? t[lang].reg.uploading : t[lang].reg.submit}
                        </button>
                    </form>
                </>
            )}
          </div>
        </div>
      )}

      {/* GİRİŞ MODALI */}
      {showLogin && (
        <div className="fixed inset-0 w-screen h-screen bg-[#2D1B4E]/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-[400px] rounded-[32px] p-12 relative flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowLogin(false)} className="absolute top-6 right-6 text-slate-400 hover:text-[#2D1B4E] p-2 font-bold bg-transparent border-none cursor-pointer"><X size={24}/></button>
            <Lock className="mx-auto text-[#E8622A] mb-6" size={48} />
            <h2 className="text-2xl font-black uppercase text-center tracking-tight mb-2 italic text-[#2D1B4E]">{t[lang].admin.loginTitle}</h2>
            <form onSubmit={handleLogin} className="flex flex-col w-full gap-4 mt-6">
              <input required placeholder={t[lang].admin.user} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 outline-none focus:border-[#E8622A] font-bold text-sm text-[#2D1B4E]" onChange={e => setLoginForm({...loginForm, user: e.target.value})} />
              <input required type="password" placeholder={t[lang].admin.pass} className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-6 outline-none focus:border-[#E8622A] font-bold text-sm text-[#2D1B4E]" onChange={e => setLoginForm({...loginForm, pass: e.target.value})} />
              <button type="submit" className="w-full btn-primary justify-center py-4 rounded-2xl mt-4 uppercase text-xs tracking-[0.2em] shadow-lg italic border-none">{t[lang].admin.loginBtn}</button>
            </form>
          </div>
        </div>
      )}

      <main style={{flex: 1, position: 'relative', zIndex: 10}}>
        
        {/* === ANA SAYFA (YENİ TASARIM) === */}
        {step === 'services' && (
            <>
                <section className="hero">
                  <div className="orb orb-1"></div>
                  <div className="orb orb-2"></div>
                  <div className="orb orb-3"></div>

                  <div className="hero-content">
                    <div className="hero-eyebrow">
                      <div className="hero-eyebrow-dot"></div>
                      {t[lang].home.eyebrow}
                    </div>

                    <h1 className="hero-title">
                      {t[lang].home.title1}<br/>
                      <span className="accent">{t[lang].home.title2}</span><br/>
                      <span className="accent-2">{t[lang].home.title3}</span> {t[lang].home.title4}
                    </h1>

                    <p className="hero-sub">
                      {t[lang].home.subtitle}
                    </p>

                    <form className="search-wrap" onSubmit={handleHeroSearch}>
                      <div className="search-field">
                        <span className="search-icon">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="8" cy="8" r="6" stroke="#8B7FA0" strokeWidth="1.8"/><path d="M13 13l3 3" stroke="#8B7FA0" strokeWidth="1.8" strokeLinecap="round"/></svg>
                        </span>
                        <input type="text" placeholder={t[lang].home.searchPlace} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
                      </div>
                      <div className="search-divider"></div>
                      <div className="search-location">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5C5.51 1.5 3.5 3.51 3.5 6c0 3.75 4.5 8.5 4.5 8.5s4.5-4.75 4.5-8.5c0-2.49-2.01-4.5-4.5-4.5z" stroke="#8B7FA0" strokeWidth="1.5" fill="none"/><circle cx="8" cy="6" r="1.5" stroke="#8B7FA0" strokeWidth="1.5"/></svg>
                        <select value={filterRegion} onChange={(e) => setFilterRegion(e.target.value)}>
                            <option value="All">{t[lang].home.searchLoc}</option>
                            {cyprusRegions.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                      </div>
                      <button type="submit" className="search-btn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="white" strokeWidth="1.8"/><path d="M11 11l3 3" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
                        {t[lang].home.searchBtn}
                      </button>
                    </form>

                    <div className="hero-popular">
                      <span>{t[lang].home.popTitle}</span>
                      <div className="pop-tag" onClick={()=>{setFilterService('Berber'); setStep('all_shops');}}>💈 {t[lang].cats.barber}</div>
                      <div className="pop-tag" onClick={()=>{setFilterService('Tırnak & Güzellik'); setStep('all_shops');}}>💅 {t[lang].cats.nail}</div>
                      <div className="pop-tag" onClick={()=>{setFilterService('Spa & Masaj'); setStep('all_shops');}}>💆 {t[lang].cats.spa}</div>
                      <div className="pop-tag" onClick={()=>{setFilterService('Dövme'); setStep('all_shops');}}>🖋️ {t[lang].cats.tattoo}</div>
                    </div>
                  </div>

                  <div className="hero-stats">
                    <div className="stat"><div className="stat-num">2.5K<span>+</span></div><div className="stat-label">{t[lang].home.stats.s1}</div></div>
                    <div className="stat"><div className="stat-num">48K<span>+</span></div><div className="stat-label">{t[lang].home.stats.s2}</div></div>
                    <div className="stat"><div className="stat-num">120K<span>+</span></div><div className="stat-label">{t[lang].home.stats.s3}</div></div>
                    <div className="stat"><div className="stat-num">4.9<span>★</span></div><div className="stat-label">{t[lang].home.stats.s4}</div></div>
                  </div>

                  <svg className="wave" viewBox="0 0 1440 80" preserveAspectRatio="none" fill="var(--sand)">
                    <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"/>
                  </svg>
                </section>

                <section className="section-categories">
                  <div className="section-header reveal">
                    <div>
                      <div className="section-label-sm">{t[lang].cats.catTitle}</div>
                      <div className="section-title">{t[lang].cats.catSub}</div>
                    </div>
                    <button className="see-all" onClick={()=>{setFilterService('All'); setStep('all_shops'); window.scrollTo(0,0);}}>{t[lang].cats.seeAll}</button>
                  </div>

                  <div className="categories-grid">
                    {categories.map((c, i) => (
                        <div key={c.key} onClick={() => { setFilterService(c.dbName); setStep('all_shops'); window.scrollTo(0,0); }} className={`cat-card reveal reveal-delay-${(i%4)+1}`}>
                          <div className="cat-img-wrap">
                            <div className="cat-emoji-bg" style={{background: c.bg}}>{c.emoji}</div>
                          </div>
                          <div className="cat-name">{t[lang].cats[c.key]}</div>
                        </div>
                    ))}
                  </div>
                </section>

                {recommendedShops.length > 0 && (
                    <section className="section-featured">
                      <div className="section-header reveal">
                        <div>
                          <div className="section-label-sm">{t[lang].homeInfo.recLabel}</div>
                          <div className="section-title">{t[lang].homeInfo.recTitle}</div>
                        </div>
                        <button className="see-all" onClick={()=>{setFilterSort('High'); setStep('all_shops'); window.scrollTo(0,0);}}>{t[lang].cats.seeAll}</button>
                      </div>

                      <div className="featured-grid">
                        {recommendedShops.slice(0,4).map((shop, idx) => (
                            <div key={shop.id} onClick={() => { setSelectedShop(shop); setStep('shop_profile'); setProfileTab('services'); setBookingPhase(1); window.scrollTo(0,0); }} className={`venue-card reveal reveal-delay-${idx+1} ${idx === 0 ? 'featured' : ''}`}>
                              <div className="venue-img" style={{background: 'var(--light)'}}>
                                {shop.cover_url || shop.logo_url ? <img src={shop.cover_url || shop.logo_url} /> : categories.find(c=>c.dbName===shop.category)?.emoji}
                                {idx === 0 && <div className="venue-badge hot">🔥 Çok Popüler</div>}
                                {idx === 1 && <div className="venue-badge new">✨ Yeni</div>}
                                <div className="venue-fav">🤍</div>
                              </div>
                              <div className="venue-info">
                                <div className="venue-cat">{t[lang].cats[categories.find(c => c.dbName === shop.category)?.key || 'barber']}</div>
                                <div className="venue-name">{shop.name}</div>
                                <div className="venue-meta">
                                  <div className="venue-rating"><span className="star">★</span> {getAverageRatingNum(shop.id)} <span style={{opacity:0.5}}>({reviews.filter(r=>r.shop_id===shop.id).length} yorum)</span></div>
                                  <span>📍 {shop.location}</span>
                                </div>
                                <button className="venue-book-btn">{t[lang].book.btnBook}</button>
                              </div>
                            </div>
                        ))}
                      </div>
                    </section>
                )}

                <section className="section-how">
                  <div className="how-inner">
                    <div className="how-header reveal">
                      <div className="section-label-sm">{t[lang].homeInfo.howLabel}</div>
                      <div className="section-title" style={{color:'white'}}>{t[lang].homeInfo.howTitle}</div>
                    </div>

                    <div className="steps-grid">
                      <div className="step">
                        <div className="step-icon" style={{background:'rgba(255,255,255,0.05)'}}>🔍<div className="step-num">1</div></div>
                        <div className="step-title">{t[lang].homeInfo.how1Title}</div>
                        <div className="step-desc">{t[lang].homeInfo.how1Desc}</div>
                      </div>
                      <div className="step">
                        <div className="step-icon" style={{background:'rgba(255,255,255,0.05)'}}>📅<div className="step-num">2</div></div>
                        <div className="step-title">{t[lang].homeInfo.how2Title}</div>
                        <div className="step-desc">{t[lang].homeInfo.how2Desc}</div>
                      </div>
                      <div className="step">
                        <div className="step-icon" style={{background:'rgba(255,255,255,0.05)'}}>✅<div className="step-num">3</div></div>
                        <div className="step-title">{t[lang].homeInfo.how3Title}</div>
                        <div className="step-desc">{t[lang].homeInfo.how3Desc}</div>
                      </div>
                      <div className="step">
                        <div className="step-icon" style={{background:'rgba(255,255,255,0.05)'}}>✨<div className="step-num">4</div></div>
                        <div className="step-title">{t[lang].homeInfo.how4Title}</div>
                        <div className="step-desc">{t[lang].homeInfo.how4Desc}</div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="section-cta">
                  <div className="cta-inner reveal">
                    <div className="cta-text">
                      <div className="section-label-sm">{t[lang].homeInfo.ctaLabel}</div>
                      <div className="cta-title">{t[lang].homeInfo.ctaTitle1}<br/><span>{t[lang].homeInfo.ctaTitle2}</span></div>
                      <div className="cta-sub">{t[lang].homeInfo.ctaSub}</div>
                    </div>
                    <div className="cta-actions">
                      <button className="app-badge" onClick={()=>{setShowRegister(true); window.scrollTo(0,0);}}>
                        <div className="app-badge-icon">💼</div>
                        <div className="app-badge-text">
                          <div className="small">Hemen Katıl</div>
                          <div className="big">İşletme Ekle</div>
                        </div>
                      </button>
                      <button className="app-badge" onClick={()=>{setStep('about'); window.scrollTo(0,0);}}>
                        <div className="app-badge-icon">🚀</div>
                        <div className="app-badge-text">
                          <div className="small">İncele</div>
                          <div className="big">Özellikler & Paketler</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </section>
            </>
        )}

        {/* === TÜM MEKANLAR / FİLTRELEME (SIDEBAR + GRID) === */}
        {step === 'all_shops' && (
            <div className="w-full max-w-[1400px] mx-auto pt-24 px-4 md:px-8 animate-in fade-in duration-500 pb-20">
                <button onClick={() => {setStep('services'); window.scrollTo(0,0);}} className="flex items-center text-slate-400 hover:text-[#E8622A] mb-8 text-[10px] font-black uppercase tracking-[0.2em] transition-colors bg-transparent border-none outline-none cursor-pointer"><ChevronLeft size={16} className="mr-2"/> {t[lang].shops.back}</button>
                <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
                    <h2 className="text-3xl md:text-4xl font-black uppercase text-[#2D1B4E]">{t[lang].filters.title}</h2>
                    <span className="text-sm font-bold text-slate-500">{sortedShops.length} {t[lang].filters.count}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* SOL TARAF: FİLTRELEME KENAR ÇUBUĞU (SIDEBAR) */}
                    <aside className="w-full lg:w-[320px] bg-white border border-slate-200 rounded-[24px] p-6 lg:sticky top-28 shrink-0 shadow-sm flex flex-col gap-8">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                            <h3 className="font-black text-[#2D1B4E] uppercase tracking-widest text-xs flex items-center gap-2"><FilterX size={16}/> Filtreler</h3>
                            <button onClick={() => {setFilterRegion('All'); setFilterService('All'); setSearchQuery(''); setFilterSort('High');}} className="text-[10px] font-bold text-slate-400 hover:text-[#E8622A] transition-colors uppercase bg-transparent border-none outline-none cursor-pointer">{t[lang].filters.clear}</button>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-3">{t[lang].filters.search}</p>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input type="text" placeholder={t[lang].filters.search} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 pl-10 pr-4 font-bold text-xs text-[#2D1B4E] outline-none focus:border-[#E8622A] transition-colors" />
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-3">{t[lang].filters.region}</p>
                            <div className="flex flex-col gap-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${filterRegion === 'All' ? 'bg-[#E8622A] border-[#E8622A]' : 'bg-white border-slate-200 group-hover:border-[#E8622A]'}`}>
                                        {filterRegion === 'All' && <Check size={14} className="text-white"/>}
                                    </div>
                                    <span className={`text-sm font-bold transition-colors ${filterRegion === 'All' ? 'text-[#2D1B4E]' : 'text-slate-600 group-hover:text-[#E8622A]'}`}>Tüm Bölgeler</span>
                                    <input type="radio" className="hidden" checked={filterRegion === 'All'} onChange={() => setFilterRegion('All')} />
                                </label>
                                {cyprusRegions.map(r => (
                                    <label key={r} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${filterRegion === r ? 'bg-[#E8622A] border-[#E8622A]' : 'bg-white border-slate-200 group-hover:border-[#E8622A]'}`}>
                                            {filterRegion === r && <Check size={14} className="text-white"/>}
                                        </div>
                                        <span className={`text-sm font-bold transition-colors ${filterRegion === r ? 'text-[#2D1B4E]' : 'text-slate-600 group-hover:text-[#E8622A]'}`}>{r}</span>
                                        <input type="radio" className="hidden" checked={filterRegion === r} onChange={() => setFilterRegion(r)} />
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-3">{t[lang].filters.service}</p>
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => setFilterService('All')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border outline-none cursor-pointer ${filterService === 'All' ? 'bg-[#2D1B4E] text-white border-[#2D1B4E]' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#E8622A] hover:text-[#E8622A]'}`}>Tümü</button>
                                {categories.map(c => (
                                    <button key={c.dbName} onClick={() => setFilterService(c.dbName)} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all border outline-none cursor-pointer ${filterService === c.dbName ? 'bg-[#2D1B4E] text-white border-[#2D1B4E]' : 'bg-slate-50 text-slate-500 border-slate-200 hover:border-[#E8622A] hover:text-[#E8622A]'}`}>
                                        {t[lang].cats[c.key]}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-3">Sıralama</p>
                            <div className="relative bg-slate-50 rounded-xl border border-slate-100">
                                <select value={filterSort} onChange={(e) => setFilterSort(e.target.value)} className="w-full bg-transparent border-none py-3 pl-4 pr-10 font-bold text-xs text-[#2D1B4E] outline-none appearance-none cursor-pointer">
                                    <option value="High">{t[lang].filters.sortHigh}</option>
                                    <option value="Low">{t[lang].filters.sortLow}</option>
                                </select>
                                <SlidersHorizontal size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"/>
                            </div>
                        </div>
                    </aside>

                    {/* SAĞ TARAF: SONUÇLAR LİSTESİ */}
                    <div className="flex-1 w-full flex flex-col gap-5">
                        {sortedShops.map((shop) => (
                            <div key={shop.id} onClick={() => { setSelectedShop(shop); setStep('shop_profile'); setProfileTab('services'); setBookingData({date:'', time:'', selectedShopService: null, selectedStaff: null}); window.scrollTo(0,0); }} className="venue-card flex flex-col md:flex-row items-center justify-between p-5 md:p-6" style={{background:'white', border:'1px solid #e2e8f0'}}>
                                <div className="flex items-center gap-6 w-full">
                                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-slate-50 flex items-center justify-center font-black text-[#E8622A] text-xs shadow-inner overflow-hidden border border-slate-100 shrink-0 relative">
                                        {shop.package === 'Premium' && (
                                            <div className="absolute inset-0 border-4 border-yellow-400 rounded-full"></div>
                                        )}
                                        {shop.logo_url ? <img src={shop.logo_url} alt={shop.name} className="w-full h-full object-cover" /> : "LOGO"}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl md:text-2xl font-black uppercase text-[#2D1B4E] transition-colors">{shop.name}</h3>
                                            {shop.package === 'Premium' && <Gem size={16} className="text-yellow-500 fill-yellow-500"/>}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-3 mt-2 text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                                            <span className="flex items-center text-[#2D1B4E] bg-slate-100 px-2 py-1 rounded-md"><Briefcase size={12} className="mr-1"/> {t[lang].cats[categories.find(c => c.dbName === shop.category)?.key || 'barber']}</span>
                                            <span className="flex items-center"><MapPin size={12} className="mr-1"/> {shop.address || shop.location}</span>
                                            <span className="flex items-center text-yellow-600 bg-yellow-50 px-2 py-1 rounded-md border border-yellow-100"><Star size={12} fill="currentColor" className="mr-1"/> {getAverageRatingNum(shop.id)}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="hidden md:flex btn-primary mt-4 md:mt-0 shrink-0 border-none outline-none">
                                    Randevu Al
                                </button>
                            </div>
                        ))}
                        {sortedShops.length === 0 && (
                            <div className="text-center py-32 bg-white rounded-[32px] border border-slate-200">
                                <Search size={48} className="mx-auto text-slate-300 mb-4"/>
                                <p className="text-slate-500 font-bold uppercase tracking-widest">{t[lang].shops.empty}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )}

        {/* İŞLETME PROFİL SAYFASI VE DİKEY SİHİRBAZ */}
        {step === 'shop_profile' && selectedShop && (
            <div className="w-full max-w-6xl mx-auto pt-24 px-4 animate-in fade-in duration-500">
                <button onClick={() => {setStep('all_shops'); window.scrollTo(0,0);}} className="flex items-center text-slate-400 hover:text-[#E8622A] mb-6 text-[10px] font-black uppercase tracking-[0.2em] transition-colors bg-transparent border-none outline-none cursor-pointer"><ChevronLeft size={16} className="mr-2"/> {t[lang].shops.back}</button>
                
                <div className="w-full h-[250px] md:h-[350px] rounded-[32px] overflow-hidden relative mb-16 border border-slate-200 bg-slate-100 shadow-sm">
                    {selectedShop.cover_url ? <img src={selectedShop.cover_url} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gradient-to-r from-slate-200 to-slate-100"></div>}
                    <div className="absolute -bottom-10 left-8 flex items-end gap-6">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white border-4 border-white flex items-center justify-center shadow-lg overflow-hidden shrink-0 relative">
                            {selectedShop.package === 'Premium' && <div className="absolute inset-0 border-4 border-yellow-400 rounded-full z-10 pointer-events-none"></div>}
                            {selectedShop.logo_url ? <img src={selectedShop.logo_url} className="w-full h-full object-cover" /> : <span className="text-[#E8622A] font-black">LOGO</span>}
                        </div>
                    </div>
                </div>

                <div className="px-2 md:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 border-b border-slate-200 pb-8 gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl md:text-5xl font-black uppercase text-[#2D1B4E] tracking-tight">{selectedShop.name}</h1>
                                {selectedShop.package === 'Premium' && <Gem size={24} className="text-yellow-500 fill-yellow-500"/>}
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-widest">
                                <span className="flex items-center text-[#E8622A]"><Briefcase size={14} className="mr-1"/> {t[lang].cats[categories.find(c => c.dbName === selectedShop.category)?.key || 'barber']}</span>
                                <span className="flex items-center"><MapPin size={14} className="mr-1"/> {selectedShop.address || selectedShop.location}</span>
                            </div>
                        </div>
                        <div className="flex items-center bg-yellow-50 text-yellow-600 px-4 py-2 rounded-xl border border-yellow-200 shadow-sm">
                            <Star size={16} fill="currentColor" className="mr-2"/> 
                            <span className="font-black text-lg">{getAverageRating(selectedShop.id)}</span>
                        </div>
                    </div>

                    <div className="flex gap-8 border-b border-slate-200 mb-8 overflow-x-auto custom-scrollbar">
                        <button onClick={() => setProfileTab('services')} className={`pb-4 text-sm font-black uppercase tracking-widest whitespace-nowrap transition-colors border-b-4 bg-transparent outline-none cursor-pointer ${profileTab === 'services' ? 'border-[#E8622A] text-[#E8622A]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>{t[lang].profile.tabServices}</button>
                        <button onClick={() => setProfileTab('gallery')} className={`pb-4 text-sm font-black uppercase tracking-widest whitespace-nowrap transition-colors border-b-4 bg-transparent outline-none cursor-pointer ${profileTab === 'gallery' ? 'border-[#E8622A] text-[#E8622A]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>{t[lang].profile.tabGallery}</button>
                        <button onClick={() => setProfileTab('about')} className={`pb-4 text-sm font-black uppercase tracking-widest whitespace-nowrap transition-colors border-b-4 bg-transparent outline-none cursor-pointer ${profileTab === 'about' ? 'border-[#E8622A] text-[#E8622A]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>{t[lang].profile.about}</button>
                        <button onClick={() => setProfileTab('reviews')} className={`pb-4 text-sm font-black uppercase tracking-widest whitespace-nowrap transition-colors border-b-4 bg-transparent outline-none cursor-pointer ${profileTab === 'reviews' ? 'border-[#E8622A] text-[#E8622A]' : 'border-transparent text-slate-400 hover:text-slate-700'}`}>{t[lang].profile.reviewBtn}</button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        <div className="lg:col-span-7">
                            {profileTab === 'services' && (
                                <div className="animate-in fade-in flex flex-col gap-4">
                                    {selectedShop.services && selectedShop.services.length > 0 ? (
                                        selectedShop.services.map(srv => (
                                            <div key={srv.id} onClick={() => { setBookingData({...bookingData, selectedShopService: srv, selectedStaff: null, time: ''}); setBookingPhase(2); }} 
                                                 className={`p-6 bg-white rounded-[24px] border-2 flex justify-between items-center cursor-pointer transition-all ${bookingData.selectedShopService?.id === srv.id ? 'border-[#E8622A] shadow-md scale-[1.02]' : 'border-slate-100 hover:border-slate-200'}`}>
                                                <div>
                                                    <h4 className="font-black text-lg text-[#2D1B4E] mb-1">{srv.name}</h4>
                                                    <div className="flex items-center gap-1 text-slate-400">
                                                        <Clock size={12}/>
                                                        <span className="text-[10px] font-bold uppercase tracking-widest">{srv.duration}</span>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-6">
                                                    <span className="font-black text-xl text-[#2D1B4E]">{srv.price}</span>
                                                    <button className={`px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-widest transition-all border-none outline-none cursor-pointer ${bookingData.selectedShopService?.id === srv.id ? 'bg-[#E8622A] text-white' : 'bg-slate-100 text-slate-400 hover:bg-slate-200'}`}>
                                                        {t[lang].profile.bookBtn}
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="bg-slate-50 border border-slate-200 p-10 rounded-[24px] text-center">
                                            <Scissors size={40} className="mx-auto text-slate-300 mb-4"/>
                                            <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">{t[lang].profile.noServices}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {profileTab === 'gallery' && (
                                <div className="animate-in fade-in">
                                    {selectedShop.gallery && selectedShop.gallery.length > 0 ? (
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {selectedShop.gallery.map((imgUrl, idx) => (
                                                <div key={idx} onClick={() => setLightboxImg(imgUrl)} className="w-full h-40 md:h-48 rounded-2xl overflow-hidden cursor-pointer group relative border border-slate-200">
                                                    <img src={imgUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-[#2D1B4E]/0 group-hover:bg-[#2D1B4E]/20 transition-colors flex items-center justify-center">
                                                        <Search className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={24}/>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="bg-slate-50 border border-slate-200 p-10 rounded-[24px] text-center">
                                            <Grid size={40} className="mx-auto text-slate-300 mb-4"/>
                                            <p className="text-slate-500 font-bold tracking-widest uppercase text-xs">{t[lang].profile.noGallery}</p>
                                        </div>
                                    )}
                                </div>
                            )}

                            {profileTab === 'about' && (
                                <div className="animate-in fade-in">
                                    {(selectedShop.contact_phone || selectedShop.contact_insta || selectedShop.contact_email) && (
                                        <div className="mb-10 bg-slate-50 border border-slate-200 p-6 rounded-[24px]">
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{t[lang].profile.contactTitle}</h3>
                                            <div className="flex flex-col gap-3">
                                                {selectedShop.contact_phone && (<a href={`tel:${selectedShop.contact_phone}`} className="flex items-center gap-3 text-slate-700 font-bold hover:text-[#E8622A]"><Phone size={16} className="text-[#E8622A]"/> {selectedShop.contact_phone}</a>)}
                                                {selectedShop.contact_insta && (<a href={`https://instagram.com/${selectedShop.contact_insta.replace('@', '')}`} target="_blank" className="flex items-center gap-3 text-slate-700 font-bold hover:text-pink-500"><Instagram size={16} className="text-pink-500"/> {selectedShop.contact_insta}</a>)}
                                                {selectedShop.contact_email && (<a href={`mailto:${selectedShop.contact_email}`} className="flex items-center gap-3 text-slate-700 font-bold hover:text-[#E8622A]"><Mail size={16} className="text-[#E8622A]"/> {selectedShop.contact_email}</a>)}
                                            </div>
                                        </div>
                                    )}
                                    <div className="bg-white border border-slate-200 p-8 rounded-[24px] shadow-sm">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{t[lang].profile.about}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed font-medium whitespace-pre-wrap">{selectedShop.description || <span className="italic opacity-50">{t[lang].profile.noDesc}</span>}</p>
                                    </div>
                                </div>
                            )}
                            
                            {profileTab === 'reviews' && (
                                 <div className="animate-in fade-in">
                                 <form onSubmit={submitReview} className="bg-white border border-slate-200 p-6 rounded-[24px] shadow-sm mb-8">
                                     <h3 className="text-sm font-black uppercase text-[#2D1B4E] mb-4">{t[lang].review.title}</h3>
                                     <div className="flex gap-4 mb-4">
                                         <input placeholder={t[lang].review.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#E8622A] font-bold text-xs text-slate-700" value={reviewForm.name} onChange={e => setReviewForm({...reviewForm, name: e.target.value})} />
                                         <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 flex items-center gap-1">
                                             {[1,2,3,4,5].map(star => <Star key={star} size={16} className={`cursor-pointer ${reviewForm.rating >= star ? 'text-[#E8622A]' : 'text-slate-300'}`} fill={reviewForm.rating >= star ? '#E8622A' : 'transparent'} onClick={() => setReviewForm({...reviewForm, rating: star})} />)}
                                         </div>
                                     </div>
                                     <textarea required placeholder={t[lang].review.comment} rows="2" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 outline-none focus:border-[#E8622A] font-bold text-xs resize-none mb-4 text-slate-700" value={reviewForm.comment} onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}></textarea>
                                     <button type="submit" className="w-full btn-primary justify-center py-4 rounded-xl text-xs tracking-widest shadow-md border-none cursor-pointer">{t[lang].review.submit}</button>
                                 </form>
                                 <div className="flex flex-col gap-4">
                                     {reviews.filter(r => r.shop_id == selectedShop.id).length > 0 ? reviews.filter(r => r.shop_id == selectedShop.id).map(review => (
                                         <div key={review.id} className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm">
                                             <div className="flex justify-between items-center mb-3">
                                                 <span className="text-sm font-black uppercase text-[#2D1B4E]">{review.customer_name}</span>
                                                 <div className="flex">{[...Array(review.rating)].map((_, i) => <Star key={i} size={12} fill="#E8622A" className="text-[#E8622A]"/>)}</div>
                                             </div>
                                             <p className="text-slate-600 text-sm font-medium leading-relaxed">"{review.comment}"</p>
                                         </div>
                                     )) : (
                                        <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 py-10 text-center">{t[lang].review.empty}</p>
                                     )}
                                 </div>
                             </div>
                            )}
                        </div>

                        <div className="lg:col-span-5 relative">
                            <div className="sticky top-28 bg-white border-2 border-slate-100 rounded-[32px] p-6 md:p-8 shadow-[0_20px_40px_rgba(0,0,0,0.06)] flex flex-col min-h-[450px]">
                                
                                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                                    <h3 className="text-xl font-black uppercase tracking-tight text-slate-900">{t[lang].book.details}</h3>
                                    {bookingPhase > 1 && (
                                        <button onClick={() => setBookingPhase(bookingPhase - 1)} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#E8622A] bg-slate-50 px-3 py-1.5 rounded-lg flex items-center transition-colors border-none outline-none cursor-pointer">
                                            <ChevronLeft size={14} className="mr-1"/> {t[lang].book.change}
                                        </button>
                                    )}
                                </div>

                                {bookingPhase === 1 && (
                                    <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-300">
                                        <Scissors size={40} className="text-slate-200 mb-4" />
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-relaxed max-w-[200px]">{t[lang].book.selectService}</p>
                                    </div>
                                )}

                                {bookingPhase > 1 && (
                                    <div className="mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col gap-2 animate-in fade-in">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t[lang].book.service}</span>
                                            <span className="font-black text-slate-900 text-sm">{bookingData.selectedShopService?.name}</span>
                                        </div>
                                        {bookingPhase > 2 && bookingData.selectedStaff && (
                                            <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t[lang].book.staff}</span>
                                                <span className="font-bold text-slate-800 text-xs uppercase">{bookingData.selectedStaff.name}</span>
                                            </div>
                                        )}
                                        {bookingPhase > 3 && bookingData.time && (
                                            <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{t[lang].book.dateTime}</span>
                                                <span className="font-bold text-[#E8622A] text-xs">{bookingData.date} | {bookingData.time}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between items-center border-t border-slate-200 pt-2 mt-1">
                                            <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{t[lang].book.total}</span>
                                            <span className="font-black text-[#E8622A] text-lg">{bookingData.selectedShopService?.price}</span>
                                        </div>
                                    </div>
                                )}

                                {bookingPhase === 2 && (
                                    <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex-1">
                                        <p className="text-[11px] font-black uppercase tracking-widest text-slate-900 mb-4 flex items-center gap-2"><Users size={14} className="text-[#E8622A]"/> {t[lang].book.selectStaff}</p>
                                        <div className="grid grid-cols-3 gap-3">
                                            <div onClick={() => { setBookingData({...bookingData, selectedStaff: { name: t[lang].book.anyStaff }}); setBookingPhase(3); }} 
                                                 className="flex flex-col items-center gap-2 cursor-pointer p-3 rounded-2xl border-2 border-transparent hover:border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
                                                <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 text-slate-400"><Users size={20}/></div>
                                                <span className="text-[9px] font-black text-center text-slate-500 uppercase">{t[lang].book.anyStaff}</span>
                                            </div>
                                            {selectedShop.staff?.map(person => (
                                                <div key={person.id} onClick={() => { setBookingData({...bookingData, selectedStaff: person}); setBookingPhase(3); }} 
                                                     className="flex flex-col items-center gap-2 cursor-pointer p-3 rounded-2xl border-2 border-transparent hover:border-slate-200 bg-white shadow-sm hover:shadow-md transition-all">
                                                    <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-50 text-slate-400"><UserCircle size={24}/></div>
                                                    <span className="text-[9px] font-black text-center text-slate-600 uppercase truncate w-full px-1">{person.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {bookingPhase === 3 && (
                                    <div className="animate-in slide-in-from-right-4 fade-in duration-300 flex-1 flex flex-col gap-4">
                                        <div className="flex items-center gap-2 text-slate-900 font-black text-[11px] uppercase tracking-widest">
                                            <Calendar size={14} className="text-[#E8622A]"/> {t[lang].book.date} / {t[lang].book.time}
                                        </div>
                                        <input type="date" min={new Date().toISOString().split('T')[0]} value={bookingData.date} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 font-bold text-slate-700 outline-none focus:border-[#E8622A] text-sm cursor-pointer transition-colors shadow-inner" onChange={(e) => setBookingData({...bookingData, date: e.target.value, time: ''})} />
                                        
                                        {bookingData.date && (
                                            <div className="grid grid-cols-3 gap-2 max-h-[180px] overflow-y-auto pr-2 custom-scrollbar mt-2">
                                                {allTimeSlots.map((slot, idx) => {
                                                    const neededSlots = getRequiredSlots(bookingData.selectedShopService.duration);
                                                    const slotsToCheck = allTimeSlots.slice(idx, idx + neededSlots);
                                                    let isUnavailable = false;
                                                    
                                                    if (slotsToCheck.length < neededSlots) {
                                                        isUnavailable = true; 
                                                    } else {
                                                        if (bookingData.selectedStaff?.name === t[lang].book.anyStaff || bookingData.selectedStaff?.name === 'Fark Etmez') {
                                                            if (selectedShop.staff && selectedShop.staff.length > 0) {
                                                                const anyStaffFree = selectedShop.staff.some(staff => {
                                                                    return slotsToCheck.every(checkSlot => {
                                                                        if (closedSlots.includes(checkSlot)) return false;
                                                                        const isBooked = appointments.some(a => a.staff_name === staff.name && (a.occupied_slots ? a.occupied_slots.includes(checkSlot) : a.appointment_time === checkSlot));
                                                                        return !isBooked;
                                                                    });
                                                                });
                                                                isUnavailable = !anyStaffFree;
                                                            } else {
                                                                isUnavailable = slotsToCheck.some(checkSlot => closedSlots.includes(checkSlot) || appointments.some(a => a.occupied_slots ? a.occupied_slots.includes(checkSlot) : a.appointment_time === checkSlot));
                                                            }
                                                        } else {
                                                            isUnavailable = slotsToCheck.some(checkSlot => {
                                                                if (closedSlots.includes(checkSlot)) return true;
                                                                return appointments.some(a => a.staff_name === bookingData.selectedStaff.name && (a.occupied_slots ? a.occupied_slots.includes(checkSlot) : a.appointment_time === checkSlot));
                                                            });
                                                        }
                                                    }

                                                    return (
                                                        <button key={slot} disabled={isUnavailable} onClick={() => { setBookingData({...bookingData, time: slot}); setBookingPhase(4); }} 
                                                                className={`p-3 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer ${isUnavailable ? 'bg-slate-50 border-transparent text-slate-300 cursor-not-allowed' : bookingData.time === slot ? 'bg-[#E8622A] text-white border-[#E8622A] shadow-md' : 'bg-white border-slate-100 text-slate-600 hover:border-[#E8622A] hover:text-[#E8622A]'}`}>
                                                        {slot}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {bookingPhase === 4 && (
                                    <form onSubmit={handleBooking} className="animate-in slide-in-from-right-4 fade-in duration-300 flex flex-col gap-3 flex-1">
                                        <div className="flex items-center gap-2 text-slate-900 font-black text-[11px] uppercase tracking-widest mb-1">
                                            <User size={14} className="text-[#E8622A]"/> {t[lang].book.contactInfo}
                                        </div>
                                        <input required placeholder={t[lang].book.name} className="w-full bg-slate-50 border border-slate-200 rounded-[14px] py-4 px-4 outline-none focus:border-[#E8622A] font-bold text-xs text-slate-800 transition-colors" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                                        <input required placeholder={t[lang].book.surname} className="w-full bg-slate-50 border border-slate-200 rounded-[14px] py-4 px-4 outline-none focus:border-[#E8622A] font-bold text-xs text-slate-800 transition-colors" onChange={(e) => setFormData({...formData, surname: e.target.value})} />
                                        <input required placeholder={t[lang].book.phone} className="w-full bg-slate-50 border border-slate-200 rounded-[14px] py-4 px-4 outline-none focus:border-[#E8622A] font-bold text-xs text-slate-800 transition-colors" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                                        <input type="email" placeholder={t[lang].book.email} className="w-full bg-slate-50 border border-slate-200 rounded-[14px] py-4 px-4 outline-none focus:border-[#E8622A] font-bold text-xs text-slate-800 transition-colors" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                                        
                                        <button type="submit" className="w-full btn-primary justify-center py-4 rounded-[14px] mt-4 uppercase text-xs tracking-[0.2em] shadow-md border-none cursor-pointer">
                                            <CheckCircle2 size={16}/> {t[lang].book.submit}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )}

        {/* BAŞARILI RANDEVU EKRANI */}
        {step === 'success' && (
          <div className="text-center py-32 px-4 animate-in zoom-in-95 min-h-[60vh] flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-[#00c48c] text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl"><CheckCircle2 size={48} /></div>
            <h2 className="text-4xl md:text-5xl font-black text-[#2D1B4E] uppercase mb-4 tracking-tight">{t[lang].book.success}</h2>
            <p className="text-slate-500 uppercase text-xs font-bold tracking-[0.2em] mb-10">{t[lang].book.successSub}</p>
            <button onClick={() => {setStep('services'); setBookingData({date:'', time:'', selectedShopService: null, selectedStaff: null}); setBookingPhase(1); window.scrollTo(0,0);}} className="btn-primary mx-auto px-10 py-4 text-xs tracking-widest shadow-xl border-none cursor-pointer">{t[lang].book.backHome}</button>
          </div>
        )}

        {/* DİNAMİK ÖZELLİK DETAY SAYFASI */}
        {step === 'feature_detail' && activeFeature && (
            <div className="w-full bg-white animate-in fade-in">
                
                <div className="bg-[#2D1B4E] pt-32 pb-40 px-8 text-center relative overflow-hidden border-b border-slate-800">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#E8622A]/20 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F5C5A3]/20 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <div className="flex justify-center mb-8 relative z-10">{featureIcons[activeFeature]}</div>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 relative z-10">{t[lang].featNames[activeFeature]}</h1>
                </div>

                <div className="max-w-[1200px] mx-auto px-8 py-24 -mt-20 relative z-20">
                    <div className="bg-white p-10 md:p-16 rounded-[40px] shadow-2xl border border-slate-100">
                        <div className="text-center max-w-3xl mx-auto mb-16 border-b border-slate-100 pb-12">
                            <h2 className="text-xl font-black text-[#E8622A] uppercase tracking-widest mb-4">{t[lang].featUI.purposeTitle}</h2>
                            <p className="text-xl md:text-2xl text-slate-700 font-medium leading-relaxed">{t[lang].featDetails[activeFeature].purpose}</p>
                        </div>
                        
                        <h2 className="text-2xl md:text-3xl font-black text-[#2D1B4E] mb-12 text-center">{t[lang].featUI.benefitsTitle}</h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-slate-50 p-8 rounded-[24px] border border-slate-100 hover:border-[#E8622A] transition-colors group">
                                <div className="w-12 h-12 bg-white text-[#E8622A] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#E8622A] group-hover:text-white transition-colors"><ShieldCheck size={20}/></div>
                                <h3 className="font-black text-lg text-[#2D1B4E] mb-3 leading-tight">{t[lang].featDetails[activeFeature].adv1.title}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{t[lang].featDetails[activeFeature].adv1.desc}</p>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-[24px] border border-slate-100 hover:border-[#E8622A] transition-colors group">
                                <div className="w-12 h-12 bg-white text-[#E8622A] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#E8622A] group-hover:text-white transition-colors"><Target size={20}/></div>
                                <h3 className="font-black text-lg text-[#2D1B4E] mb-3 leading-tight">{t[lang].featDetails[activeFeature].adv2.title}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{t[lang].featDetails[activeFeature].adv2.desc}</p>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-[24px] border border-slate-100 hover:border-[#E8622A] transition-colors group">
                                <div className="w-12 h-12 bg-white text-[#E8622A] rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-[#E8622A] group-hover:text-white transition-colors"><TrendingUp size={20}/></div>
                                <h3 className="font-black text-lg text-[#2D1B4E] mb-3 leading-tight">{t[lang].featDetails[activeFeature].adv3.title}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{t[lang].featDetails[activeFeature].adv3.desc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 py-24 text-center border-t border-slate-200">
                    <h2 className="text-3xl md:text-5xl font-black uppercase text-[#2D1B4E] mb-8 tracking-tight">{t[lang].about.ctaTitle}</h2>
                    <button onClick={() => {setShowRegister(true); window.scrollTo(0,0);}} className="btn-primary mx-auto px-12 py-5 uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(232,98,42,0.5)] border-none cursor-pointer">
                        {t[lang].about.ctaBtn}
                    </button>
                </div>
            </div>
        )}

        {/* TÜM ÖZELLİKLER LİSTESİ */}
        {step === 'all_features' && (
            <div className="w-full bg-white animate-in fade-in">
                <div className="bg-[#2D1B4E] pt-32 pb-24 px-8 text-center relative overflow-hidden border-b border-slate-800">
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 relative z-10">{t[lang].featUI.allFeaturesTitle}</h1>
                    <p className="text-lg md:text-xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed relative z-10">{t[lang].featUI.allFeaturesSub}</p>
                </div>

                <div className="max-w-[1400px] mx-auto px-8 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Object.keys(t[lang].featNames).map((key) => (
                            <div key={key} onClick={() => goToFeature(key)} className="bg-slate-50 p-8 rounded-[32px] border border-slate-200 hover:border-[#E8622A] hover:shadow-xl transition-all cursor-pointer group flex flex-col items-start">
                                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                                    {featureIconsSmall[key]}
                                </div>
                                <h3 className="text-2xl font-black text-[#2D1B4E] mb-3 group-hover:text-[#E8622A] transition-colors">{t[lang].featNames[key]}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{t[lang].featDesc[key]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* KURUMSAL HAKKIMIZDA & PAKETLER SAYFASI */}
        {step === 'about' && (
            <div className="w-full bg-white animate-in fade-in">
                <div className="bg-[#2D1B4E] pt-24 pb-32 px-8 text-center relative overflow-hidden border-b border-slate-800">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8622A]/20 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5C5A3]/20 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <span className="bg-[#E8622A]/10 text-[#E8622A] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block border border-[#E8622A]/20">Kıbrıs'ın Lider Pazaryeri</span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 relative z-10 leading-tight">{t[lang].about.title}</h1>
                    <p className="text-xl md:text-2xl font-bold text-[#E8622A] mb-8 relative z-10">{t[lang].about.subtitle}</p>
                    <p className="text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed text-lg relative z-10">{t[lang].about.missionDesc}</p>
                    
                    <div className="mt-12 flex flex-wrap justify-center gap-8 relative z-10">
                        <div className="flex items-center gap-2 text-white font-bold"><CheckCircle2 className="text-[#00c48c]" size={20}/> 7/24 Kesintisiz</div>
                        <div className="flex items-center gap-2 text-white font-bold"><CheckCircle2 className="text-[#00c48c]" size={20}/> Sıfır Komisyon</div>
                        <div className="flex items-center gap-2 text-white font-bold"><CheckCircle2 className="text-[#00c48c]" size={20}/> Müşteri Garantisi</div>
                    </div>
                </div>

                <div className="max-w-[1400px] mx-auto px-8 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <div className="bg-slate-50 border border-slate-200 rounded-[40px] p-10 md:p-12 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8622A]/10 rounded-bl-full"></div>
                            <h2 className="text-3xl font-black tracking-tight text-[#2D1B4E] mb-10 flex items-center gap-4"><Briefcase className="text-[#E8622A]" size={36}/> {t[lang].about.bizTitle}</h2>
                            <div className="space-y-8">
                                <div className="flex gap-5"><div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 shrink-0"><Zap className="text-[#E8622A]" size={20}/></div><div><h3 className="text-lg font-black text-[#2D1B4E] mb-1">{t[lang].about.biz1}</h3><p className="text-slate-500 font-medium text-sm leading-relaxed">{t[lang].about.biz1Desc}</p></div></div>
                                <div className="flex gap-5"><div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 shrink-0"><Users className="text-[#E8622A]" size={20}/></div><div><h3 className="text-lg font-black text-[#2D1B4E] mb-1">{t[lang].about.biz2}</h3><p className="text-slate-500 font-medium text-sm leading-relaxed">{t[lang].about.biz2Desc}</p></div></div>
                                <div className="flex gap-5"><div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 shrink-0"><Target className="text-[#E8622A]" size={20}/></div><div><h3 className="text-lg font-black text-[#2D1B4E] mb-1">{t[lang].about.biz3}</h3><p className="text-slate-500 font-medium text-sm leading-relaxed">{t[lang].about.biz3Desc}</p></div></div>
                                <div className="flex gap-5"><div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-200 shrink-0"><Crown className="text-[#E8622A]" size={20}/></div><div><h3 className="text-lg font-black text-[#2D1B4E] mb-1">{t[lang].about.biz4}</h3><p className="text-slate-500 font-medium text-sm leading-relaxed">{t[lang].about.biz4Desc}</p></div></div>
                            </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-[40px] p-10 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D1B4E]/10 rounded-bl-full"></div>
                            <h2 className="text-3xl font-black tracking-tight text-[#2D1B4E] mb-10 flex items-center gap-4"><User className="text-[#2D1B4E]" size={36}/> {t[lang].about.usrTitle}</h2>
                            <div className="space-y-8">
                                <div className="flex gap-5"><div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100 shrink-0"><Search className="text-[#2D1B4E]" size={20}/></div><div><h3 className="text-lg font-black text-[#2D1B4E] mb-1">{t[lang].about.usr1}</h3><p className="text-slate-500 font-medium text-sm leading-relaxed">{t[lang].about.usr1Desc}</p></div></div>
                                <div className="flex gap-5"><div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100 shrink-0"><Clock className="text-[#2D1B4E]" size={20}/></div><div><h3 className="text-lg font-black text-[#2D1B4E] mb-1">{t[lang].about.usr2}</h3><p className="text-slate-500 font-medium text-sm leading-relaxed">{t[lang].about.usr2Desc}</p></div></div>
                                <div className="flex gap-5"><div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center shadow-sm border border-slate-100 shrink-0"><MessageCircle className="text-[#2D1B4E]" size={20}/></div><div><h3 className="text-lg font-black text-[#2D1B4E] mb-1">{t[lang].about.usr3}</h3><p className="text-slate-500 font-medium text-sm leading-relaxed">{t[lang].about.usr3Desc}</p></div></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-50 border-y border-slate-200 py-24">
                    <div className="max-w-[1200px] mx-auto px-8 text-center">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-[#2D1B4E] mb-4">{t[lang].about.packTitle}</h2>
                        <p className="text-slate-500 font-medium mb-16 max-w-2xl mx-auto text-lg">{t[lang].about.packSub}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto text-left">
                            <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-sm hover:shadow-xl transition-shadow flex flex-col relative overflow-hidden group">
                                <div className="w-16 h-16 bg-slate-100 text-slate-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Briefcase size={32}/></div>
                                <h3 className="text-2xl font-black text-[#2D1B4E] mb-2 uppercase">{t[lang].about.pkg1Name}</h3>
                                <div className="flex items-end gap-2 mb-8 border-b border-slate-100 pb-8"><span className="text-5xl font-black text-[#2D1B4E] tracking-tighter">{t[lang].about.pkg1Price}</span><span className="text-slate-400 font-bold mb-1">{t[lang].about.pkg1Period}</span></div>
                                <ul className="space-y-4 mb-10 flex-1">
                                    <li className="flex items-center gap-3 text-slate-700 font-medium"><Check size={18} className="text-[#00c48c] shrink-0"/> {t[lang].about.pkg1Feat1}</li>
                                    <li className="flex items-center gap-3 text-slate-700 font-medium"><Check size={18} className="text-[#00c48c] shrink-0"/> {t[lang].about.pkg1Feat2}</li>
                                    <li className="flex items-center gap-3 text-slate-700 font-medium"><Check size={18} className="text-[#00c48c] shrink-0"/> {t[lang].about.pkg1Feat3}</li>
                                    <li className="flex items-center gap-3 text-slate-700 font-medium"><Check size={18} className="text-[#00c48c] shrink-0"/> {t[lang].about.pkg1Feat4}</li>
                                    <li className="flex items-center gap-3 text-slate-700 font-medium"><Check size={18} className="text-[#00c48c] shrink-0"/> {t[lang].about.pkg1Feat5}</li>
                                </ul>
                                <button onClick={() => {setShowRegister(true); window.scrollTo(0,0);}} className="w-full bg-slate-100 text-slate-700 font-black py-4 rounded-xl uppercase tracking-widest hover:bg-slate-200 transition-colors border-none cursor-pointer">Seç</button>
                            </div>

                            <div className="bg-[#2D1B4E] border-2 border-[#E8622A] rounded-[40px] p-10 shadow-2xl relative flex flex-col transform md:-translate-y-4 group">
                                <div className="absolute top-0 inset-x-0 bg-[#E8622A] text-white text-center py-2 font-black text-[10px] uppercase tracking-[0.3em]">Bölge Liderleri İçin Önerilir</div>
                                <div className="w-16 h-16 bg-[#E8622A] text-white rounded-2xl flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#E8622A]/30"><Award size={32}/></div>
                                <h3 className="text-2xl font-black text-[#E8622A] mb-2 uppercase flex items-center gap-2">{t[lang].about.pkg2Name}</h3>
                                <div className="flex items-end gap-2 mb-8 border-b border-white/10 pb-8"><span className="text-5xl font-black text-white tracking-tighter">{t[lang].about.pkg2Price}</span><span className="text-slate-400 font-bold mb-1">{t[lang].about.pkg2Period}</span></div>
                                <ul className="space-y-4 mb-10 flex-1">
                                    <li className="flex items-center gap-3 text-slate-300 font-medium"><Check size={18} className="text-[#E8622A] shrink-0"/> {t[lang].about.pkg2Feat1}</li>
                                    <li className="flex items-center gap-3 text-white font-bold"><Check size={18} className="text-[#E8622A] shrink-0"/> {t[lang].about.pkg2Feat2}</li>
                                    <li className="flex items-center gap-3 text-white font-bold"><Check size={18} className="text-[#E8622A] shrink-0"/> {t[lang].about.pkg2Feat3}</li>
                                    <li className="flex items-center gap-3 text-white font-bold"><Check size={18} className="text-[#E8622A] shrink-0"/> {t[lang].about.pkg2Feat4}</li>
                                    <li className="flex items-center gap-3 text-white font-bold"><Check size={18} className="text-[#E8622A] shrink-0"/> {t[lang].about.pkg2Feat5}</li>
                                </ul>
                                <button onClick={() => {setShowRegister(true); window.scrollTo(0,0);}} className="w-full btn-primary justify-center py-4 rounded-xl uppercase tracking-widest shadow-[0_0_20px_rgba(232,98,42,0.4)] border-none cursor-pointer">Seç</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#2D1B4E] py-24 text-center border-t border-slate-800">
                    <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-8 tracking-tight">{t[lang].about.ctaTitle}</h2>
                    <button onClick={() => {setShowRegister(true); window.scrollTo(0,0);}} className="btn-primary mx-auto px-12 py-5 uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(232,98,42,0.5)] border-none cursor-pointer">
                        {t[lang].about.ctaBtn} <ArrowRightCircle size={20}/>
                    </button>
                </div>
            </div>
        )}

        {/* İLETİŞİM SAYFASI */}
        {step === 'contact' && (
            <div className="w-full bg-white animate-in fade-in">
                <div className="bg-[#2D1B4E] pt-24 pb-32 px-8 text-center relative overflow-hidden border-b border-slate-800">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-[#E8622A]/20 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#00c48c]/20 rounded-full blur-[100px] pointer-events-none"></div>
                    
                    <span className="bg-[#E8622A]/10 text-[#E8622A] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block border border-[#E8622A]/20">7/24 Destek</span>
                    <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 relative z-10">{t[lang].contact.title}</h1>
                    <p className="text-xl md:text-2xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed relative z-10">{t[lang].contact.sub}</p>
                </div>

                <div className="max-w-[1200px] mx-auto px-8 py-24 -mt-20 relative z-20">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
                            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><MessageCircle size={40}/></div>
                            <h3 className="text-2xl font-black text-[#2D1B4E] mb-3">{t[lang].contact.whatsapp}</h3>
                            <p className="text-slate-500 font-medium mb-8 leading-relaxed flex-1">{t[lang].contact.wpDesc}</p>
                            <a href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white font-black py-4 rounded-xl uppercase tracking-widest hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 flex justify-center items-center gap-2 text-decoration-none"><MessageCircle size={18}/> {t[lang].contact.btnWp}</a>
                        </div>
                        <div className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
                            <div className="w-20 h-20 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Instagram size={40}/></div>
                            <h3 className="text-2xl font-black text-[#2D1B4E] mb-3">{t[lang].contact.insta}</h3>
                            <p className="text-slate-500 font-medium mb-8 leading-relaxed flex-1">{t[lang].contact.instaDesc}</p>
                            <a href="https://instagram.com/bookcy" target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-[#E8622A] text-white font-black py-4 rounded-xl uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/30 flex justify-center items-center gap-2 text-decoration-none"><Instagram size={18}/> {t[lang].contact.btnInsta}</a>
                        </div>
                        <div className="bg-white p-10 rounded-[32px] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
                            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Mail size={40}/></div>
                            <h3 className="text-2xl font-black text-[#2D1B4E] mb-3">{t[lang].contact.email}</h3>
                            <p className="text-slate-500 font-medium mb-8 leading-relaxed flex-1">{t[lang].contact.emailDesc}</p>
                            <a href="mailto:noreplybookcy@gmail.com" className="w-full bg-[#2D1B4E] text-white font-black py-4 rounded-xl uppercase tracking-widest hover:bg-[#1a0f2e] transition-colors shadow-lg shadow-[#2D1B4E]/30 flex justify-center items-center gap-2 text-decoration-none"><Mail size={18}/> {t[lang].contact.btnEmail}</a>
                        </div>
                    </div>
                </div>
                
                <div className="bg-slate-50 py-24 border-y border-slate-200">
                    <div className="max-w-[800px] mx-auto px-8 text-center">
                        <h2 className="text-3xl font-black uppercase text-[#2D1B4E] mb-6">{t[lang].contact.ofis}</h2>
                        <div className="flex items-center justify-center gap-2 text-[#E8622A] font-bold text-lg mb-8">
                            <MapPin size={24} /> Girne, Kuzey Kıbrıs Türk Cumhuriyeti
                        </div>
                        <div className="w-full h-80 bg-slate-200 rounded-[40px] overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border border-slate-300 shadow-inner pointer-events-none">
                            <iframe src="http://googleusercontent.com/maps.google.com/8" width="100%" height="100%" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        )}

      </main>

      {/* DEV KURUMSAL FOOTER */}
      <footer style={{background:'var(--fig)', padding:'60px 48px 32px', color:'rgba(255,255,255,0.5)', zIndex:10, position:'relative'}}>
        <div className="footer-top" style={{display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'48px', maxWidth:'1200px', margin:'0 auto 48px'}}>
          <div className="footer-brand">
            <div className="footer-brand-name" style={{fontFamily:"'Syne',sans-serif", fontSize:'24px', fontWeight:'800', color:'white', letterSpacing:'-1px', marginBottom:'12px', display:'flex', alignItems:'baseline'}}>
                bookcy<span style={{color:'var(--terra)'}}>.</span>
            </div>
            <p className="footer-desc" style={{fontSize:'13px', lineHeight:'1.7', maxWidth:'260px'}}>{t[lang].footer.desc}</p>
            <div className="footer-socials" style={{marginTop:'24px', display:'flex', gap:'12px'}}>
              <a href="https://instagram.com/bookcy" target="_blank" rel="noopener noreferrer" className="social-btn" style={{width:'36px', height:'36px', borderRadius:'10px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', textDecoration:'none', color:'white'}}><Instagram size={18}/></a>
              <a href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer" className="social-btn" style={{width:'36px', height:'36px', borderRadius:'10px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', textDecoration:'none', color:'white'}}><MessageCircle size={18}/></a>
              <a href="mailto:noreplybookcy@gmail.com" className="social-btn" style={{width:'36px', height:'36px', borderRadius:'10px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent:'center', transition:'all 0.2s', textDecoration:'none', color:'white'}}><Mail size={18}/></a>
            </div>
          </div>
          <div>
            <div className="footer-col-title" style={{fontSize:'11px', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', color:'white', marginBottom:'20px'}}>{t[lang].footer.links}</div>
            <ul className="footer-links" style={{listStyle:'none', display:'flex', flexDirection:'column', gap:'10px', padding:0, margin:0}}>
              <li><button onClick={() => {setStep('services'); window.scrollTo(0,0);}} style={{fontSize:'13px', color:'rgba(255,255,255,0.45)', background:'none', border:'none', textAlign:'left', padding:0, cursor:'pointer'}}>{t[lang].nav.places}</button></li>
              <li><button onClick={() => {setShowRegister(true); window.scrollTo(0,0);}} style={{fontSize:'13px', color:'white', fontWeight:'700', background:'none', border:'none', textAlign:'left', padding:0, cursor:'pointer'}}>{t[lang].nav.addShop}</button></li>
              <li><button onClick={() => {setShowLogin(true); window.scrollTo(0,0);}} style={{fontSize:'13px', color:'rgba(255,255,255,0.45)', background:'none', border:'none', textAlign:'left', padding:0, cursor:'pointer'}}>{t[lang].nav.login}</button></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title" style={{fontSize:'11px', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', color:'white', marginBottom:'20px'}}>{t[lang].footer.cities}</div>
            <ul className="footer-links" style={{listStyle:'none', display:'flex', flexDirection:'column', gap:'10px', padding:0, margin:0}}>
              {cyprusRegions.map(region => (
                  <li key={region}><button onClick={() => {setFilterRegion(region); setStep('all_shops'); window.scrollTo(0,0);}} style={{fontSize:'13px', color:'rgba(255,255,255,0.45)', background:'none', border:'none', textAlign:'left', padding:0, cursor:'pointer'}}>{region}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title" style={{fontSize:'11px', fontWeight:'700', letterSpacing:'2px', textTransform:'uppercase', color:'white', marginBottom:'20px'}}>{t[lang].footer.legal}</div>
            <ul className="footer-links" style={{listStyle:'none', display:'flex', flexDirection:'column', gap:'10px', padding:0, margin:0}}>
              <li><button style={{fontSize:'13px', color:'rgba(255,255,255,0.45)', background:'none', border:'none', textAlign:'left', padding:0, cursor:'pointer'}}>{t[lang].footer.terms}</button></li>
              <li><button style={{fontSize:'13px', color:'rgba(255,255,255,0.45)', background:'none', border:'none', textAlign:'left', padding:0, cursor:'pointer'}}>{t[lang].footer.privacy}</button></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom" style={{maxWidth:'1200px', margin:'0 auto', borderTop:'1px solid rgba(255,255,255,0.07)', paddingTop:'24px', display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'12px'}}>
          <div>© {new Date().getFullYear()} BOOKCY KIBRIS. {t[lang].footer.copy}</div>
          <div>One Click Booking™</div>
        </div>
      </footer>

    </>
  );
}