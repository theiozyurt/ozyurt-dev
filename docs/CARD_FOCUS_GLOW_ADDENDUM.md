# Ek Prompt — Kart Odak/Spotlight Efekti (Düzeltme)

## Sorun

`CONTENT_CORRECTIONS_AND_CARD_INTERACTION_ADDENDUM.md` madde 6'daki kart genişleme efekti (`transform: scale(1.02)`) çok az/fark edilmez kaldı, "ucuz" bir hover gibi durdu. Bunun YERİNE gerçek bir **spotlight/odak efekti** kuruluyor: aktif kart belirgin şekilde büyüyüp parlarken, listedeki DİĞER TÜM kartlar kararacak.

## Yeni davranış

### Masaüstü — CSS `:has()` ile, JS gerekmez

```css
.exp-timeline, .leadership-list {
  position: relative;
}

.exp-item, .leadership-item {
  transition: transform .4s ease, box-shadow .4s ease, opacity .4s ease, filter .4s ease;
  transform-origin: center;
}

/* Herhangi bir kart hover'lanınca, listedeki DİĞERLERİ kararsın */
.exp-timeline:has(.exp-item:hover) .exp-item:not(:hover) {
  opacity: .35;
  filter: brightness(.5) blur(1px);
  transform: scale(.98);
}

/* Hover'lanan kart belirgin şekilde büyüsün ve parlasın */
.exp-item:hover {
  transform: scale(1.08);
  z-index: 10;
  box-shadow:
    0 0 0 1px var(--accent),
    0 0 24px 4px rgba(176, 141, 79, .35),   /* --accent renginin rgba karşılığı, glow için */
    0 20px 40px rgba(0,0,0,.5);
  opacity: 1 !important;
  filter: none !important;
}

/* leadership-item için aynı kurallar (.leadership-list:has(...) vb.) TEKRARLANACAK */
```

**Not:** `:has()` seçicisi modern tarayıcılarda (Chrome, Safari, Edge — güncel sürümler) destekleniyor. Eğer Astro projesinin hedef kitlesi çok eski tarayıcı desteği gerektirmiyorsa (ki bir portfolyo sitesi için gerektirmez) bu CSS-only çözüm tercih edilecek — JS ile hover takibi yapmaya GEREK YOK, gereksiz karmaşıklık.

### Mobil — JS `.active` class'ı ile AYNI mantık

`CONTENT_CORRECTIONS_AND_CARD_INTERACTION_ADDENDUM.md` madde 6'daki Intersection Observer mantığı AYNEN kalıyor, sadece CSS tarafı güncelleniyor:

```css
@media (hover: none) {
  .exp-item, .leadership-item {
    transition: transform .4s ease, box-shadow .4s ease, opacity .4s ease, filter .4s ease;
  }
  /* Aktif olmayan kartlar kararsın */
  .exp-timeline:has(.exp-item.active) .exp-item:not(.active) {
    opacity: .35;
    filter: brightness(.5);
    transform: scale(.98);
  }
  /* Aktif kart büyüsün ve parlasın */
  .exp-item.active {
    transform: scale(1.08);
    z-index: 10;
    box-shadow:
      0 0 0 1px var(--accent),
      0 0 24px 4px rgba(176, 141, 79, .35),
      0 20px 40px rgba(0,0,0,.5);
  }
}
```

