import './globals.css';

export const metadata = {
  metadataBase: new URL('https://www.bookcy.co'),
  title: 'Bookcy | Kıbrıs Online Güzellik ve Randevu Platformu',
  description: 'Kuzey Kıbrıs\'ın en iyi kuaför, berber, spa ve güzellik merkezlerini keşfedin. Sıra beklemeden, komisyonsuz ve 7/24 kesintisiz online randevu alın.',
  keywords: 'kıbrıs kuaför, girne berber, lefkoşa güzellik merkezi, kıbrıs randevu, spa, bookcy, kktc randevu',
  
  // Favicon ve İkon Ayarları
  icons: {
    icon: [
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },

  // Sosyal Medya Paylaşım (Open Graph)
  openGraph: {
    title: 'Bookcy | Kıbrıs Online Güzellik ve Randevu Platformu',
    description: 'En iyi uzmanları keşfedin, 7/24 online randevunuzu saniyeler içinde oluşturun.',
    url: 'https://www.bookcy.co',
    siteName: 'Bookcy',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Bookcy Kıbrıs Güzellik Platformu',
      }
    ],
    locale: 'tr_TR',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        {/* Apple cihazlarda logonun fontunun bozulmaması için zorlayıcı stil */}
        <style dangerouslySetInnerHTML={{ __html: `
          .nav-logo-text { font-family: 'Plus Jakarta Sans', sans-serif !important; }
        `}} />
      </head>
      <body>
        {children}
        
      </body>
    </html>
  );
}