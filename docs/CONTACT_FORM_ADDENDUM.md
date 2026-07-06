# Ek Prompt — İletişim Formu (Cloudflare Pages Functions + Resend)

Bu dosya, daha önce verilen `PROJECT_BRIEF.md` prompt'unun üzerine ek bir özellik talimatıdır. Ana proje zaten kuruluyor/kuruldu; bu sadece `/contact` sayfasındaki iletişim formunun backend'ini tanımlar.

## Karar

`mailto:` linki KULLANILMAYACAK. Bunun yerine gerçek bir form: kullanıcı sayfadan hiç ayrılmadan mesaj gönderebilecek, sunucu tarafında Resend ile e-posta olarak İsmail'e iletilecek.

## Mimari

- **Frontend:** `/contact` sayfasındaki form (ad, e-posta, konu, mesaj alanları — mevcut tasarım sistemine uygun, keskin köşeli, monospace label'lı input'lar)
- **Backend:** Cloudflare Pages Functions — `functions/api/contact.js` (veya `.ts`)
- **E-posta servisi:** Resend (ücretsiz katman, aylık 3000 e-posta limiti yeterli)

## Kurulum adımları (Claude Code için)

1. **Resend hesabı ve API key**
   - resend.com üzerinden ücretsiz hesap açılacak (bu adımı İsmail'in kendisi yapması gerekiyor, Claude Code sadece kodu hazırlar)
   - Domain doğrulama: `ozyurt.dev` Resend'e eklenip DNS kayıtları (SPF/DKIM) Cloudflare DNS panelinden eklenecek — böylece gönderilen e-postalar `contact@ozyurt.dev` gibi bir adresten gidebilir, spam'e düşme riski azalır
   - API key alınacak, Cloudflare Pages ortam değişkeni olarak eklenecek: `RESEND_API_KEY`

2. **Pages Function (`functions/api/contact.js`)**
   - POST isteği alacak: `{ name, email, subject, message }`
   - Basit sunucu tarafı doğrulama: email formatı geçerli mi, message boş değil mi
   - Honeypot alanı ekle (görünmez bir input, botlar doldurur insanlar doldurmaz) — basit spam koruması, ekstra servise gerek yok
   - Resend API'sine `POST https://api.resend.com/emails` isteği at:
     ```js
     await fetch('https://api.resend.com/emails', {
       method: 'POST',
       headers: {
         'Authorization': `Bearer ${env.RESEND_API_KEY}`,
         'Content-Type': 'application/json'
       },
       body: JSON.stringify({
         from: 'Portfolio Contact <contact@ozyurt.dev>',
         to: 'ismailozyurt96@gmail.com',
         reply_to: email, // gönderenin adresi, İsmail direkt yanıtlayabilsin
         subject: subject || `Portfolio message from ${name}`,
         text: `From: ${name} <${email}>\n\n${message}`
       })
     });
     ```
   - Başarılı/başarısız durumları JSON response olarak dön (`{ success: true }` / `{ success: false, error: '...' }`)

3. **Frontend form davranışı**
   - Form submit edildiğinde `fetch('/api/contact', { method: 'POST', body: ... })` ile gönderilecek, sayfa yenilenmeyecek
   - Gönderim sırasında buton "Sending..." durumuna geçsin (disabled değil, sadece metin/stil değişsin — erişilebilirlik için disabled kullanma)
   - Başarılı olursa form alanları temizlenip yerine kısa bir onay mesajı gösterilsin: "Message sent — I'll get back to you soon." (TR: "Mesajın gönderildi — en kısa sürede dönüş yapacağım.")
   - Hata durumunda kullanıcıya nazik bir hata mesajı + alternatif olarak doğrudan e-posta adresi gösterilsin (yedek yol)

4. **Ortam değişkeni notu**
   - `.env` dosyasına `RESEND_API_KEY` eklenmeyecek (repo'ya sızmasın) — bunun yerine Cloudflare Pages dashboard'unda **Settings → Environment variables** üzerinden eklenecek, `.gitignore`'a `.env` zaten dahil olmalı

## Tasarım notu

Form input'ları mevcut tasarım sistemine uysun: keskin köşeler (`border-radius: 0`), monospace label'lar (uppercase, letter-spacing), `--border` rengiyle ince kenarlık, focus durumunda `--accent` renginde kenarlık. Submit butonu `.btn-fill` stiliyle aynı (accent dolgu, koyu metin).
