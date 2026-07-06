# Ek Prompt — Tasarım Sistemi Yeniden Hizalama (Ceviz Biotech Diliyle Tam Uyum)

## Karar

Sitenin görsel kimliği, Navy+Brass/pixel-terminal sisteminden VAZGEÇİLİP, Ceviz Biotech'in kurumsal web sitesindeki tasarım diline (glassmorphism, koyu mod, mavi glow, yuvarlak köşeler) TAM olarak hizalanacak. Bu dosya, önceki görsel sistem dosyalarının (`COLOR_UPDATE_ADDENDUM.md`, `TYPOGRAPHY_AND_BUTTONS_ADDENDUM.md`, `CARD_FOCUS_GLOW_ADDENDUM.md`'nin renk kısımları, `HERO_VISUAL_REFINEMENT_ADDENDUM.md`'nin köşe/buton kuralları) renk/tipografi/kompozisyon kararlarının YERİNE geçer.

**İÇERİK (metinler, sayfa yapısı, TR düzeltmeleri, testimonials, galeri/lightbox davranışı) DEĞİŞMİYOR** — bu SADECE görsel bir yeniden hizalama.

---

## 1. Renk token'ları — `tokens.css` TAMAMEN GÜNCELLENİYOR

Mevcut CSS değişken İSİMLERİ (`--bg-primary`, `--text-heading` vb.) KORUNUYOR ki diğer tüm dosyalardaki referanslar bozulmasın — sadece DEĞERLERİ değişiyor:

```css
:root {
  /* Arka planlar */
  --bg-primary: #06090F;          /* eski: #0F1A2E */
  --bg-primary-darker: #0B111C;   /* eski: #0A1220 */
  --bg-2: #11192A;                /* YENİ — üçüncü katman zemin, kart arkası vb. */

  /* Cam yüzeyler (YENİ) */
  --surface: rgba(255, 255, 255, 0.035);
  --surface-strong: rgba(255, 255, 255, 0.06);

  /* Kenarlıklar */
  --border: rgba(255, 255, 255, 0.08);         /* eski: #263A57 */
  --border-strong: rgba(255, 255, 255, 0.16);  /* YENİ — hover durumunda */

  /* Metin */
  --text-heading: #F0F4FA;   /* eski: #EDEFF3 */
  --text-body: #A8B2C5;      /* eski: #7C8CA6 */
  --text-muted: #6B7488;     /* eski: #4C617F */

  /* Vurgu — artık MAVİ aile, bronz DEĞİL */
  --accent: #6BB7FF;         /* eski: #B08D4F */
  --accent-soft: #88C7FF;    /* YENİ */
  --accent-deep: #2C7FD9;    /* YENİ */
  --glow: 107, 183, 255;     /* YENİ — RGB triplet, rgba(var(--glow), 0.3) gibi kullanılacak */

  /* Etiketler */
  --tag-bg: rgba(107, 183, 255, 0.12);  /* eski: #3A537A */
  --tag-text: #F0F4FA;                   /* eski: #EDEFF3 */
}
```

**Önemli:** `--accent` artık MAVİ. Sitede daha önce "bronz/pirinç glow" olarak tanımlanmış her şey (Ceviz logo glow'u, kart focus glow'u, buton vurguları) otomatik olarak mavi olacak çünkü hepsi `var(--accent)` üzerinden çalışıyordu — renk değişikliği tek noktadan (tokens.css) yayılacak. `CEVIZ_LOGO_GLOW_ADDENDUM.md`'deki glow zaten "logonun kendi rengini kullan" diyordu, o hâlâ geçerli (muhtemelen zaten mavi).

---

## 2. Tipografi — `Bricolage Grotesque` devreye giriyor

```css
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Manrope:wght@400;500;600&family=Instrument+Serif&display=swap');

:root {
  --font-display: 'Bricolage Grotesque', system-ui, sans-serif;   /* eski: Pixelify Sans */
  --font-body: 'Manrope', system-ui, sans-serif;                   /* DEĞİŞMEDİ */
  --font-serif: 'Instrument Serif', Georgia, serif;                /* YENİ — dramatik vurgular için opsiyonel token */
  --font-mono: 'Geist Mono', monospace;                            /* NOT: aşağıda madde 4'te kullanım alanı daralıyor */
}
```

