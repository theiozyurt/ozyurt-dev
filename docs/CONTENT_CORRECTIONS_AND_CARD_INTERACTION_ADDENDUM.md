# Ek Prompt — İçerik Düzeltmeleri + Kart Genişleme Etkileşimi

## 1. Ana sayfa/overview yanlış izlenim veriyor

Şu anki metin (hero'daki teknik overview cümlesi, `HERO_ENHANCEMENTS_ADDENDUM.md`) sanki kullanıcının TEK yaptığı şey DICOM anonimleştirme projesiymiş gibi bir izlenim veriyor — halbuki bu Ceviz'deki birçok işten sadece biri. Ayrıca uluslararası ML araştırma projesi birçok yerde "yürütüyorum/liderlik ediyorum" gibi şimdiki zamanda anlatılıyor ama proje HENÜZ BAŞLAMADI (kullanıcı kabul edildi, ama çalışma henüz başlamış değil).

**Düzeltme:**
- Overview cümlesi DICOM'u "yaptığım tek şey" gibi göstermeyecek şekilde yeniden yazılacak — Ceviz'deki işin bir parçası olarak, diğer çalışmalarla birlikte listelenecek.
- ML araştırma projesiyle ilgili TÜM ifadeler (hero typewriter, overview, varsa başka yerler) "yürütüyorum/liderlik ediyorum" yerine "yakında başlayacağım/dahil oldum" gibi doğru zamanda ifade edilecek. Örnek: "leading algorithm design on an international ML project" yerine → "set to lead algorithm design on an international ML research project" / TR: "uluslararası bir ML araştırma projesinde algoritma tasarımına liderlik edeceğim" (gelecek zaman, henüz başlamadığı için).

## 2. Ceviz Biyoteknoloji ekip ve destek bilgisi eksik/yanlış

- **Ekip:** Şu anki metinlerde sadece Emirhan Bozoğlan'dan bahsediliyor. **Abdüssamet Doğan da ekip üyesi** — bu isim de deneyim/proje açıklamalarında geçmeli (rolü netleşene kadar "ekip üyesi" olarak yeterli).
- **TÜBİTAK desteği:** Sadece 1501 değil, **1812 destekli** de aynı zamanda. Tüm yerlerde "TÜBİTAK 1501" geçen ifadeler "TÜBİTAK 1501 ve 1812 destekli" olarak güncellenecek.
- **Ceviz App ve Ceviz Viewer & Converter FARKLI projeler**, tek bir ürün gibi anlatılmamalı, ikisi ayrı ayrı tanıtılmalı:
  - **Ceviz App:** Hem Google Play hem App Store'da YAYINDA (CV'deki "App Store approval in progress" ifadesi ESKİ, artık ikisinde de canlı — bu güncelleme TÜM yerlerde yapılacak).
  - **Ceviz Viewer & Converter:** Henüz TEST AŞAMASINDA, yayında değil — bu ayrım netleşmeli, "yayında" gibi bir ifade KULLANILMAYACAK bunun için.

## 3. Gürok Group — büyüklüğü yanlış yansıtılıyor

Şu anki metin Gürok Group'u sanki sadece Kütahya'da etkili küçük bir işletmeymiş gibi gösteriyor. **Gürok Group büyük bir şirket/holding** — deneyim açıklaması bunu yansıtacak şekilde güncellenecek (örnek: "büyük bir sanayi holdingi bünyesinde yazılım geliştirme stajı" gibi bir çerçeveleme, abartısız ama doğru ölçekte).

## 4. Yeni proje eklenecek: Güral Porselen Personel Bilgi Sistemi

`/projects` sayfasına yeni bir proje eklenecek:

- **Ad:** Güral Porselen Personel Bilgi Sistemi
- **Bağlam:** Güral Porselen stajı sırasında geliştirildi
- **Önem:** Kullanıcıyı mobil geliştirmeye başlatan ilk proje — bu bağlamsal not açıklamada yer almalı
- **Teknik detay:** Çok az yapay zeka desteğiyle (yani büyük ölçüde kendi başına) geliştirildi — bu da açıklamada belirtilmeli, kullanıcının bağımsız geliştirme yeteneğini gösteren bir detay
- **GitHub reposu var** — kullanıcı repo linkini paylaştığında `project.json`'a eklenecek, şimdilik placeholder link (`#` ya da boş) bırakılabilir
- Diğer projelerle (Ceviz, Birth Adventure, Motivasyon Adam) AYNI kart/sayfa desenini (`/projects/[slug]`) kullanacak, galeri bölümü dahil

