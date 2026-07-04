# İsmail Özyurt — Portfolyo Sitesi

Bu dosya Claude Code için bir proje brief'idir. Amaç: aşağıda tanımlanan tasarım sistemi, içerik ve site mimarisiyle tam işlevsel bir Astro portfolyo sitesi kurmak, Cloudflare Pages'e deploy edilebilir hale getirmek.

## 1. Proje özeti

- **Kişi:** İsmail Özyurt — Kütahya Sağlık Bilimleri Üniversitesi, Bilgisayar Mühendisliği (3. sınıf)
- **Konumlama:** Mühendis ya da araştırmacı olarak değil, **girişimci** olarak konumlanıyor. Akademi ve kurumsal deneyim, kendi şirketini kurmaya giden yolda birer araç olarak çerçeveleniyor — bu site onun "mühendis portfolyosu" değil "kurucu olma yolunda inşa ettiklerinin vitrini".
- **Domain:** `ozyurt.dev` (satın alındı, Cloudflare Registrar üzerinden)
- **Hosting:** Cloudflare Pages (ücretsiz, Git push ile otomatik deploy)
- **Dil:** TR/EN çift dilli, dil değiştirme toggle ile (varsayılan dil: EN — akademik/uluslararası hedef kitle öncelikli, ama TR içerik eksiksiz olmalı)

## 2. Teknik stack

