# Ek Prompt — Her Deneyime Ayrı Sayfa + Galeri Bölümü

## Karar

`/experience` artık tek bir liste sayfası değil, `/projects` yapısına benzer şekilde iki katmanlı olacak:
- `/experience` → tüm deneyimlerin kısa özet kartlarının listelendiği bir sayfa (mevcut timeline kalabilir ama her kart artık kendi detay sayfasına link veriyor)
- `/experience/[slug]` → her deneyimin kendi tam sayfası, altında bir **galeri** bölümü olacak

Bu, `/projects/[slug].astro` ile aynı desen (`PROJECT_BRIEF.md` madde 4'te tanımlı yapı) — aynı teknik mimari deneyim sayfalarına da uygulanıyor.

## 1. Veri yapısı — `src/data/experience.json` güncellemesi

Her deneyim girdisine `slug` ve `gallery` alanı eklenecek:

```json
{
  "id": "ceviz-biyoteknoloji",
  "slug": "ceviz-biyoteknoloji",
  "role": { "en": "Developer & Partner", "tr": "Geliştirici & Ortak" },
  "organization": "Ceviz Biyoteknoloji",
  "dateRange": { "en": "2025 — Present", "tr": "2025 — Devam Ediyor" },
  "description": { "en": "...", "tr": "..." },
  "bullets": [ /* mevcut madde işaretleri */ ],
  "gallery": []
}
```

`gallery` dizisi şimdilik BOŞ — kullanıcı gerçek görselleri sağladığında dosya yolları buraya eklenecek (örnek: `["/images/experience/ceviz/screenshot-1.png", "..."]`). Görsel gelene kadar sayfa, galeri bölümünde bir placeholder gösterecek (bkz. madde 3).

Aynı yapı TÜM deneyim girdilerine uygulanacak: Ceviz Biyoteknoloji, Gürok Group, Güral Porselen, Salerno Üniversitesi (ve varsa KSBÜ eğitim girdisi).

## 2. Sayfa yapısı

### `src/pages/experience/index.astro`
Mevcut timeline kalıyor (`PROJECT_BRIEF.md` madde 3.5'teki `.exp-timeline` yapısı), ama her `.exp-item` artık tıklanabilir bir link:

```html
<a href={`/experience/${item.slug}`} class="exp-item exp-item-link">
  <!-- mevcut exp-date, exp-title, exp-company, exp-bullets içeriği -->
  <span class="exp-view-more">[ DETAYLARI GÖR ]</span>
</a>
```

### `src/pages/experience/[slug].astro`
`projects/[slug].astro` ile AYNI mimari desen (Astro'nun `getStaticPaths()` fonksiyonu, `experience.json`'dan slug'lara göre route üretimi):

```astro
---
import experienceData from '../../data/experience.json';

export function getStaticPaths() {
  return experienceData.map((item) => ({
    params: { slug: item.slug },
    props: { item }
  }));
}

const { item } = Astro.props;
---
```

Sayfa içeriği:
- Ghost number (sayfanın deneyim listesindeki sırasına göre)
- `[ ← DENEYİMLERE DÖN ]` geri linki (terminal CTA diliyle)
- Rol, kurum, tarih aralığı (büyük başlık, `Pixelify Sans`)
- Tam açıklama + madde işaretleri (mevcut `experience.json` içeriği)
- **Galeri bölümü** (madde 3)

## 3. Galeri bölümü

```html
<div class="exp-gallery">
  <h3 class="gallery-heading">[ GALLERY ]</h3>
  {gallery.length > 0 ? (
    <div class="gallery-grid">
      {gallery.map((img) => (
        <div class="gallery-item">
          <img src={img} alt="" loading="lazy" />
        </div>
      ))}
    </div>
  ) : (
    <div class="gallery-placeholder">
      <span>Görseller yakında eklenecek</span>
    </div>
  )}
</div>
```

```css
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-top: 24px;
}
.gallery-item {
  aspect-ratio: 4/3;
  overflow: hidden;
  border: 1px solid var(--border);
}
.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0; /* keskin köşe kuralı, fotoğraf istisnası burada YOK */
  filter: grayscale(10%);
  transition: filter .3s, transform .3s;
}
.gallery-item:hover img {
  filter: grayscale(0%);
  transform: scale(1.03);
}
.gallery-placeholder {
  border: 1px dashed var(--border);
  padding: 40px;
  text-align: center;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 13px;
}
```

**Not:** Galeri fotoğrafları hero'daki kişisel fotoğraftan (yuvarlak, istisna) FARKLI olarak keskin köşeli kalıyor — çünkü bunlar proje/etkinlik görselleri, "insan unsuru" istisnası sadece kişisel portre fotoğrafına özel.

### Lightbox (opsiyonel, ileride eklenebilir)
Şimdilik galeri görsellerine tıklayınca büyütme/lightbox YOK — basit grid yeterli. Kullanıcı isterse ileride ayrı bir ek promptla lightbox (tam ekran görüntüleme) eklenebilir.

## 4. Site haritası notu

`PROJECT_BRIEF.md` madde 4'teki site haritası güncelleniyor:
```
/experience         → Deneyim listesi (kartlar, her biri kendi sayfasına link veriyor)
/experience/[slug]  → Her deneyimin tam sayfası + galeri bölümü
```

## 5. Görseller henüz yok

Kullanıcı gerçek galeri görsellerini henüz sağlamadı (bkz. `TR_CONTENT_AND_TODOS_ADDENDUM.md` madde A.3 — bu görev zaten bekleyen listede). Bu addendum sadece YAPIYI kuruyor, görseller geldiğinde `experience.json`'daki ilgili `gallery` dizilerine dosya yolları eklenecek.
