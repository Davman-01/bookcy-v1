import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req) {
  const authHeader = req.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Vercel Ücretsiz paketinde günde 1 kez çalışma limiti olduğu için
  // Bugün olan tüm randevuları bulup sabah 09:00'da hatırlatma atıyoruz.
  const now = new Date();
  now.setHours(now.getHours() + 3); // Kıbrıs saatine göre ayar
  
  const todayStr = now.toISOString().split('T')[0];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bookcy.co';

  try {
    // ====================================================================
    // 1. MÜŞTERİLERE GÜNLÜK SABAH HATIRLATMASI (BUGÜNKÜ RANDEVULAR)
    // ====================================================================
    const { data: appointments } = await supabase
      .from('appointments')
      .select('*, shops(name, address, location)')
      .eq('appointment_date', todayStr)
      .eq('status', 'Bekliyor');

    if (appointments && appointments.length > 0) {
      for (const appt of appointments) {
        const customerReminderHtml = `
          <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF7F2; border-radius: 24px; overflow: hidden; border: 1px solid #E2E8F0;">
            <div style="background-color: #E8622A; padding: 40px 20px; text-align: center;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px;">BOOKCY<span style="color: #2D1B4E;">.</span></h1>
              <p style="color: #FFE4D6; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin-top: 10px; font-weight: 700;">Bugün Randevunuz Var ⏰</p>
            </div>
            <div style="padding: 40px 32px; background-color: #FFFFFF;">
              <h2 style="color: #2D1B4E; margin-top: 0; font-size: 24px; text-align: center;">Güzellik Saatiniz Geldi!</h2>
              <p style="color: #64748b; font-size: 15px; line-height: 1.6; text-align: center;">Merhaba <strong>${appt.customer_name}</strong>,</p>
              <p style="color: #64748b; font-size: 15px; line-height: 1.6; text-align: center;"><strong>${appt.shops.name}</strong> işletmesindeki randevunuz bugün gerçekleşecek. Her şeyin kusursuz ilerlemesi için randevu saatinden 5-10 dakika önce mekanda olmanızı rica ederiz.</p>
              
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 24px; margin: 30px 0; border-radius: 16px; text-align: center;">
                <p style="margin: 0 0 10px 0; color: #E8622A; font-size: 24px; font-weight: 900;">Bugün Saat: ${appt.appointment_time}</p>
                <p style="margin: 0; color: #64748b; font-size: 14px;">📍 ${appt.shops?.address || appt.shops?.location || 'Mekan Adresi'}</p>
              </div>
              
              <p style="color: #64748b; font-size: 13px; line-height: 1.6; text-align: center;">Gecikme durumunda işletmeyle doğrudan iletişime geçebilirsiniz. Harika bir deneyim dileriz!</p>
            </div>
          </div>
        `;

        await fetch(`${siteUrl}/api/email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: appt.customer_email,
            subject: 'BOOKCY - Bugün Randevunuz Var! ⏰',
            html: customerReminderHtml,
            text: `Hatırlatma: ${appt.shops?.name} randevunuz bugün saat ${appt.appointment_time}'da.`
          })
        });
      }
    }

    // ====================================================================
    // 2. İŞLETMELERE ABONELİK YENİLEME HATIRLATMASI (3 GÜN KALA)
    // ====================================================================
    const threeDaysLater = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
    const subDateStr = threeDaysLater.toISOString().split('T')[0];

    const { data: endingShops } = await supabase
      .from('shops')
      .select('*')
      .eq('subscription_end_date', subDateStr)
      .eq('status', 'approved');

    if (endingShops && endingShops.length > 0) {
      for (const shop of endingShops) {
        const renewalHtml = `
          <div style="font-family: 'DM Sans', Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FAF7F2; border-radius: 24px; overflow: hidden; border: 1px solid #E2E8F0;">
            <div style="background-color: #2D1B4E; padding: 40px 20px; text-align: center;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 32px; font-weight: 900; letter-spacing: -1px;">BOOKCY<span style="color: #E8622A;">.</span></h1>
              <p style="color: #F5C5A3; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; margin-top: 10px; font-weight: 700;">Abonelik Yenileme 📅</p>
            </div>
            <div style="padding: 40px 32px; background-color: #FFFFFF;">
              <h2 style="color: #2D1B4E; margin-top: 0; font-size: 22px; text-align: center;">Büyümeye Devam Edelim, ${shop.name}!</h2>
              <p style="color: #64748b; font-size: 15px; line-height: 1.6; text-align: center;">Bookcy ile işletmenize değer kattığınız bir dönemi daha geride bırakıyoruz. Profilinizin aktif kalmaya devam etmesi ve randevu alımının kesintiye uğramaması için abonelik sürenizin dolmasına <strong>3 gün</strong> kalmıştır.</p>
              
              <div style="background-color: #F8FAFC; border: 1px solid #E2E8F0; padding: 24px; margin: 30px 0; border-radius: 16px; text-align: center;">
                <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; text-transform: uppercase; font-weight: 700; letter-spacing: 1px;">Mevcut Paketiniz</p>
                <p style="margin: 0 0 10px 0; color: #E8622A; font-size: 24px; font-weight: 900;">${shop.package} Paket</p>
              </div>

              <p style="color: #64748b; font-size: 14px; line-height: 1.6; text-align: center; margin-bottom: 24px;">Lütfen ödemenizi gerçekleştirip dekontunuzu WhatsApp üzerinden bize iletmeyi unutmayınız.</p>
              
              <div style="text-align: center;">
                <a href="https://wa.me/905555555555" target="_blank" style="display: inline-block; background-color: #25D366; color: #FFFFFF; text-decoration: none; padding: 14px 28px; border-radius: 12px; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; box-shadow: 0 4px 14px rgba(37,211,102,0.4);">WhatsApp'tan Bildir</a>
              </div>
            </div>
          </div>
        `;

        await fetch(`${siteUrl}/api/email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: shop.admin_email,
            subject: 'BOOKCY - Abonelik Yenileme Zamanı Yaklaşıyor 📅',
            html: renewalHtml,
            text: `Aboneliğinizin bitmesine 3 gün kaldı. Lütfen yenileme işlemini yapınız.`
          })
        });
      }
    }

    return NextResponse.json({ success: true, message: "Günlük otomatik mailler başarıyla gönderildi." });

  } catch (error) {
    console.error('Cron job hatası:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}