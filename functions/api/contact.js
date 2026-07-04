/**
 * Cloudflare Pages Function — POST /api/contact
 * İletişim formu gönderimini Resend ile e-postaya çevirir.
 *
 * Ortam değişkeni (Cloudflare Pages → Settings → Environment variables):
 *   RESEND_API_KEY  — Resend API anahtarı (repo'ya KOYMA)
 *
 * Not: `astro dev` bu fonksiyonu çalıştırmaz. Yerel test için
 * `npx wrangler pages dev dist` kullan (build sonrası).
 */

const RECIPIENT = 'ismailozyurt96@gmail.com';
const FROM = 'Portfolio Contact <contact@ozyurt.dev>';

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const isEmail = (v) =>
  typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;

export async function onRequestPost({ request, env }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid request.' }, 400);
  }

  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim();
  const subject = (body.subject || '').toString().trim();
  const message = (body.message || '').toString().trim();
  const honeypot = (body.company || '').toString().trim(); // gizli alan

  // Bot ise sessizce başarı dön (spam'e ipucu verme)
  if (honeypot) return json({ success: true });

  // Sunucu tarafı doğrulama
  if (!name || name.length > 120) {
    return json({ success: false, error: 'Please enter your name.' }, 422);
  }
  if (!isEmail(email)) {
    return json({ success: false, error: 'Please enter a valid email address.' }, 422);
  }
  if (!message || message.length < 2) {
    return json({ success: false, error: 'Please enter a message.' }, 422);
  }
  if (message.length > 5000) {
    return json({ success: false, error: 'Message is too long.' }, 422);
  }

  if (!env.RESEND_API_KEY) {
    return json({ success: false, error: 'Mail service is not configured.' }, 500);
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM,
        to: RECIPIENT,
        reply_to: email,
        subject: subject || `Portfolio message from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('Resend error', res.status, detail);
      return json({ success: false, error: 'Could not send the message.' }, 502);
    }

    return json({ success: true });
  } catch (err) {
    console.error('contact function error', err);
    return json({ success: false, error: 'Could not send the message.' }, 500);
  }
}

// Yalnızca POST kabul et
export const onRequest = async (ctx) => {
  if (ctx.request.method !== 'POST') {
    return json({ success: false, error: 'Method not allowed.' }, 405);
  }
  return onRequestPost(ctx);
};
