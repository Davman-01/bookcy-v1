import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] p-8 md:p-24 font-sans text-[#2D1B4E]">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[32px] shadow-xl border border-slate-100">
        <Link href="/" className="text-[#E8622A] font-bold text-sm mb-8 block">&larr; Geri Dön</Link>
        <h1 className="text-3xl font-black mb-6 uppercase">Kullanım Şartları</h1>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>Bookcy platformuna hoş geldiniz. Bu siteyi kullanarak aşağıdaki şartları kabul etmiş sayılırsınız...</p>
          <h2 className="text-xl font-bold text-[#2D1B4E] mt-8">1. Hizmet Kapsamı</h2>
          <p>Bookcy, işletmeler ve müşteriler arasında randevu köprüsü kuran bir teknoloji platformudur.</p>
          {/* Burayı ileride detaylandırabilirsin */}
        </div>
      </div>
    </div>
  );
}