import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { to, subject, text } = await request.json();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, 
      auth: {
        user: 'autonestcy@gmail.com', // Yeni e-posta adresin
        pass: 'uinvlicdczqtkidy' // Boşluksuz olarak yazdım
      }
    });

    await transporter.sendMail({
      from: '"BOOKCY Yönetim Sistemi" <autonestcy@gmail.com>', // Burayı da güncelledim
      to,
      subject,
      text
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail Gönderme Hatası Detayı: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}