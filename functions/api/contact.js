/**
 * İletişim formu backend'i — Cloudflare Pages Function.
 * POST /api/contact → Resend API üzerinden e-posta gönderir.
 * RESEND_API_KEY, Cloudflare Pages dashboard'unda ortam değişkeni olarak tanımlı.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ success: false, error: 'Invalid request body.' }, 400);
  }

  const name = String(data.name ?? '').trim().slice(0, 120);
  const email = String(data.email ?? '').trim().slice(0, 254);
  const subject = String(data.subject ?? '').trim().slice(0, 160);
  const message = String(data.message ?? '').trim().slice(0, 5000);
  const honeypot = String(data.company ?? '');

  // Honeypot doluysa büyük ihtimalle bot — sessizce "başarılı" dön
  if (honeypot) return json({ success: true });

  if (!name || !message || !EMAIL_RE.test(email)) {
    return json({ success: false, error: 'Missing or invalid fields.' }, 400);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Portfolio Contact <contact@ozyurt.dev>',
      to: 'ismail@ozyurt.dev',
      reply_to: email,
      subject: subject || `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    return json({ success: false, error: 'Email delivery failed.' }, 502);
  }
  return json({ success: true });
}
