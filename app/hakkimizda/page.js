import Link from 'next/link';
import { 
    CheckCircle2, Briefcase, Zap, Users, Target, Crown, 
    User, Search, Clock, MessageCircle, Check, Award, ArrowRightCircle 
} from 'lucide-react';

export const metadata = {
  title: 'Hakkımızda ve Paketler | Bookcy',
  description: "Kıbrıs'ın lider güzellik ve rezervasyon platformu Bookcy hakkında detaylı bilgi ve işletme paketleri.",
};

export default function AboutPage() {
  return (
    <div className="w-full theme-bg-main min-h-screen">
        <div className="bg-[#2D1B4E] pt-24 pb-32 px-8 text-center relative overflow-hidden border-b border-slate-800">
            {/* Üst Menüye Dönüş Butonu */}
            <div className="absolute top-6 left-6 z-20">
                <Link href="/" className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors">
                    &larr; Ana Sayfaya Dön
                </Link>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8622A]/20 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5C5A3]/20 rounded-full blur-[100px] pointer-events-none"></div>
            <span className="bg-[#E8622A]/10 text-[#E8622A] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block border border-[#E8622A]/20">Kıbrıs'ın Lider Pazaryeri</span>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 relative z-10 leading-tight">Biz Kimiz?</h1>
            <p className="text-xl md:text-2xl font-bold text-[#E8622A] mb-8 relative z-10">İşletmeni Dijitale Taşı</p>
            <p className="text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed text-lg relative z-10">
                Bookcy, Kıbrıs'taki en iyi güzellik ve bakım merkezlerini tek bir çatı altında toplayan, müşterilerle işletmeleri buluşturan yenilikçi bir rezervasyon platformudur.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-8 relative z-10">
                <div className="flex items-center gap-2 text-white font-bold"><CheckCircle2 className="text-[#00c48c]" size={20}/> 7/24 Kesintisiz</div>
                <div className="flex items-center gap-2 text-white font-bold"><CheckCircle2 className="text-[#00c48c]" size={20}/> Sıfır Komisyon</div>
                <div className="flex items-center gap-2 text-white font-bold"><CheckCircle2 className="text-[#00c48c]" size={20}/> Müşteri Garantisi</div>
            </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-8 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <div className="theme-bg-sub border theme-border-sub rounded-[40px] p-10 md:p-12 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E8622A]/10 rounded-bl-full"></div>
                    <h2 className="text-3xl font-black tracking-tight theme-text-main mb-10 flex items-center gap-4"><Briefcase className="text-[#E8622A]" size={36}/> İşletmeler İçin</h2>
                    <div className="space-y-8">
                        <div className="flex gap-5"><div className="w-12 h-12 rounded-full theme-bg-card flex items-center justify-center shadow-sm theme-border shrink-0"><Zap className="text-[#E8622A]" size={20}/></div><div><h3 className="text-lg font-black theme-text-main mb-1">Görünürlük Artışı</h3><p className="theme-text-muted font-medium text-sm leading-relaxed">Platformumuz sayesinde binlerce yeni müşteriye anında ulaşın.</p></div></div>
                        <div className="flex gap-5"><div className="w-12 h-12 rounded-full theme-bg-card flex items-center justify-center shadow-sm theme-border shrink-0"><Users className="text-[#E8622A]" size={20}/></div><div><h3 className="text-lg font-black theme-text-main mb-1">Kolay Yönetim</h3><p className="theme-text-muted font-medium text-sm leading-relaxed">Personel, hizmet ve randevularınızı tek ekrandan kontrol edin.</p></div></div>
                        <div className="flex gap-5"><div className="w-12 h-12 rounded-full theme-bg-card flex items-center justify-center shadow-sm theme-border shrink-0"><Target className="text-[#E8622A]" size={20}/></div><div><h3 className="text-lg font-black theme-text-main mb-1">Sıfır İptal Riski</h3><p className="theme-text-muted font-medium text-sm leading-relaxed">Otomatik SMS ve hatırlatmalar ile randevu kaçaklarını önleyin.</p></div></div>
                        <div className="flex gap-5"><div className="w-12 h-12 rounded-full theme-bg-card flex items-center justify-center shadow-sm theme-border shrink-0"><Crown className="text-[#E8622A]" size={20}/></div><div><h3 className="text-lg font-black theme-text-main mb-1">Marka Prestiji</h3><p className="theme-text-muted font-medium text-sm leading-relaxed">Dijital dünyada kurumsal ve güvenilir bir profil oluşturun.</p></div></div>
                    </div>
                </div>

                <div className="theme-bg-card border theme-border rounded-[40px] p-10 md:p-12 shadow-[0_20px_40px_rgba(0,0,0,0.04)] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#2D1B4E]/10 rounded-bl-full"></div>
                    <h2 className="text-3xl font-black tracking-tight theme-text-main mb-10 flex items-center gap-4"><User className="theme-text-main" size={36}/> Müşteriler İçin</h2>
                    <div className="space-y-8">
                        <div className="flex gap-5"><div className="w-12 h-12 rounded-full theme-bg-sub flex items-center justify-center shadow-sm border theme-border-sub shrink-0"><Search className="theme-text-main" size={20}/></div><div><h3 className="text-lg font-black theme-text-main mb-1">Hızlı Keşif</h3><p className="theme-text-muted font-medium text-sm leading-relaxed">Size en yakın ve en yüksek puanlı işletmeleri saniyeler içinde bulun.</p></div></div>
                        <div className="flex gap-5"><div className="w-12 h-12 rounded-full theme-bg-sub flex items-center justify-center shadow-sm border theme-border-sub shrink-0"><Clock className="theme-text-main" size={20}/></div><div><h3 className="text-lg font-black theme-text-main mb-1">7/24 Randevu</h3><p className="theme-text-muted font-medium text-sm leading-relaxed">Mesai saatlerine bağlı kalmadan dilediğiniz an randevunuzu oluşturun.</p></div></div>
                        <div className="flex gap-5"><div className="w-12 h-12 rounded-full theme-bg-sub flex items-center justify-center shadow-sm border theme-border-sub shrink-0"><MessageCircle className="theme-text-main" size={20}/></div><div><h3 className="text-lg font-black theme-text-main mb-1">Gerçek Yorumlar</h3><p className="theme-text-muted font-medium text-sm leading-relaxed">Sadece hizmet almış gerçek müşterilerin deneyimlerini okuyun.</p></div></div>
                    </div>
                </div>
            </div>
        </div>

        {/* PAKETLER KISMI */}
        <div className="theme-bg-sub py-24 text-center border-y theme-border-sub">
            <div className="max-w-[1200px] mx-auto px-8 text-center">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight theme-text-main mb-4">Abonelik Paketleri</h2>
                <p className="theme-text-muted font-medium mb-16 max-w-2xl mx-auto text-lg">İşletmenizin büyüklüğüne ve ihtiyaçlarına en uygun paketi seçin, hemen büyümeye başlayın.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto text-left">
                    {/* Standart Paket */}
                    <div className="theme-bg-card border theme-border rounded-[40px] p-10 shadow-sm hover:shadow-xl transition-shadow flex flex-col relative overflow-hidden group">
                        <div className="w-16 h-16 theme-bg-sub theme-text-muted rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Briefcase size={32}/></div>
                        <h3 className="text-2xl font-black theme-text-main mb-2 uppercase">Standart Paket</h3>
                        <div className="flex items-end gap-2 mb-8 border-b theme-border-sub pb-8"><span className="text-5xl font-black theme-text-main tracking-tighter">₺499</span><span className="theme-text-muted font-bold mb-1">/ay</span></div>
                        <ul className="space-y-4 mb-10 flex-1">
                            <li className="flex items-center gap-3 theme-text-main font-medium"><Check size={18} className="text-[#00c48c] shrink-0"/> Temel İşletme Profili</li>
                            <li className="flex items-center gap-3 theme-text-main font-medium"><Check size={18} className="text-[#00c48c] shrink-0"/> Sınırsız Randevu Alımı</li>
                            <li className="flex items-center gap-3 theme-text-main font-medium"><Check size={18} className="text-[#00c48c] shrink-0"/> 2 Personel Ekleme</li>
                            <li className="flex items-center gap-3 theme-text-main font-medium"><Check size={18} className="text-[#00c48c] shrink-0"/> SMS Hatırlatmaları</li>
                            <li className="flex items-center gap-3 theme-text-main font-medium"><Check size={18} className="text-[#00c48c] shrink-0"/> Standart Destek</li>
                        </ul>
                        <Link href="/isletme-giris" className="w-full theme-bg-sub theme-text-main font-black py-4 rounded-xl uppercase tracking-widest hover:border-[#E8622A] theme-border transition-colors text-center inline-block">Seç</Link>
                    </div>

                    {/* Pro Paket */}
                    <div className="bg-[#2D1B4E] border-2 border-[#E8622A] rounded-[40px] p-10 shadow-2xl relative flex flex-col transform md:-translate-y-4 group">
                        <div className="absolute top-0 inset-x-0 bg-[#E8622A] text-white text-center py-2 font-black text-[10px] uppercase tracking-[0.3em]">Bölge Liderleri İçin Önerilir</div>
                        <div className="w-16 h-16 bg-[#E8622A] text-white rounded-2xl flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform shadow-lg shadow-[#E8622A]/30"><Award size={32}/></div>
                        <h3 className="text-2xl font-black text-[#E8622A] mb-2 uppercase flex items-center gap-2">Premium Paket</h3>
                        <div className="flex items-end gap-2 mb-8 border-b border-white/10 pb-8"><span className="text-5xl font-black text-white tracking-tighter">₺899</span><span className="text-slate-400 font-bold mb-1">/ay</span></div>
                        <ul className="space-y-4 mb-10 flex-1">
                            <li className="flex items-center gap-3 text-slate-300 font-medium"><Check size={18} className="text-[#E8622A] shrink-0"/> Gelişmiş İşletme Profili</li>
                            <li className="flex items-center gap-3 text-white font-bold"><Check size={18} className="text-[#E8622A] shrink-0"/> Arama Sonuçlarında Üste Çıkma</li>
                            <li className="flex items-center gap-3 text-white font-bold"><Check size={18} className="text-[#E8622A] shrink-0"/> Sınırsız Personel</li>
                            <li className="flex items-center gap-3 text-white font-bold"><Check size={18} className="text-[#E8622A] shrink-0"/> Detaylı Finansal Raporlar</li>
                            <li className="flex items-center gap-3 text-white font-bold"><Check size={18} className="text-[#E8622A] shrink-0"/> 7/24 VIP Destek</li>
                        </ul>
                        <Link href="/isletme-giris" className="w-full btn-primary text-center py-4 rounded-xl uppercase tracking-widest shadow-[0_0_20px_rgba(232,98,42,0.4)] border-none inline-block">Seç</Link>
                    </div>
                </div>
            </div>
        </div>

        <div className="bg-[#2D1B4E] py-24 text-center border-t border-slate-800">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-8 tracking-tight">Hemen Aramıza Katıl</h2>
            <Link href="/isletme-giris" className="btn-primary inline-flex items-center gap-2 mx-auto px-12 py-5 uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(232,98,42,0.5)] border-none">
                İşletmeni Ekle <ArrowRightCircle size={20}/>
            </Link>
        </div>
    </div>
  );
}