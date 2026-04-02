/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🛡️ 1. GÜVENLİK KALKANLARI (Security Headers)
  async headers() {
    return [
      {
        // Bu kurallar sitemizdeki tüm sayfalar (/(.*)) için geçerli olacak
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" }, // Sitemizi başka sitelerin içine gömmelerini engeller (Clickjacking koruması)
          { key: "X-Content-Type-Options", value: "nosniff" }, // Tarayıcının dosya türlerini tahmin etmesini engeller (Siber saldırı koruması)
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" }, // Nereden gelindiği bilgisini gizler
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" }, // Sitemiz üzerinden izinsiz kamera/mikrofon açılmasını engeller
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }, // Zorunlu HTTPS (Bağlantı şifreleme)
          { key: "X-DNS-Prefetch-Control", value: "on" }, // Sayfa yüklenme hızını artırır
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          {
            // İçerik Güvenlik Politikası (CSP) - Sitemize sadece bizim izin verdiğimiz yerlerden veri/kod gelebilir!
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://challenges.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "img-src 'self' data: https:",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://vitals.vercel-insights.com",
              "frame-src https://challenges.cloudflare.com",
            ].join("; "),
          },
        ],
      },
    ];
  },

  // 🚀 2. PERFORMANS VE İMAJ OPTİMİZASYONU
  compress: true, // Sunucu yanıtlarını sıkıştırır (Daha hızlı yükleme)
  poweredByHeader: false, // Hackerların sitemizin Next.js ile yapıldığını görmesini engeller (Sinsice gizleniriz)
  
  images: {
    formats: ["image/avif", "image/webp"], // Resimleri yeni nesil, en hafif formatlarda sunar
    deviceSizes: [640, 750, 828, 1080, 1200], // Telefon/Tablet/PC ekranlarına göre resmi otomatik boyutlandırır
    minimumCacheTTL: 2592000, // Resimleri 30 gün boyunca önbellekte tutar (Sunucu/Vercel masrafını sıfıra indirir)
  },
};

export default nextConfig;