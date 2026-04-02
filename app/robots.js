// Dosya Yolu: app/robots.js

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Google'ın görmemesi gereken gizli panelleri ve API yollarını engelliyoruz
      disallow: ['/admin', '/dashboard', '/api/'],
    },
    // Google'a sitemap adresimizi gösteriyoruz
    sitemap: 'https://www.bookcy.co/sitemap.xml',
  }
}