- **Framework:** Astro (statik site üretimi, hızlı, SEO dostu, çoklu sayfa desteği)
- **Styling:** Vanilla CSS + CSS custom properties (tokens.css), framework CSS kütüphanesi yok (Tailwind vb. kullanma — tasarım sistemi özel)
- **Deploy hedefi:** Cloudflare Pages, custom domain `ozyurt.dev`
- **İçerik yönetimi:** JSON dosyaları (`src/data/*.json`) — TR/EN içerik aynı dosyada, key bazlı ayrım (Efe'nin `data-tr`/`data-en` mantığının Astro'ya uyarlanmış hali, ama statik build'de düz JS objesi olarak client-side render)

## 3. Tasarım sistemi — KRİTİK, DİKKATLE UYGULA

### 3.1 Ana ilke
Bu site **kesinlikle** bir AI/chatbot arayüzüne (Claude, ChatGPT vb.) benzememeli. Yani şunlardan kaçın:
- Yuvarlatılmış köşeli kartlar (rounded corners, border-radius > 4px)
- Yumuşak/pastel renk kullanımı geniş alanlarda
- Sans-serif tek font ailesi
- Gölgesiz düz "SaaS" kart estetiği
- Ferah, "her şey rahat" boşluklandırma

Bunun yerine: **keskin köşeler, editorial/gazete hissi, asimetrik grid, ince çizgilerle bölünmüş bölümler.**

### 3.2 Renk paleti — "Autumn Harvest" (kullanıcı tarafından seçildi, uygulama şekli özenle tasarlandı)

```css
:root {
  --bg-primary: #3D2119;      /* Ana zemin — koyu bordo-kahve, NEAR-BLACK değil, palet ailesinden */
  --bg-primary-darker: #2A160F; /* Alternatif daha koyu bölüm zemini, kontrast için */
  --text-heading: #F3E9DC;    /* Başlıklar — krem, yüksek kontrast */
  --text-body: #B99680;       /* Gövde/ikincil metin — sıcak taupe */
  --text-muted: #8C6B54;      /* En düşük öncelikli metin (tarihler, etiketler) */
  --accent: #C08552;          /* İMZA rengi — buton, link, çizgi vurguları. AZ KULLAN, egemen olmasın */
  --border: #6B4530;          /* Ayraç çizgileri, kenarlıklar */
  --tag-bg: #DAB49D;          /* SADECE küçük etiket/badge arka planı, geniş alanda KULLANMA */
  --tag-text: #3D2119;        /* Tag üzerindeki metin (koyu, kontrast için) */
}
```

**Kritik kural:** `--accent` (#C08552) rengi Anthropic'in "clay" marka rengine yakın bir tonda. Bu yüzden asla geniş yüzeylerde (büyük butonlar, büyük kart arka planları) kullanılmayacak — sadece ince çizgi, küçük buton, link hover gibi "imza" noktalarında.

### 3.3 Tipografi

- **Başlıklar (h1, h2, hero metni):** Serif font — Google Fonts'tan `Fraunces` veya `Playfair Display` (editorial/gazete hissi). Ağırlık: 400, gerektiğinde 500.
- **İkincil metin, etiketler, meta bilgiler, nav:** Monospace font — `JetBrains Mono` veya `IBM Plex Mono`. Letter-spacing geniş (.08em-.18em), uppercase, küçük punto (11-13px).
- **Gövde metni (paragraflar):** `Manrope` (Google Fonts) — geometrik, okunabilirlik önceliği, ama başlıklardaki serif kimliği bozmayacak şekilde ikincil planda kalacak. Ağırlık: 400 gövde, 500 vurgulu satırlar için.

### 3.4 Kompozisyon kuralları

- `border-radius: 0` her yerde varsayılan. İstisna yok.
- Kartlar yerine **ince çizgilerle (1px solid var(--border)) bölünmüş grid'ler** kullan — bkz. onaylanan hero mockup'taki 3'lü "01 — now / 02 — before / 03 — ahead" bloğu.
- Sol kenarlıklı alıntı/vurgu blokları (`border-left: 2px solid var(--accent); padding-left: 1.25rem`) — hero başlığında ve önemli alıntılarda kullan.
- Numaralandırılmış bölüm etiketleri (`01 —`, `02 —` gibi) section label olarak kullan, monospace fontla.
- Gölge kullanma (box-shadow yok). Derinlik hissi çizgi ve kontrastla verilecek, gölgeyle değil.
- Buton stili: dolgu (accent bg + koyu text) VEYA outline (border + accent text), keskin köşeli, monospace uppercase label.

### 3.5 Referans mockup (onaylanmış hero kompozisyonu)

Hero bölümü şu yapıda olacak (tam kod referansı, component'e uyarlanacak):

```html
<section class="hero">
  <div class="hero-eyebrow">
    <span class="eyebrow-line"></span>
    <span class="eyebrow-text">Kütahya, TR — building toward founder</span>
  </div>
  <blockquote class="hero-headline">
    My goal was never to be known as an engineer or a researcher.
  </blockquote>
  <p class="hero-subtext">
    It's to build my own company. Everything I do today — from Ceviz Biyoteknoloji
    to academic research — is a deliberate step toward that.
  </p>
  <div class="hero-cta">
    <a href="/projects" class="btn btn-fill">See my work</a>
    <a href="/contact" class="btn btn-outline">Get in touch</a>
  </div>
  <div class="hero-strip"> <!-- 3 kolonlu, ince çizgi ayraçlı -->
    <div class="strip-item">
      <span class="strip-label">01 — now</span>
      <span class="strip-title">Ceviz Biyoteknoloji</span>
      <span class="strip-sub">Developer & Partner</span>
    </div>
    <div class="strip-item">
      <span class="strip-label">02 — before</span>
      <span class="strip-title">University of Salerno</span>
      <span class="strip-sub">Computer vision, 2024</span>
    </div>
    <div class="strip-item">
      <span class="strip-label">03 — ahead</span>
      <span class="strip-title">A company of my own</span>
      <span class="strip-sub">In progress</span>
    </div>
  </div>
</section>
```

## 4. Site haritası

```
/                → Ana sayfa: Hero + öne çıkan 3 şey (Ceviz, Salerno, hedef) + kısa yönlendirmeler
/experience      → Kronolojik deneyim listesi (timeline, çizgi bazlı, kart değil)
/projects        → Proje listesi (Ceviz hariç — ona ayrı sayfa var)
/projects/ceviz  → Ceviz case study (detaylı: DICOM pipeline, TÜBİTAK, iki ürün: Ceviz App + Ceviz Viewer & Converter)
/projects/[slug] → Diğer projeler (Birth Adventure, Motivasyon Adam, GökTürk Tohumları vb.)
/leadership      → Topluluk/liderlik (Teknofest Topluluğu, Deneyap, T3, ÜNİDES) — GERÇEKÇİ ÖLÇEKTE, abartısız
/cv              → CV'nin web + PDF indirme versiyonu
/contact         → İletişim formu + linkler
```

## 5. İçerik — doğruluk kritik, aşağıdaki düzeltmeleri uygula

**ÖNEMLİ:** Aşağıdaki bilgiler kullanıcı tarafından düzeltilmiş, doğru hallidir. CV dosyasındaki (`Ismail_Ozyurt_CV_EN-2.docx`, ayrıca yüklendi) bazı ifadelerden farklıdır — sitede bu düzeltilmiş halleri kullan:

- **Ceviz Biyoteknoloji rolü:** "Co-founder" DEĞİL. Doğru unvan: **"Developer & Partner"**. İsmail tek geliştirici, Emirhan Bozoğlan ile proje ortağı. Şirketin resmi kurucu ortağı olarak değil, **proje ortağı** olarak konumlandırılmalı.
- **Ceviz'in iki aktif projesi:** (1) **Ceviz App** — hastane/hekim-mühendis B2B platformu (mobil + web, Flutter/Firebase), (2) **Ceviz Viewer & Converter** — 30+ format destekleyen 3D görüntüleyici/dönüştürücü, bağımsız ürün olarak planlanan.
- **Salerno araştırması:** GEÇMİŞ ZAMANDA anlatılmalı ("prior research experience", "2024'te"), şu an devam ediyormuş gibi yazılmamalı. "Real-Time Face Tracking with Head-Mounted Displays" projesi, 3 ay sürdü, teknik rapor yazdı.
- **Gürok Group stajı:** CV'de yok ama güncel — Temmuz-Ağustos 2026, yazılım geliştirme stajı, deneyim sayfasına eklenmeli.
- **Uluslararası ML projesi:** CV'de yok, eklenmeli. Doç. Dr. Bahar Çelik'in dahil ettiği uluslararası bir makine öğrenmesi projesinde algoritma geliştirme liderliği yapıyor (güncel, devam eden).
- **KSBÜ Teknofest Topluluğu:** Kuruluş başkanı, ama GERÇEKÇİ ölçekte anlatılmalı — "national" gibi büyük iddialar YOK. Küçük bir üniversite kulübü, henüz düşük görünürlük, ama somut aktiviteler var: Milli Teknoloji Zirvesi DEÜ İzmir gezisi (38 katılımcı), GökTürk Tohumları takımının TEKNOFEST Proje Sunumu Yarı Final'e katılımı (Gök-Yeşil solar sera projesi, takım ID 756376).
- **Deneyap mentorluğu:** Doğru, CV'deki gibi kalabilir.
- **Sınıf bilgisi:** CV'de "Second-year Computer Engineering student" yazıyor — bu YANLIŞ. Doğrusu: **3. sınıf**. Sitede her yerde (hero, summary, education) "third-year" / "3. sınıf" olarak düzelt.

### İçerik kaynakları
- Ana kaynak: `Ismail_Ozyurt_CV_EN-2.docx` (ekte, deneyim/eğitim/sertifika/dil bilgisi için kullan, yukarıdaki düzeltmelerle)
- İletişim: ismailozyurt96@gmail.com, LinkedIn: linkedin.com/in/ismail-özyurt-49613b289, telefon +90 538 634 94 34
- Konum: Kütahya, Türkiye

## 6. Hero metni (onaylandı, birebir kullan)

**EN:**
> My goal was never to be known as an engineer or a researcher — it's to build my own company. Everything I do today, from Ceviz Biyoteknoloji to academic research, is a deliberate step toward that.

**TR:**
> Hedefim hiçbir zaman mühendis ya da araştırmacı olarak anılmak olmadı — hedefim kendi şirketimi kurmak. Bugün yaptığım her şey, Ceviz Biyoteknoloji'den akademik araştırmaya kadar, o hedefe giden bilinçli bir adım.

## 7. Build sırası (önerilen)

1. `npm create astro@latest` ile proje iskeleti
2. `src/styles/tokens.css` — yukarıdaki renk paleti + font importları (Google Fonts: Fraunces/Playfair Display + JetBrains Mono/IBM Plex Mono + Manrope)
3. `BaseLayout.astro` — ortak head, meta tag'ler (OG image, description — Efe'nin sitesindeki eksiklik burada TAMAMLANMALI), dil sistemi altyapısı
4. `Nav.astro`, `LangToggle.astro` — TR/EN geçiş, keskin köşeli, monospace
5. `Hero.astro` — yukarıdaki referans mockup birebir
6. `src/data/experience.json`, `projects.json`, `leadership.json` — TR/EN içerik, madde 5'teki düzeltmelerle
7. `/experience`, `/projects`, `/leadership`, `/cv`, `/contact` sayfaları
8. `/projects/ceviz.astro` — özel case study sayfası (en detaylı proje sayfası)
9. Responsive kontrol (mobil, tablet)
10. Build test (`npm run build`), Cloudflare Pages deploy hazırlığı

## 8. Kesinlikle yapılmaması gerekenler

- Rounded corners kullanma
- Efe'nin (hasan-efe-hayri.itch.io tarzı) neon-yeşil/koyu oyun estetiğini kopyalama
- Barış'ın (gulecbaris.tech) siyah-beyaz minimal "AI engineer" şablonunu kopyalama
- Genel olarak herhangi bir "AI ile yapılmış site" hissi verecek yumuşak/rounded/pastel kompozisyon kullanma
- CV'deki "co-founder" ifadesini olduğu gibi kullanma — "Developer & Partner" olarak düzelt
- Salerno araştırmasını şimdiki zamanda ("currently researching") yazma
- Teknofest Topluluğu'nu abartılı/ulusal ölçekte gösterme
