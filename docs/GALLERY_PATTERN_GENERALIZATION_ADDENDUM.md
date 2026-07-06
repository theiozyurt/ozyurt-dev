# Ek Prompt — Sayfa+Galeri Deseninin Genelleştirilmesi (Leadership Dahil)

## Karar

`EXPERIENCE_PAGES_ADDENDUM.md`'de tanımlanan "her girdi kendi sayfası + galeri" deseni SADECE Experience'a özel değil. Aynı mimari şu üç bölümün TAMAMINA uygulanacak:

- `/projects/[slug]` — zaten var, referans desen
- `/experience/[slug]` — `EXPERIENCE_PAGES_ADDENDUM.md`'de tanımlandı
- `/leadership/[slug]` — YENİ, bu dosyada tanımlanıyor

Yani kullanıcının yaptığı her şey (projeler, iş deneyimleri, gönüllülük/topluluk faaliyetleri) aynı tutarlı desenle sunuluyor: bir listeleme sayfası + her girdi için ayrı bir detay sayfası + o sayfanın altında bir galeri.

## Kod tekrarını önlemek için: ortak `Gallery.astro` bileşeni

Üç farklı `[slug].astro` dosyasında galeri kodunu (`EXPERIENCE_PAGES_ADDENDUM.md` madde 3'teki HTML/CSS) tekrar tekrar yazmak yerine, TEK bir paylaşılan component oluşturulacak:

```
src/components/Gallery.astro
```

```astro
---
interface Props {
  images: string[];
}
const { images } = Astro.props;
---
<div class="entry-gallery">
  <h3 class="gallery-heading">[ GALLERY ]</h3>
  {images.length > 0 ? (
    <div class="gallery-grid">
      {images.map((img) => (
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

<style>
  /* EXPERIENCE_PAGES_ADDENDUM.md madde 3'teki .gallery-grid, .gallery-item,
     .gallery-placeholder CSS'i BİREBİR buraya taşınıyor */
</style>
```

Bu component, `/projects/[slug].astro`, `/experience/[slug].astro`, ve `/leadership/[slug].astro` içinde İMPORT EDİLECEK:

```astro
---
import Gallery from '../../components/Gallery.astro';
---
<!-- sayfa içeriği -->
<Gallery images={item.gallery} />
```

**Not:** `/projects/[slug].astro` zaten önceden yazıldıysa, oradaki galeri kodu (varsa) da bu ortak component'e taşınacak — üç sayfada da AYNI görsel/davranış tutarlılığı sağlanmış olacak.

## 1. Veri yapısı — `src/data/leadership.json` güncellemesi

`EXPERIENCE_PAGES_ADDENDUM.md` madde 1'deki AYNI mantık: her girdiye `slug` ve `gallery` alanı eklenecek:

```json
{
  "id": "teknofest-topluluk",
  "slug": "teknofest-topluluk",
  "role": { "en": "Founding President", "tr": "Kurucu Başkan" },
  "organization": { "en": "KSBÜ Teknofest Club", "tr": "KSBÜ Teknofest Topluluğu" },
  "dateRange": { "en": "2024 — Present", "tr": "2024 — Devam Ediyor" },
  "description": { "en": "...", "tr": "..." },
  "bullets": [ /* mevcut madde işaretleri, gerçekçi ölçekte — PROJECT_BRIEF.md madde 5 kuralına uygun */ ],
  "gallery": []
}
```

Aynı yapı Leadership'teki TÜM girdilere uygulanacak: KSBÜ Teknofest Topluluğu, Deneyap mentorluğu, T3 Vakfı bursu/gönüllülüğü, ÜNİDES proje koordinatörlüğü.

## 2. Sayfa yapısı

### `src/pages/leadership/index.astro`
Mevcut liste yapısı kalıyor, ama her girdi artık `/leadership/[slug]`'a link veren tıklanabilir bir kart/satır:

```html
<a href={`/leadership/${item.slug}`} class="leadership-item leadership-item-link">
  <!-- mevcut içerik -->
  <span class="view-more">[ DETAYLARI GÖR ]</span>
</a>
```

### `src/pages/leadership/[slug].astro`
`experience/[slug].astro` ile BİREBİR aynı mimari (`getStaticPaths()`, ghost number, geri linki, `Gallery` component import):

```astro
---
import leadershipData from '../../data/leadership.json';
import Gallery from '../../components/Gallery.astro';

export function getStaticPaths() {
  return leadershipData.map((item) => ({
    params: { slug: item.slug },
    props: { item }
  }));
}

const { item } = Astro.props;
---
<!-- ghost number, [ ← LİDERLİĞE DÖN ] geri linki, başlık, açıklama, bullets -->
<Gallery images={item.gallery} />
```

## 3. Site haritası güncellemesi

`PROJECT_BRIEF.md` madde 4:
```
/projects           → Proje listesi
/projects/[slug]    → Her projenin tam sayfası + galeri
/experience         → Deneyim listesi
/experience/[slug]  → Her deneyimin tam sayfası + galeri
/leadership         → Liderlik/topluluk listesi
/leadership/[slug]  → Her liderlik faaliyetinin tam sayfası + galeri
```

## 4. Görseller — hâlâ bekleniyor

Bu üç bölümün galerileri de (`TR_CONTENT_AND_TODOS_ADDENDUM.md` madde A.3'teki bekleyen görev) HENÜZ görsel içermiyor, hepsi placeholder gösterecek. Kullanıcı gerçek görselleri (Ceviz App/Viewer ekran görüntüleri, Teknofest etkinlik fotoğrafları — Aizanoi, DEÜ İzmir, Çavdarhisar, GökTürk Tohumları, Deneyap etkinlikleri vb.) sağladığında, ilgili JSON dosyalarındaki `gallery` dizilerine eklenecek.
