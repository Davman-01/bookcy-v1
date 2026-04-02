import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] p-8 md:p-24 font-sans text-[#2D1B4E]">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-[32px] shadow-xl border border-slate-100">
        <Link href="/" className="text-[#E8622A] font-bold text-sm mb-8 block">&larr; Geri Dön</Link>
        <h1 className="text-3xl font-black mb-6 uppercase">Gizlilik Politikası</h1>
        <div className="space-y-4 text-slate-600 leading-relaxed">
          <p>Verilerinizin güvenliği bizim için önceliklidir. Bookcy üzerinde paylaştığınız bilgiler...</p>
          <h2 className="text-xl font-bold text-[#2D1B4E] mt-8">2. Veri Kullanımı</h2>
          <p>Kişisel verileriniz sadece randevu süreçlerinin yönetilmesi ve onay bildirimleri için kullanılır.</p>
        </div>
      </div>
    </div>
  );
}