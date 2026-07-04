# Ek Prompt — Tipografi ve Buton Sistemi Güncellemesi

Bu dosya `PROJECT_BRIEF.md`'deki tipografi (madde 3.3) ve buton/CTA (madde 3.4) tanımlarının YERİNE geçer. Eğer bu kısımlarla ilgili kod zaten yazıldıysa GÜNCELLE.

## Yeni font sistemi

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Manrope:wght@400;500&display=swap');

:root {
  --font-display: 'Pixelify Sans', monospace;   /* Başlıklar (h1, h2, hero, kart başlıkları) */
  --font-mono: 'Geist Mono', monospace;          /* Etiketler, meta bilgi, nav, buton metni, section label'lar */
  --font-body: 'Manrope', sans-serif;            /* Gövde metni, paragraflar */
}
```

**Not:** "Geist Pixel" tam ismiyle Google Fonts'ta bulunamadı — muhtemelen Geist ailesinin bir varyantı. `Geist Mono` yeterince yakın ve doğrulanmış bir isim, o kullanılacak. Eğer proje ilerlerken tam "Geist Pixel" adı netleşirse (Vercel'in kendi font sayfasından teyit edilirse) `--font-mono` değeri güncellenebilir.

### Kullanım kuralları
- `Pixelify Sans` SADECE başlıklarda kullanılacak (h1, h2, h3, hero headline, proje/deneyim kart başlıkları). Uzun paragraf metninde KULLANILMAYACAK — okunabilirlik düşük.
- `Pixelify Sans` ağırlığı: hero'da 600 (semibold), diğer başlıklarda 500-600 arası.
- `Geist Mono` etiket ve meta metinlerde: uppercase, letter-spacing `.08em`-`.18em` arası, küçük punto (10-13px).
- `Manrope` gövde metninde: 400 normal, 500 vurgulu satırlarda.

## Buton/CTA sistemi — TERMİNAL STİLİ

Önceki denemeler (kutulu buton, çapraz kesim köşe, 8-bit pixel köşe) kullanıcı tarafından beğenilmedi. Yeni yön: **hiçbir kutu/dolgu/kenarlık şekli kullanma.** Bunun yerine köşeli parantez `[ ]` ve imleç `_` karakterleriyle, tamamen tipografik bir CTA sistemi kur.

### Yapı

```html
<a href="/projects" class="cta cta-primary">
  <span class="cta-bracket">[</span> SEE MY WORK <span class="cta-bracket">]</span><span class="cta-cursor">_</span>
</a>
<a href="/contact" class="cta cta-secondary">
  <span class="cta-bracket">[</span> GET IN TOUCH <span class="cta-bracket">]</span>
</a>
```

```css
.cta {
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: .03em;
  text-decoration: none;
  text-transform: uppercase;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}
.cta-primary { color: var(--accent); }
.cta-secondary { color: var(--text-body); }
.cta-bracket { color: var(--text-muted); }
.cta-cursor {
  color: var(--accent);
  animation: blink 1s step-start infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}

/* Hover durumu — renk değişir, altı çizilir, KUTU EKLENMEZ */
.cta:hover .cta-bracket { color: var(--accent); }
.cta-secondary:hover { color: var(--text-heading); }
```

### Kural
- Sadece BİRİNCİL CTA'da (en önemli, sayfa başına genelde 1 tane) yanıp sönen `_` imleç kullan. İkincil/üçüncül linklerde imleç YOK, sadece parantez.
- Form submit butonu da aynı sistemi kullanacak: `[ SEND MESSAGE ]` şeklinde, dolgu/kutu yok.
- Nav linkleri farklı bir sistem olabilir (altı çizili hover), ama CTA'lar (hero, form submit, kart üzerindeki "view project" gibi linkler) hep bu köşeli parantez + opsiyonel imleç sistemini kullanacak.

## Section etiketleri (ghost number)

Madde 3.4'teki "numaralandırılmış bölüm etiketi" kuralı şu şekilde netleşti: kutulu `01 —` etiketi yerine, başlığın arkasında/üstünde büyük, soluk, dekoratif bir rakam kullanılacak.

```css
.section-ghost-number {
  position: absolute;
  top: -10px;
  right: 20px; /* veya sol, section'a göre */
  font-size: 140px;
  font-weight: 700;
  font-family: var(--font-display);
  color: var(--bg-primary-darker); /* zeminden çok az farklı, soluk */
  line-height: 1;
  z-index: 0;
  pointer-events: none;
}
```

Bu, `position: relative` olan section/hero container'ının içine konur, diğer içerik `position: relative; z-index: 1` ile üstünde kalır.

## Onaylanmış referans kompozisyon

Yukarıdaki üç sistemi (font, terminal CTA, ghost number) birleştiren tam hero örneği:

```html
<section class="hero">
  <div class="section-ghost-number">01</div>

  <div class="hero-eyebrow">
    <span class="eyebrow-line"></span>
    <span class="eyebrow-text">Kütahya, TR — building toward founder</span>
  </div>

  <h1 class="hero-headline">
    My goal was never to be known as an engineer or a researcher.
  </h1>
  <p class="hero-subtext">
    It's to build my own company. Everything I do today — from Ceviz Biyoteknoloji
    to academic research — is a deliberate step toward that.
  </p>

  <div class="hero-cta">
    <a href="/projects" class="cta cta-primary">
      <span class="cta-bracket">[</span> SEE MY WORK <span class="cta-bracket">]</span><span class="cta-cursor">_</span>
    </a>
    <a href="/contact" class="cta cta-secondary">
      <span class="cta-bracket">[</span> GET IN TOUCH <span class="cta-bracket">]</span>
    </a>
  </div>

  <div class="hero-strip">
    <div class="strip-item">
      <span class="strip-label">now</span>
      <span class="strip-title">Ceviz Biyoteknoloji</span>
      <span class="strip-sub">Developer & Partner</span>
    </div>
    <div class="strip-item">
      <span class="strip-label">before</span>
      <span class="strip-title">University of Salerno</span>
      <span class="strip-sub">Computer vision, 2024</span>
    </div>
    <div class="strip-item">
      <span class="strip-label">ahead</span>
      <span class="strip-title">A company of my own</span>
      <span class="strip-sub">In progress</span>
    </div>
  </div>
</section>
```

`.hero` container'ı `position: relative; overflow: hidden;` olmalı (ghost number taşmasın diye). `.strip-label` metinleri artık numara içermiyor (`01 — now` değil, sadece `now`) çünkü numaralandırma işlevini ghost number üstlendi.

## Diğer sayfalara uygulama

Bu üç sistem (font, terminal CTA, ghost number) sadece hero'da değil, TÜM sayfalarda tutarlı kullanılacak:
- `/experience`, `/projects`, `/leadership` sayfalarındaki section başlıkları da ghost number alacak (01, 02, 03... sayfa içindeki sıraya göre)
- Proje kartlarındaki "view details" linkleri terminal CTA sistemini kullanacak
- İletişim formundaki submit butonu terminal CTA sistemini kullanacak (CONTACT_FORM_ADDENDUM.md'deki form tasarım notuyla birlikte uygulanacak — kutulu `.btn-fill` yerine bu yeni sistem geçerli)