## 5. Erasmus/Salerno deneyim sayfasına staj raporu eklenmeli

Kullanıcının Salerno Erasmus stajına dair yazdığı teknik rapor ("Real-Time Face Tracking with Head Mounted Displays: A Feasibility Study") temizlenmiş haliyle (referans mektupları çıkarılmış, sadece rapor) hazır — `InternshipReport_only.pdf` dosyası. Bu, `/experience/[salerno-slug]` sayfasına indirilebilir bir PDF olarak eklenecek:

```html
<a href="/documents/InternshipReport_only.pdf" download class="report-download">
  [ STAJ RAPORUNU İNDİR (PDF) ]
</a>
```

Dosya `/public/documents/InternshipReport_only.pdf` yoluna yerleştirilecek (kullanıcı dosyayı proje klasörüne ekleyecek).

## 6. YENİ ÖZELLİK — Kart genişleme etkileşimi (hover / scroll-center)

Her experience ve leadership kartı için yeni bir etkileşim davranışı isteniyor:

### Masaüstü (hover davranışı)
Kullanıcı bir karta imleçle yaklaştığında (`:hover`):
- Kart büyür (`transform: scale(1.02)` gibi hafif bir büyüme, `transition` ile yumuşak)
- Kartın açıklaması UZAR (kısaltılmış/özet halden tam açıklamaya geçer — CSS `max-height` transition ya da JS ile içerik değişimi)
- **Yıl/tarih badge'inin altında bir mini galeri belirir** (o deneyimin/liderlik faaliyetinin `gallery` dizisinden birkaç küçük görsel, satır halinde)
- Hover kalktığında kart eski (kompakt) haline geri döner

### Mobil davranışı (scroll-center tabanlı)
Mobilde hover diye bir şey olmadığı için farklı bir tetikleyici kullanılacak: **kullanıcı sayfayı kaydırırken, o an ekranın ORTASINA gelen kart otomatik olarak "aktif/genişlemiş" duruma geçer** (Intersection Observer API ile, viewport'un orta noktasına en yakın kart tespit edilip ona `.active` class'ı eklenir):
- O kartın açıklaması uzar, galerisi altında belirir (masaüstündeki hover ile AYNI görsel sonuç, farklı tetikleyici)
- Kullanıcı kaydırmaya devam edip kart ekranın ortasından uzaklaştığında, kart eski kompakt haline geri döner
- Yani "aktif" kart her zaman ekranın merkezine en yakın olan kart, kaydırma ile sürekli değişir

### Teknik not
```js
// Mobilde Intersection Observer ile "merkeze en yakın kart" tespiti
const cards = document.querySelectorAll('.exp-item, .leadership-item');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: [0.6] });
cards.forEach((card) => observer.observe(card));
```

```css
.exp-item, .leadership-item {
  transition: transform .3s ease;
}
.exp-item:hover, .leadership-item:hover,
.exp-item.active, .leadership-item.active {
  transform: scale(1.02);
}
.exp-item .item-description { max-height: 60px; overflow: hidden; transition: max-height .3s ease; }
.exp-item:hover .item-description,
.exp-item.active .item-description { max-height: 400px; }
.exp-item .item-gallery-preview { display: none; }
.exp-item:hover .item-gallery-preview,
.exp-item.active .item-gallery-preview { display: flex; gap: 8px; margin-top: 12px; }
```

Bu, `hover` medya sorgusuyla (`@media (hover: hover)`) masaüstü/mobil ayrımı yapabilir — `hover: hover` destekleyen cihazlarda sadece CSS `:hover`, desteklemeyenlerde (dokunmatik) JS ile `.active` class mantığı çalışacak.

**Not:** Bu, `/experience` ve `/leadership` LİSTELEME sayfalarındaki kartlara uygulanıyor — kartların kendi ayrı detay sayfalarına (`/experience/[slug]`, `/leadership/[slug]`) gitme özelliği (`EXPERIENCE_PAGES_ADDENDUM.md`, `GALLERY_PATTERN_GENERALIZATION_ADDENDUM.md`) DEĞİŞMİYOR, ikisi birlikte çalışıyor: liste sayfasında kart genişleyip mini-önizleme gösteriyor, tıklanınca yine tam detay sayfasına gidiyor.

## 7. Genel not — abartı/yanlış temsil kontrolü

Bu düzeltmelerin ortak teması: sitenin hiçbir yerinde durum olduğundan farklı (daha az ya da daha fazla) gösterilmeyecek. Ekip kim, ne zaman başladı/bitti, hangi kurum ne büyüklükte — hepsi gerçek duruma sadık kalacak.
