// Dosya Yolu: app/sitemap.js

export default function sitemap() {
  const baseUrl = 'https://www.bookcy.co'; // Canlı domain adresimiz

  return [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily', // Google'a "Sitemiz her gün güncelleniyor, sık sık gel" diyoruz
      priority: 1.0, // En yüksek öncelik
    }
  ];
}