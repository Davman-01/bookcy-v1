import './globals.css';

export const metadata = {
  title: 'Bookcy | Kıbrıs Online Randevu',
  description: 'Güzellik ve bakım için tek tıkla randevu.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}