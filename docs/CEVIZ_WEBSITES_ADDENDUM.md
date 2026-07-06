# Ek Prompt — Ceviz Case Study'e 3 Web Sitesi Bölümü Eklenmesi

## Karar

`/projects/ceviz.astro` case study sayfasına, kullanıcının Ceviz Biyoteknoloji çatısı altında geliştirdiği ÜÇ ayrı web sitesini gösteren yeni bir bölüm ekleniyor. Bunlar ayrı üst-düzey projeler DEĞİL — hepsi Ceviz'in bir parçası olduğu için `ceviz.astro` sayfasının içinde bir alt bölüm olarak yer alacak.

## Üç site

1. **cevizbiotech.com** — Ana marka/tanıtım sitesi. CV'de zaten geçiyor: HTML5/CSS3 ile sıfırdan kodlandı, WordPress'in kısıtlamalarından kaçınmak için, performans ve SEO odaklı.
2. **cevizbiotech.com/app** — Ceviz App'in web tarafı/tanıtım sayfası.
3. **cevizbiotech.com/viewer** — Ceviz Viewer & Converter'ın web tarafı/tanıtım sayfası.

## Uygulama — case study sayfasına yeni bölüm

`/projects/ceviz.astro` içine, mevcut içerikten (DICOM pipeline, TÜBİTAK, iki ürün açıklaması vb.) sonra yeni bir bölüm eklenecek:

```astro
<section class="ceviz-websites">
  <h3 class="section-subheading">[ WEB SİTELERİ ]</h3>
  <p class="section-intro">
    Ceviz Biyoteknoloji çatısı altında üç ayrı web sitesini sıfırdan kodladım — HTML5/CSS3
    ile, hazır şablon kısıtlamalarından bağımsız, performans ve SEO odaklı.
  </p>
  <div class="website-cards">
    <a href="https://cevizbiotech.com" target="_blank" rel="noopener" class="website-card">
      <span class="website-label">Ana Site</span>
      <span class="website-url">cevizbiotech.com</span>
      <span class="website-desc">Marka ve tanıtım sitesi</span>
      <span class="website-cta">[ SİTEYİ GÖR ]_</span>
    </a>
    <a href="https://cevizbiotech.com/app" target="_blank" rel="noopener" class="website-card">
      <span class="website-label">Ceviz App</span>
      <span class="website-url">cevizbiotech.com/app</span>
      <span class="website-desc">Hekim-mühendis B2B platformu, web tanıtımı</span>
      <span class="website-cta">[ SİTEYİ GÖR ]_</span>
    </a>
    <a href="https://cevizbiotech.com/viewer" target="_blank" rel="noopener" class="website-card">
      <span class="website-label">Ceviz Viewer & Converter</span>
      <span class="website-url">cevizbiotech.com/viewer</span>
      <span class="website-desc">3D görüntüleyici/dönüştürücü, web tanıtımı</span>
      <span class="website-cta">[ SİTEYİ GÖR ]_</span>
    </a>
  </div>
</section>
```

### CSS

```css
.section-subheading {
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: .1em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.section-intro {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--text-body);
  max-width: 600px;
  margin-bottom: 24px;
}
.website-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0;
  border-top: 1px solid var(--border);
  border-left: 1px solid var(--border);
}
.website-card {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  border-right: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  text-decoration: none;
  transition: background .2s;
}
.website-card:hover {
  background: var(--bg-primary-darker);
}
.website-label {
  font-family: var(--font-display);
  font-size: 16px;
  color: var(--text-heading);
}
.website-url {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}
.website-desc {
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--text-body);
}
.website-cta {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
  margin-top: 8px;
}
```

## Galeri ile ilişkisi

`GALLERY_PATTERN_GENERALIZATION_ADDENDUM.md`'deki `Gallery.astro` bileşeni bu üç sitenin ekran görüntülerini göstermek için de kullanılabilir — eğer kullanıcı üç sitenin de ekran görüntülerini sağlarsa, `ceviz.json`/`projects.json`'daki Ceviz girdisinin `gallery` dizisine eklenip sayfanın en altında (mevcut `<Gallery images={item.gallery} />` çağrısıyla) gösterilecek. Bu bölüm (web siteleri kart listesi) galerinin ÜSTÜNDE, ayrı bir bölüm olarak kalacak — ikisi birbirinin yerine geçmiyor, biri linkler+açıklama, diğeri görsel galeri.

## Veri kaynağı notu

Bu üç site linki `ceviz.astro` sayfasında DOĞRUDAN hardcoded olarak yazılabilir (yukarıdaki gibi) ya da `projects.json`/`ceviz.json` içinde ayrı bir `websites` dizisi olarak tanımlanıp sayfa içinde map edilebilir — ikisi de kabul edilebilir, Claude Code projenin mevcut veri mimarisine (JSON tabanlı mı, sayfa içi hardcoded mi) göre tutarlı olanı seçebilir.
