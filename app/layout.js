import { DM_Sans, Plus_Jakarta_Sans } from 'next/font/google';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css"; 

// Fontları Google'dan beklemek yerine sistemin içine gömüyoruz (Sıfır gecikme!)
const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['500', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

// DEVASA SEO VE SOSYAL MEDYA ZIRHI
export const metadata = {
  metadataBase: new URL("https://www.bookcy.co"),
  title: "Bookcy | Kuzey Kıbrıs'ta Randevu ve Güzellik Rezervasyon Platformu",
  description: "Kuzey Kıbrıs'ın #1 rezervasyon platformu. Girne, Lefkoşa, Mağusa ve tüm KKTC'de berber, kuaför, spa ve güzellik uzmanlarını bul. Tek tıkla randevu al.",
  keywords: ["Kıbrıs randevu", "KKTC berber", "Girne kuaför", "Kuzey Kıbrıs spa", "online rezervasyon Kıbrıs"],
  
  // WhatsApp, Facebook, Instagram'da link paylaşınca çıkacak olan şık kart tasarımı
  openGraph: {
    title: "Bookcy | Kuzey Kıbrıs Rezervasyon Platformu",
    description: "Berber, kuaför, spa ve daha fazlası. Kuzey Kıbrıs'ta tek tıkla randevu al.",
    url: "https://www.bookcy.co",
    siteName: "Bookcy",
    images: [
      {
        url: "https://www.bookcy.co/og-image.jpg", // public klasörüne bu isimde bir resim eklemeyi unutma
        width: 1200,
        height: 630,
        alt: "Bookcy - Kuzey Kıbrıs Rezervasyon Platformu",
      },
    ],
    locale: "tr_TR",
    alternateLocale: ["en_GB", "ru_RU"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookcy | Kuzey Kıbrıs Rezervasyon Platformu",
    description: "Berber, kuaför, spa ve daha fazlası. Tek tıkla randevu al.",
    images: ["https://www.bookcy.co/og-image.jpg"],
  },
  
  // Dil ve kopya içerik cezalarını önleyen Canonical bağlantılar
  alternates: {
    canonical: "/",
    languages: {
      "tr": "/",
      "en": "/en",
      "ru": "/ru",
    },
  },
};

// GOOGLE ZENGİN ARAMA GÖRÜNÜMÜ (SCHEMA.ORG)
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": "Bookcy",
      "url": "https://www.bookcy.co/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://www.bookcy.co/ara?q={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "name": "Bookcy",
      "url": "https://www.bookcy.co/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.bookcy.co/logo.png"
      },
      "description": "Kuzey Kıbrıs'ın #1 güzellik ve bakım rezervasyon platformu.",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "availableLanguage": ["Turkish", "English", "Russian"]
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr" className={`${dmSans.variable} ${jakarta.variable}`}>
      <body className={dmSans.className} style={{ margin: 0, padding: 0 }}>
        {children}
        
        {/* Vercel Performans ve Ziyaretçi Radarımız */}
        <SpeedInsights />
        <Analytics />

        {/* Google Schema Script'i (Arama Motorunda Şık Görünüm İçin) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}