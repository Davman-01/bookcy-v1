import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'; // E-posta gönderici kütüphanen hangisiyse

export async function POST(req) {
  try {
    const { to, subject, text, html } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail', // Kendi ayarların
      auth: {
        user: 'noreplybookcy@gmail.com', 
        pass: 'rzuw gadw qkgk besw',
      },
    });

    await transporter.sendMail({
      from: '"Bookcy Destek" <noreplybookcy@gmail.com>',
      to,
      subject,
      text,
      html: html || text, // İŞTE SİHİR BURADA! HTML varsa fiyakalı tasarımı yollar.
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}