- `Pixelify Sans` TÜM başlıklardan (`h1`, `h2`, hero headline, kart başlıkları, ghost number) kaldırılıp `var(--font-display)` (artık Bricolage Grotesque) ile değiştirilecek.
- Başlıklarda sıkı harf aralığı (`letter-spacing: -0.01em` ile `-0.02em` arası) denenecek — Bricolage Grotesque'in karakteristik havası için.
- Section etiketleri/eyebrow metinleri artık `Geist Mono` yerine `var(--font-body)` (Manrope) uppercase + `letter-spacing: .08em` ile yazılacak (Ceviz'in dilinde ayrı bir mono etiket fontu kullanılmıyor gibi görünüyor, bu varsayımla ilerliyoruz — sonradan gerekirse mono etiketler geri getirilebilir).
- `Geist Mono` sadece SPLASH EKRANINDA kalıyor (madde 6'ya bakınız, splash değişmiyor).

---

## 3. Kompozisyon kuralı TERSİNE DÖNÜYOR: keskin köşe ARTIK ZORUNLU DEĞİL

Önceki "border-radius: 0, keskin köşe her yerde" kuralı KALDIRILIYOR. Yeni standart:

```css
:root {
  --radius-sm: 8px;   /* butonlar, tag'ler, küçük öğeler */
  --radius-md: 16px;  /* kartlar */
  --radius-lg: 20px;  /* büyük yüzeyler, hero fotoğraf çerçevesi (yuvarlak fotoğraf zaten uyumlu) */
}
```

- Butonlar: `border-radius: var(--radius-sm)` (8px)
- Kartlar (proje/deneyim/liderlik/testimonial/website kartları, hero strip öğeleri): `border-radius: var(--radius-md)` (16px)
- Ghost number, ince çizgi ayraçlar gibi tipografik/dekoratif öğeler zaten köşe kavramı taşımıyor, etkilenmiyor.
- Hero'daki yuvarlak fotoğraf (`border-radius: 50%`) zaten bu yeni yumuşak-köşe diliyle DAHA UYUMLU hale geldi — o kural aynen kalıyor.

---

## 4. Butonlar — terminal parantez sistemi EMEKLİ OLUYOR, Ceviz'in buton dili geliyor

`TYPOGRAPHY_AND_BUTTONS_ADDENDUM.md`'de kurulan `[ SEE MY WORK ]_` / `[ GET IN TOUCH ]` terminal buton dili, ana sitede (splash HARİÇ) KALDIRILIYOR. Yerine:

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: var(--radius-sm);
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: transform .2s ease, box-shadow .2s ease;
  cursor: pointer;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-soft), var(--accent-deep));
  color: #06090F;
  box-shadow: 0 4px 16px rgba(var(--glow), 0.35), inset 0 1px 0 rgba(255,255,255,.3);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(var(--glow), 0.45), inset 0 1px 0 rgba(255,255,255,.3);
}

