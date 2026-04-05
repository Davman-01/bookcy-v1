import './globals.css';

export const metadata = {
  title: 'Bookcy | Kıbrıs Online Randevu',
  description: 'Güzellik ve bakım için tek tıkla randevu.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        {/* Senin tasarımın için DM Sans ve Plus Jakarta Sans fontları şart */}
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@800&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}