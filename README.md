# ozyurt.dev

İsmail Özyurt'un kişisel portfolyo sitesi. Editorial, keskin köşeli, "Autumn Harvest" paletli, TR/EN çift dilli statik site.

## Stack

- **Astro** — statik site üretimi
- **Vanilla CSS** + CSS custom properties (`src/styles/tokens.css`) — CSS framework yok. Palet: "Navy + Brass" (koyu lacivert zemin, pirinç/bronz imza vurgusu)
- **Google Fonts** — Fraunces (serif), JetBrains Mono (mono), Manrope (gövde)
- İçerik: `src/data/*.json` (her string `{ "en": ..., "tr": ... }` biçiminde)
- **İletişim formu backend'i:** Cloudflare Pages Functions + Resend (`functions/api/contact.js`)

## Geliştirme

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # dist/ üretir
npm run preview    # dist/ önizleme
```

## Çift dil sistemi

Her iki dil de DOM'a basılır; aktif dili CSS (`html[data-lang]`) gösterir.
`LangToggle` bileşeni `data-lang` özniteliğini değiştirir ve tercihi `localStorage`'a yazar.
JS kapalı olsa bile varsayılan (EN) sunucu tarafında set edildiği için içerik görünür.

Yeni çift dilli metin için `T` bileşenini kullan:

```astro
<T en="Hello" tr="Merhaba" />
<!-- ya da bir JSON alanıyla -->
<T t={item.title} />
```

## İçerik düzenleme

- `src/data/site.json` — isim, nav, iletişim, meta
- `src/data/experience.json` — deneyim zaman çizelgesi
- `src/data/projects.json` — Ceviz dışı projeler (`/projects/[slug]` otomatik üretilir)
- `src/data/leadership.json` — liderlik/topluluk
- `src/data/cv.json` — CV özeti, eğitim, beceri, dil, sertifika
- Ceviz case study: `src/pages/projects/ceviz.astro`

## Cloudflare Pages'e deploy

1. Bu klasörü bir Git deposuna push et (GitHub/GitLab).
2. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
3. Build ayarları:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy sonrası **Custom domains** → `ozyurt.dev` ekle (domain zaten Cloudflare Registrar'da olduğu için DNS otomatik ayarlanır).

`public/_headers` güvenlik ve cache başlıklarını Cloudflare Pages otomatik uygular.
Proje kökündeki `functions/` klasörünü Cloudflare Pages otomatik algılar (build ayarı gerekmez).

## İletişim formu (Resend) kurulumu

Form, `/api/contact` (Cloudflare Pages Function) üzerinden Resend ile e-posta gönderir. İsmail'in yapması gerekenler:

1. [resend.com](https://resend.com) üzerinden ücretsiz hesap aç.
2. `ozyurt.dev` domainini Resend'e ekle ve verdiği **SPF/DKIM** DNS kayıtlarını Cloudflare DNS paneline gir (böylece `contact@ozyurt.dev` adresinden gönderim yapılabilir, spam riski düşer).
3. Resend'den bir **API key** al.
4. Cloudflare Pages → **Settings → Environment variables** → `RESEND_API_KEY` olarak ekle (production). Anahtarı repoya/`.env`'e koyma.

Alıcı adresi ve gönderen (`ismailozyurt96@gmail.com`, `contact@ozyurt.dev`) `functions/api/contact.js` içinde tanımlı.

**Yerel test:** `astro dev` Pages Function'larını çalıştırmaz. Fonksiyonu yerelde test etmek için:
```bash
npm run build
npx wrangler pages dev dist   # RESEND_API_KEY'i .dev.vars ya da --binding ile ver
```

## Notlar / olası iyileştirmeler

- `public/og.svg` sosyal paylaşım görseli SVG'dir. Bazı platformlar OG için yalnızca PNG/JPG render eder; daha geniş uyum için 1200×630 PNG'ye dönüştürmek iyi olur.
- Form JS kapalıyken gönderim yapmaz; bu durumda kullanıcılar soldaki doğrudan e-posta/LinkedIn kanallarını kullanır.
