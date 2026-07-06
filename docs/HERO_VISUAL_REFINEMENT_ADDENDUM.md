# Ek Prompt — Hero Görsel ve Metin Sadeleştirme

Kullanıcı canlı önizlemeyi (ekran görüntüsü) inceledi ve üç iyileştirme istedi. `HERO_ENHANCEMENTS_ADDENDUM.md`'deki fotoğraf yerleşimi ve `HERO_AND_BACKGROUND_ADDENDUM.md`'deki hero metni bu dosyayla GÜNCELLENİYOR.

## 1. Fotoğraf — daha büyük, YUVARLAK (bilinçli istisna)

Önceki talimat "keskin köşe, border-radius: 0" idi. Fotoğraf için bu kural BİLİNÇLİ OLARAK ihlal ediliyor — insan unsuru, sistemin geri kalanındaki geometrik/pixel katılığı yumuşatan tek istisna. Bunun dışında hiçbir elementte rounded corner kullanılmayacak, SADECE fotoğrafta.

```css
.hero-photo img {
  width: 100%;
  max-width: 420px; /* önceki halinden büyük */
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 50%; /* TAM YUVARLAK — bilinçli istisna */
  border: 3px solid var(--accent);
  filter: grayscale(15%) contrast(1.05);
}
```

`.hero-grid` oranı da fotoğrafın büyümesine göre ayarlanabilir (`1.1fr 1fr` gibi, metin alanı çok daralmasın diye).

## 2. Hero headline — kısaltılmış, daha vurucu versiyon

Önceki başlık ("This is where I document the journey...") pixel fontla 6 satıra yayılıyor, okunması zorlaşıyor ve vurgu dağılıyor. AŞAĞIDAKİYLE DEĞİŞTİR:

**EN (yeni, kullan):**
> From Ceviz Biyoteknoloji to what's next — this is the journey.

**TR (yeni, kullan):**
> Ceviz Biyoteknoloji'den sıradaki adıma — bu benim yolculuğum.

Bu versiyon daha kısa olduğu için `Pixelify Sans` ile 2-3 satırda rahatça sığar, okunabilirlik artar. `border-left` alıntı stili ve font ağırlığı (600) AYNI kalıyor, sadece metin kısalıyor.

## 3. Eyebrow etiketi — daha doğal, daha az "AI kalıbı" hissi

Önceki: "KÜTAHYA, TR — BUILDING TOWARD FOUNDER" — jenerik/yapay üretilmiş bir slogan gibi okunuyor. AŞAĞIDAKİYLE DEĞİŞTİR:

**EN (yeni, kullan):**
> Kütahya, Turkey — Computer Engineering, KSBÜ

**TR (yeni, kullan):**
> Kütahya, Türkiye — Bilgisayar Mühendisliği, KSBÜ

Bu versiyon soyut bir slogan yerine somut, doğrulanabilir bilgi veriyor (konum + okul + bölüm) — daha az "pazarlama dili", daha çok gerçek bir kimlik künyesi gibi okunuyor.

## 4. Eyebrow etiketi — TAMAMEN KALDIRILDI

Madde 3'teki eyebrow çözümü ("Kütahya, Turkey — Computer Engineering, KSBÜ") de dahil, hero'nun üstündeki küçük çizgi + büyük harf etiket satırı TAMAMEN KALDIRILACAK. Bu, çok yaygın bir "AI/template" kalıbı olarak değerlendirildi.

**Yapılacak:**
- Hero artık ghost number'ın (arka plandaki soluk "01") hemen ardından DOĞRUDAN headline ile açılıyor. Eyebrow için ayrılan `<div class="hero-eyebrow">` bloğu ve ilgili CSS kaldırılacak.
- Konum/okul bilgisi (Kütahya, Turkey / KSBÜ) footer'a taşınıyor — küçük, monospace, tek satır bir "künye" olarak: `Kütahya, Turkey · Computer Engineering, KSBÜ`. Efe'nin sitesindeki footer yapısına benzer şekilde (`© yıl isim` / `stack` / `konum` üçlü düzeni) üçüncü öğe olarak eklenebilir.

## 5. Hero headline — İKİNCİ DÜZELTME (Ceviz'den ayrılma çağrışımını kaldır)

Madde 2'deki "From Ceviz Biyoteknoloji to what's next — this is the journey" cümlesi YANLIŞ ANLAMA AÇIK: "Ceviz'den bir sonraki şeye geçiyorum" gibi okunuyor, oysa kullanıcı hâlâ Ceviz'de aktif olarak çalışıyor ve çalışmaya devam etmeyi planlıyor. AŞAĞIDAKİYLE DEĞİŞTİR (madde 2'deki versiyonun YERİNE geçer):

**EN (yeni, kullan — madde 2'yi geçersiz kılar):**
> Building at Ceviz Biyoteknoloji — and documenting the journey along the way.

**TR (yeni, kullan — madde 2'yi geçersiz kılar):**
> Ceviz Biyoteknoloji'de teknoloji geliştiriyorum — ve bu yolculuğu burada belgeliyorum.

Bu versiyon şimdiki zamanda ("building", "inşa ediyorum") kalıyor, Ceviz'den ayrılma/geçiş anlamı taşımıyor, ama "journey" ve "documenting" kelimeleriyle sitenin genel "yolculuk belgeleme" temasını koruyor.

- Typewriter satırları (`HERO_ENHANCEMENTS_ADDENDUM.md` madde 1) AYNEN kalıyor
- Teknik overview cümlesi ("Flutter, Firebase and Python...") AYNEN kalıyor
- Terminal CTA butonları (`[ SEE MY WORK ]_` / `[ GET IN TOUCH ]`) AYNEN kalıyor
- Hero strip (now/before/ahead) AYNEN kalıyor
- Pixel twinkle arka plan animasyonu AYNEN kalıyor
- Ghost number, renk paleti, font sistemi — hiçbiri değişmiyor, SADECE bu dosyadaki üç madde uygulanıyor
