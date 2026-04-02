import Link from 'next/link';
import { MessageCircle, Instagram, Mail } from 'lucide-react';

export const metadata = {
  title: 'İletişim | Bookcy',
  description: 'Bookcy 7/24 destek ve iletişim kanalları.',
};

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-[#FAF7F2] font-sans">
      <div className="bg-[#2D1B4E] pt-24 pb-32 px-4 md:px-8 text-center relative overflow-hidden border-b border-slate-800">
        
        {/* Üst Menüye Dönüş Butonu */}
        <div className="absolute top-6 left-6 z-20">
            <Link href="/" className="text-white/70 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors">
                &larr; Ana Sayfaya Dön
            </Link>
        </div>

        <div className="absolute top-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-[#E8622A]/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-[#00c48c]/20 rounded-full blur-[100px] pointer-events-none"></div>
        <span className="bg-[#E8622A]/10 text-[#E8622A] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block border border-[#E8622A]/20">7/24 Destek</span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6 relative z-10">BİZE ULAŞIN</h1>
        <p className="text-lg md:text-2xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed relative z-10">Platform hakkında sorularınız ve destek talepleriniz için bize 7/24 ulaşabilirsiniz.</p>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-24 -mt-10 md:-mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* WhatsApp */}
          <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><MessageCircle size={32}/></div>
            <h3 className="text-xl md:text-2xl font-black text-[#2D1B4E] mb-3">WhatsApp Destek</h3>
            <p className="text-sm md:text-base text-slate-500 font-medium mb-8 leading-relaxed flex-1">Anında yanıt almak için WhatsApp hattımızdan bize ulaşın.</p>
            <a href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] text-white font-black py-4 rounded-xl uppercase tracking-widest hover:bg-green-600 transition-colors shadow-lg shadow-green-500/30 flex justify-center items-center gap-2 text-decoration-none text-xs md:text-sm"><MessageCircle size={18}/> MESAJ AT</a>
          </div>
          
          {/* Instagram */}
          <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-pink-500/10 text-pink-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Instagram size={32}/></div>
            <h3 className="text-xl md:text-2xl font-black text-[#2D1B4E] mb-3">Instagram</h3>
            <p className="text-sm md:text-base text-slate-500 font-medium mb-8 leading-relaxed flex-1">En yeni mekanları keşfetmek için takip edin.</p>
            <a href="https://instagram.com/bookcy" target="_blank" rel="noopener noreferrer" className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-[#E8622A] text-white font-black py-4 rounded-xl uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg shadow-pink-500/30 flex justify-center items-center gap-2 text-decoration-none text-xs md:text-sm"><Instagram size={18}/> TAKİP ET</a>
          </div>
          
          {/* Email */}
          <div className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl border border-slate-100 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform"><Mail size={32}/></div>
            <h3 className="text-xl md:text-2xl font-black text-[#2D1B4E] mb-3">Kurumsal E-Posta</h3>
            <p className="text-sm md:text-base text-slate-500 font-medium mb-8 leading-relaxed flex-1">Sponsorluk ve kurumsal görüşmeler için e-posta gönderebilirsiniz.</p>
            <a href="mailto:noreplybookcy@gmail.com" className="w-full bg-[#2D1B4E] text-white font-black py-4 rounded-xl uppercase tracking-widest hover:bg-[#1a0f2e] transition-colors shadow-lg shadow-[#2D1B4E]/30 flex justify-center items-center gap-2 text-decoration-none text-xs md:text-sm"><Mail size={18}/> MAİL GÖNDER</a>
          </div>
        </div>
      </div>
    </div>
  );
}