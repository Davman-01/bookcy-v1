import './globals.css';

export const metadata = {
  title: 'Bookcy | Kıbrıs Online Güzellik ve Randevu Platformu',
  description: 'Kuzey Kıbrıs\'ın en iyi kuaför, berber, spa ve güzellik merkezlerini keşfedin. Sıra beklemeden, komisyonsuz ve 7/24 kesintisiz online randevu alın.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        {/* Fontlar */}
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@800&display=swap" rel="stylesheet" />
        
        {/* PATRON, İŞTE SİTEYİ KURTARACAK SİHİRLİ KOD BURASI (Zorla Tasarım Yükleyici) */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        <style dangerouslySetInnerHTML={{ __html: `
          .nav-logo-text { font-family: 'Plus Jakarta Sans', sans-serif !important; }
        `}} />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}