.btn-ghost {
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-body);
  backdrop-filter: blur(8px);
}
.btn-ghost:hover {
  background: var(--surface-strong);
  border-color: var(--border-strong);
}
```

**Metin içeriği değişmiyor** (hâlâ "See my work" / "Çalışmalarıma bak" gibi), sadece parantez/imleç dekorasyonu kaldırılıp düz buton görünümüne geçiliyor. Bu değişiklik şu yerlerin HEPSİNDE uygulanacak: hero CTA'ları, contact formu submit butonu, website-card CTA'ları (Ceviz alt sitelerine linkler), gallery/lightbox kontrolleri (kapatma/ok butonları hariç — onlar ikon kalabilir), goals sayfası varsa CTA'ları.

**İstisna:** Splash ekranındaki `[ SKIP ]` butonu DEĞİŞMİYOR (madde 6).

---

## 5. Kartlar — glassmorphism yüzey uygulanıyor

Sitedeki TÜM kart tipi bileşenlere (hero strip öğeleri, proje kartları, deneyim/liderlik kartları, testimonial kartları, website kartları, jam/skill benzeri her kutu) aşağıdaki temel kart stili uygulanacak:

```css
.card {
  background: var(--surface);
  backdrop-filter: blur(8px);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease, background .25s ease;
}
.card:hover {
  transform: translateY(-4px);
  background: var(--surface-strong);
  border-color: var(--border-strong);
  box-shadow: 0 20px 40px rgba(0,0,0,.4);
}
```

Bu, önceki "ince çizgilerle bölünmüş grid" (border-right/border-bottom ile ayrılan bitişik hücreler) yaklaşımının YERİNE geçiyor — artık her kart kendi başına bir cam yüzey, aralarında `gap` boşluğu var (bitişik değiller).

---

## 6. Splash ekranı — DEĞİŞMİYOR

`TERMINAL_SPLASH_AND_MOBILE_ADDENDUM.md`'deki macOS terminal penceresi (siyah zemin, trafik ışıkları, `Geist Mono`, yeşil terminal metni, `[ SKIP ]` butonu) AYNEN KALIYOR. Bu, bilinçli bir kontrast/reveal ânı olarak tasarlanmıştı — koyu terminalden sitenin kendi (artık mavi-camsı) kimliğine geçiş hâlâ işlevsel ve etkili. Splash'e HİÇBİR ŞEY dokunulmayacak.

---

## 7. Arka plan dekorasyonu — pixel twinkle YERİNE atmosferik glow + noise

`HERO_AND_BACKGROUND_ADDENDUM.md`'deki "seyrek pixel parıltısı" (bronz noktalar) KALDIRILIYOR — o, pixel/terminal kimliğine özgüydü. Yerine Ceviz'deki atmosferik yaklaşım:

```css
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -2;
  background:
    radial-gradient(ellipse 800px 600px at 20% -10%, rgba(107,183,255,.12), transparent 60%),
    radial-gradient(ellipse 600px 500px at 90% 20%, rgba(44,127,217,.10), transparent 60%);
  pointer-events: none;
}
body::after {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
  pointer-events: none;
  opacity: .5;
}
```

Bu, sayfanın geneline sabit (fixed) olarak uygulanır, her sayfada (hero'da olduğu gibi diğer sayfalarda da) görünür kalır.

---

## 8. Kart odak/glow efekti — renk güncelleniyor, davranış AYNEN kalıyor

`CARD_FOCUS_GLOW_ADDENDUM.md`'deki "hover'lanan kart büyür + parlar, diğerleri kararır" davranışı (scale(1.08), `:has()` seçicisi, mobilde Intersection Observer) DEĞİŞMİYOR — sadece glow rengi otomatik olarak mavi olacak çünkü `var(--accent)` üzerinden tanımlıydı:

```css
.exp-item:hover, .leadership-item:hover, .card:hover {
  box-shadow:
    0 0 0 1px var(--accent),
    0 0 24px 4px rgba(var(--glow), .35),
    0 20px 40px rgba(0,0,0,.5);
}
```

Bu, Ceviz'deki `.hero-card` spotlight/sheen fikriyle de ailesel bir benzerlik taşıyor — istenirse ileride imleç takip eden spotlight efekti de eklenebilir (opsiyonel, şimdilik kapsam dışı).

---

## 9. Değişmeyen her şey (netlik için liste)

- Sayfa yapısı/mimarisi (`/projects/[slug]`, `/experience/[slug]`, `/leadership/[slug]`, `Gallery.astro`, lightbox davranışı)
- Tüm içerik/metinler (TR/EN kopya, TR ses tutarlılığı düzeltmeleri, ekip/bireysel ayrımı)
- Testimonials içeriği (henüz eklenmedi, rafta bekliyor — bu değişmiyor)
- Ghost number KAVRAMI (sadece fontu Bricolage Grotesque oluyor)
- Splash ekranının TAMAMI (madde 6)
- İletişim formu backend mantığı (Resend, Cloudflare Functions)
- Ceviz logo glow'u (zaten kendi rengini kullanıyordu)

## 10. Test notu

Bu büyük bir görsel değişiklik. Uygulama sonrası `npm run dev` ile TÜM sayfalar (ana sayfa, deneyim, projeler, liderlik, goals, cv, contact, ve birkaç `[slug]` detay sayfası) tek tek gözden geçirilmeli — özellikle eski `border-right`/`border-bottom` ile bitişik duran grid'lerin yeni `gap`'li kart düzenine doğru geçtiğinden emin olunmalı.
