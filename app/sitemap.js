export default function sitemap() {
  const baseUrl = 'https://www.bookcy.co';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/ozellikler`, lastModified: new Date() },
    { url: `${baseUrl}/hakkimizda`, lastModified: new Date() },
    { url: `${baseUrl}/iletisim`, lastModified: new Date() },
    { url: `${baseUrl}/isletme-giris`, lastModified: new Date() },
  ];
}