(`:has()` mobilde de çalışıyorsa JS'e hiç gerek kalmadan aynı `:has(.exp-item.active)` deseni kullanılabilir — Intersection Observer sadece hangi karta `.active` class'ının ekleneceğini belirliyor, kararma/büyüme/parlama efektinin kendisi yine CSS'te.)

## Glow rengi tutarlılığı

Bu glow efekti, `CEVIZ_LOGO_GLOW_ADDENDUM.md`'de tanımlanan logo glow'uyla AYNI mantığı kullanıyor (renk: `--accent`, yumuşak blur) — sitenin genelinde "glow" dendiğinde hep aynı görsel dil (bronz/pirinç ışıltısı) tekrar ediyor, tutarlılık sağlanmış oluyor.

## Süre ve his

- `transition: .4s ease` — önceki denemedeki gibi ani/sert değil, göze hoş gelen bir "büyüme" hissi için yeterince yavaş.
- Büyüme oranı `scale(1.08)` — `1.02`'den belirgin şekilde daha fazla, fark edilir ama kartın komşularına taşıp üst üste binmeyecek kadar ölçülü (gerekirse `1.05`-`1.1` arası test edilip en iyi görüneni seçilebilir).
- Kararan kartlarda hafif bir `blur(1px)` de var — bu, "arka planda kalan" hissini güçlendiriyor, sadece opaklık düşüşünden daha sinematik duruyor.

## Test notu

Bu değişiklik sonrası `npm run dev` ile denenmeli — özellikle kartlar yan yana/üst üste dururken `scale(1.08)` ile büyüyen kartın komşu kartların ÜZERİNE binip binmediği kontrol edilmeli (`z-index: 10` bunun için zaten eklendi, ama görsel taşma olursa `margin` ile küçük bir boşluk payı eklenebilir).

## Lightbox — galeri görsellerine tıklayınca büyütme

Hem `Gallery.astro` bileşenindeki (proje/deneyim/liderlik detay sayfalarındaki tam galeri) hem de kart hover'ında beliren mini galeri önizlemesindeki görsellere TIKLANINCA tam ekran bir lightbox açılacak.

### Yapı

`Gallery.astro` bileşenine eklenecek (tek yerden yönetildiği için otomatik olarak üç sayfada da — projects/experience/leadership — çalışacak):

```astro
---
interface Props { images: string[]; }
const { images } = Astro.props;
---
<div class="entry-gallery">
  <h3 class="gallery-heading">[ GALLERY ]</h3>
  <div class="gallery-grid">
    {images.map((img, i) => (
      <button class="gallery-item" data-index={i} data-lightbox-trigger>
        <img src={img} alt="" loading="lazy" />
      </button>
    ))}
  </div>
</div>

<div class="lightbox" id="lightbox" aria-hidden="true">
  <button class="lightbox-close" id="lightbox-close">[ ESC ]</button>
  <button class="lightbox-prev" id="lightbox-prev">‹</button>
  <img class="lightbox-image" id="lightbox-image" src="" alt="" />
  <button class="lightbox-next" id="lightbox-next">›</button>
</div>

<script define:vars={{ images }}>
  let currentIndex = 0;
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');

  function openLightbox(index) {
    currentIndex = index;
    lightboxImage.src = images[currentIndex];
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImage.src = images[currentIndex];
  }
  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImage.src = images[currentIndex];
  }

  document.querySelectorAll('[data-lightbox-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(Number(btn.dataset.index)));
  });
  document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
  document.getElementById('lightbox-next').addEventListener('click', showNext);
  document.getElementById('lightbox-prev').addEventListener('click', showPrev);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
</script>
```

### CSS

```css
.gallery-item {
  background: none;
  border: 1px solid var(--border);
  padding: 0;
  cursor: pointer;
}
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(10, 15, 25, .92); /* --bg-primary-darker'ın koyu/şeffaf hali */
  display: none;
  align-items: center;
  justify-content: center;
  z-index: 9998;
}
.lightbox.open { display: flex; }
.lightbox-image {
  max-width: 85vw;
  max-height: 85vh;
  object-fit: contain;
  border: 1px solid var(--accent);
}
.lightbox-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: var(--text-body);
  font-family: var(--font-mono);
  font-size: 14px;
  cursor: pointer;
}
.lightbox-close:hover { color: var(--accent); }
.lightbox-prev, .lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--text-body);
  font-size: 32px;
  cursor: pointer;
  padding: 16px;
}
.lightbox-prev { left: 16px; }
.lightbox-next { right: 16px; }
.lightbox-prev:hover, .lightbox-next:hover { color: var(--accent); }
```

### Kart hover mini galerisiyle ilişkisi

`CONTENT_CORRECTIONS_AND_CARD_INTERACTION_ADDENDUM.md` madde 6'daki hover/scroll-center mini galeri önizlemesindeki görsellere de AYNI lightbox mantığı bağlanacak — kullanıcı bir karta hover yapıp mini galerideki bir görsele tıkladığında da bu tam ekran lightbox açılmalı, ayrı bir sistem kurulmayacak.

### Erişilebilirlik

- `aria-hidden` durumu açık/kapalı state'e göre güncellenmeli
- Klavye ile gezinme (ok tuşları, Escape) zaten yukarıdaki kodda var
- Odak yönetimi: lightbox açıldığında odak `lightbox-close` butonuna gitmeli, kapanınca tetikleyen görsele geri dönmeli (tam erişilebilirlik için Claude Code bunu ekleyebilir, kritik değil ama iyi pratik)
