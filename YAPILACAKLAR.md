# Yapılacaklar — İsmail'in yapması gerekenler

Site kodu hazır ve `npm run build` ile sorunsuz derleniyor. Aşağıdakiler senin (Claude Code'un yapamayacağı, hesap/DNS/panel işleri) tamamlaman gereken adımlar.

---

## 1. Git deposuna yükle

- [ ] Projeyi bir Git deposuna (GitHub/GitLab) push et.
  - `.gitignore` zaten `node_modules/`, `dist/`, `.env`'i hariç tutuyor — API anahtarı vb. sızmaz.

## 2. Cloudflare Pages'e deploy

- [ ] Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
- [ ] Build ayarları:
  - **Framework preset:** Astro
  - **Build command:** `npm run build`
  - **Build output directory:** `dist`
- [ ] Deploy sonrası **Custom domains** → `ozyurt.dev` ekle
  - Domain zaten Cloudflare Registrar'da olduğu için DNS otomatik ayarlanır.
- [ ] Proje kökündeki `functions/` klasörünü Cloudflare otomatik algılar — ek ayar gerekmez.

## 3. İletişim formu — Resend kurulumu

Form `/api/contact` üzerinden Resend ile mail gönderiyor. Bu adımlar tamamlanmadan form "hata" verir (yedek olarak doğrudan e-posta adresini gösterir).

- [ ] [resend.com](https://resend.com) üzerinden **ücretsiz hesap** aç.
- [ ] Resend'de **domain ekle:** `ozyurt.dev`
- [ ] Resend'in verdiği **SPF ve DKIM** DNS kayıtlarını **Cloudflare DNS paneline** gir.
  - Bu, `contact@ozyurt.dev` adresinden gönderim yapılmasını sağlar ve spam'e düşme riskini azaltır.
- [ ] Resend'den bir **API key** oluştur.
- [ ] Cloudflare Pages → **Settings → Environment variables** → yeni değişken:
  - **Name:** `RESEND_API_KEY`
  - **Value:** (Resend'den aldığın anahtar)
  - **Environment:** Production
  - ⚠️ Anahtarı repoya veya `.env` dosyasına KOYMA.
- [ ] Deploy'u yeniden tetikle (env var eklendikten sonra) ve formu canlıda test et.

### Yerel test (opsiyonel)
`astro dev` Pages Function'larını çalıştırmaz. Formu yerelde denemek için:
```bash
npm run build
npx wrangler pages dev dist
```

---

## Portre fotoğrafı

- [x] ~~Kişisel portre fotoğrafı `public/images/portrait.jpg` olarak eklendi~~ — hero'da yuvarlak, bronz çerçeveli olarak yayında.

## Proje & liderlik görselleri (placeholder'lar hazır)

Şu an bu görsellerin yerinde etiketli placeholder kutular var. Gerçek görselleri şu adlarla eklemen yeterli, otomatik yerine geçerler:

- [ ] `public/images/projects/ceviz-app.jpg` — Ceviz App arayüzü (16:10)
- [ ] `public/images/projects/ceviz-viewer.jpg` — Ceviz Viewer & Converter (16:10)
- [ ] `public/images/leadership/deu-izmir.jpg` — Milli Teknoloji Zirvesi, DEÜ İzmir (4:3)
- [ ] `public/images/leadership/gokturk-tohumlari.jpg` — GökTürk Tohumları / Gök-Yeşil (4:3)
- [ ] `public/images/leadership/aizanoi.jpg` — Aizanoi gezisi (4:3)

Başka etkinlik görseli (Çavdarhisar roket vb.) eklemek istersen söyle, ilgili sayfaya galeri kutusu ekleyeyim.

## Opsiyonel iyileştirmeler

- [ ] **OG görseli:** `public/og.svg` sosyal paylaşım görseli SVG. Bazı platformlar (WhatsApp, bazı Twitter/X önizlemeleri) OG için yalnızca PNG/JPG render eder. Daha geniş uyum için 1200×630 **PNG'ye** dönüştürüp `og.svg` yerine kullanmak iyi olur. (İstersen Claude Code hazırlayabilir.)
- [ ] LinkedIn URL'sindeki Türkçe karakter (`ismail-özyurt-...`) bazı istemcilerde sorun çıkarırsa, LinkedIn'in verdiği ASCII/kısa profil URL'siyle değiştir (`src/data/site.json`).

---

## Notlar

- İçerik düzenlemek istersen: `src/data/*.json` (her metin `{ "en": ..., "tr": ... }` biçiminde).
- Renk/tipografi: `src/styles/tokens.css`.
- Detaylı geliştirme/deploy bilgisi: `README.md`.
