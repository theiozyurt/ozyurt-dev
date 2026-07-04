# Ek Prompt — Türkçe İçerik Konsolidasyonu + Bekleyen Görevler (OTORİTER, ÖNCEKİ TÜM TR METİNLERİN YERİNE GEÇER)

## Bölüm A — Bekleyen görevler (logo, yönlendirme linkleri, görseller)

Bu üç madde daha önce not edilmiş, henüz uygulanmamıştı. TR içerik güncellemesiyle birlikte şimdi ekleniyor:

### A.1 — Logo / monogram

Nav'da ve favicon'da kullanılacak minimal bir kişisel monogram tasarlanacak: **"İÖ"** harfleri, keskin köşeli bir çerçeve içinde (yuvarlak değil — sitenin genel "keskin köşe" kuralına uygun, fotoğraftaki istisna burada geçerli değil). Renk: `--accent` (bronz/pirinç, `#B08D4F`), zemin `--bg-primary` (lacivert) ya da şeffaf. `Pixelify Sans` veya `Geist Mono` ile büyük harflerle, basit bir SVG olarak üretilecek — karmaşık bir logo tasarım süreci gerekmiyor, nav'a sığacak küçük bir işaret yeterli. Favicon için de aynı monogramın basitleştirilmiş/tek renkli hali kullanılacak.

### A.2 — Yönlendirme linkleri

Aşağıdaki linkler siteye eklenecek (nav'da değil, `/contact` sayfasındaki `contact-links` bölümünde ve/veya footer'da, Efe'nin sitesindeki `contact-link` yapısına benzer şekilde):

- **GitHub:** `https://github.com/theiozyurt`
- **Ceviz Biyoteknoloji web sitesi:** `https://cevizbiotech.com`
- **LinkedIn:** (kullanıcının CV'sindeki `linkedin.com/in/ismail-özyurt-49613b289` kullanılacak)
- **itch.io / Teknofest proje sayfası:** Yok, atlanacak — kullanıcının böyle bir profili yok.

### A.3 — Gerçek görseller

`/projects` ve `/leadership` sayfalarında kullanılacak gerçek görseller (Ceviz App/Viewer ekran görüntüleri, Teknofest etkinlik fotoğrafları — Aizanoi gezisi, DEÜ İzmir, Çavdarhisar roket etkinliği, GökTürk Tohumları sunum görselleri) HENÜZ SAĞLANMADI. Claude Code bu görseller gelene kadar `/public/images/projects/` ve `/public/images/leadership/` altında placeholder (düz `--bg-primary-darker` renginde kutu, kırık görsel ikonu göstermeyecek şekilde) kullanacak. Kullanıcı görselleri sağladığında dosya adları/yolları netleştirilip placeholder'ların yerine gerçek görseller konacak.

**Not:** Hero'daki kişisel fotoğraf (`/public/images/portrait.jpg`) ayrı bir madde, `HERO_ENHANCEMENTS_ADDENDUM.md` ve `HERO_VISUAL_REFINEMENT_ADDENDUM.md`'de zaten detaylandırıldı (büyük, yuvarlak, bronz çerçeveli) — bu görev o dosyalarda tanımlı, burada tekrar edilmiyor.

---

## Bölüm B — Türkçe içerik (önceki halinden aynen devam)

## Neden bu dosya var

Önceki dosyalarda (`PROJECT_BRIEF.md`, `HERO_AND_BACKGROUND_ADDENDUM.md`, `GOALS_SECTION_ADDENDUM.md`, `SPLASH_SCREEN_ADDENDUM.md`, `TERMINAL_SPLASH_AND_MOBILE_ADDENDUM.md` vb.) Türkçe metinler parça parça, farklı zamanlarda eklendi/güncellendi. Bu, birebir çeviri gibi duran ve bazı yerlerde anlamı bozuk olan tutarsız bir sonuca yol açtı. Bu dosya, sitedeki TÜM Türkçe metinleri TEK SEFERDE, doğal ve tutarlı bir dille yeniden tanımlıyor.

**KURAL:** Bu dosyadaki TR metinler, önceki dosyalardaki TR metinlerle çakışıyorsa BU DOSYA GEÇERLİDİR. Claude Code, sitedeki mevcut TR metni bu dosyadakiyle karşılaştırıp farklıysa BURADAKİYLE DEĞİŞTİRECEK.

## Genel çeviri prensibi (ileride eklenecek her TR metin için)

- **Birebir çevirme, yeniden yaz.** İngilizce cümleyi kelime kelime Türkçeye çevirmek yerine, aynı anlamı bir Türk'ün doğal olarak kuracağı cümleyle ifade et.
- **Terminal/kod bağlamındaki komut fiilleri İngilizce kalsın** (loading, building, syncing, importing, compiling, mounting, connecting) — bunları Türkçeleştirmek ("yükleniyor", "bağlanıyor") yapay durur. Sadece açıklama kısmı Türkçe olsun.
- **Doğal olmayan yapılardan kaçın:** "Bu ... bir yerdir" (This is where...) kalıbı Türkçede zorlama durur. "Burası ... yerim" yerine daha aktif, doğrudan cümleler kur.
- **Kısa ve öz kal.** İngilizce'de akıcı duran uzun bağlaçlı cümleler (em dash'lerle bölünmüş) Türkçede havada kalabilir — gerekirse iki kısa cümleye böl.

## 1. Hero

**Headline:**
> Ceviz Biyoteknoloji'de teknoloji geliştiriyorum, bu yolculuğu burada belgeliyorum.

(Not: önceki versiyondaki " — ve" bağlacı kaldırıldı, virgülle bağlanan iki kısa cümle daha doğal akıyor.)

**Typewriter satırları (dönen):**
```js
const typewriterLinesTR = [
  "ceviz_biyoteknoloji'de geliştirme yapıyorum",
  "salerno'da görüntü işleme araştırması yaptım (2024)",
  "uluslararası bir ML projesinde algoritma tasarımına liderlik ediyorum"
];
```

**Teknik overview cümlesi:**
> Flutter, Firebase ve Python ile çalışıyorum — prototip değil, gerçekten kullanılan ürünler geliştiriyorum. Şu an bir DICOM anonimleştirme sistemi üzerinde çalışıyor, uluslararası bir ML araştırma projesinde algoritma tasarımını yönetiyorum.

**Hero strip (now / before / ahead):**
```html
<div class="strip-item">
  <span class="strip-label">şu an</span>
  <span class="strip-title">Ceviz Biyoteknoloji</span>
  <span class="strip-sub">Geliştirici & Ortak</span>
</div>
<div class="strip-item">
  <span class="strip-label">öncesinde</span>
  <span class="strip-title">Salerno Üniversitesi</span>
  <span class="strip-sub">Görüntü işleme, 2024</span>
</div>
<a href="/goals" class="strip-item strip-item-link">
  <span class="strip-label">ilerisi</span>
  <span class="strip-title">Bunun nereye gittiğini gör</span>
  <span class="strip-sub">→ Hedefler</span>
</a>
```

**CTA butonları:**
```
[ ÇALIŞMALARIMA BAK ]_        [ İLETİŞİME GEÇ ]
```

## 2. /goals sayfası

Bu içerik zaten doğal yazıldığı için DEĞİŞMİYOR, referans olarak tekrar buraya konuyor (tutarlılık için tek yerden yönetilsin):

> Başlık: Bu nereye gidiyor

> Beni asıl motive eden şey, bir fikri baştan sona gerçek bir ürüne dönüştürmek — insanların gerçekten kullandığı bir şeye. Ceviz Biyoteknoloji'de, araştırmalarımda ve üstlendiğim her projede beni çeken şey bu. Bunun uzun vadede tam olarak nasıl bir şekil alacağını hâlâ keşfediyorum, ama inşa etmeye, liderlik etmeye ve harika ürünlerin/ekiplerin nasıl bir araya geldiğini öğrenmeye devam etmek istediğimi biliyorum.

## 3. Splash / boot ekranı

`TERMINAL_SPLASH_AND_MOBILE_ADDENDUM.md`'deki `bootLinesTR` DEĞİŞMİYOR, referans olarak tekrar:

```js
const bootLinesTR = [
  "ismail-ozyurt.dev başlatılıyor...",
  "loading: ceviz_biyoteknoloji — geliştirici & ortak",
  "mounting: gurok_group — yazılım stajı",
  "connecting: gural_porselen — mobil geliştirme stajı",
  "importing: salerno_research — görüntü işleme, 2024",
  "compiling: ksbu — bilgisayar mühendisliği, 3. sınıf",
  "syncing: teknofest_topluluğu + deneyap_mentörlüğü",
  "hazır."
];
```

## 4. Footer

```
© 2026 İsmail Özyurt          Kütahya, Türkiye · Bilgisayar Mühendisliği, KSBÜ
```

## 5. İletişim formu

- Form etiketleri: "Ad Soyad", "E-posta", "Konu", "Mesaj"
- Placeholder'lar: "İsmin", "mail@ornek.com", "Ne hakkında?", "Merhaba İsmail, ..."
- Gönderim başarılı: "Mesajın gönderildi, en kısa sürede dönüş yapacağım."
- Gönderim hatası: "Bir şeyler ters gitti. Doğrudan yazmak istersen: ismailozyurt96@gmail.com"
- Submit butonu: `[ MESAJI GÖNDER ]`

## 6. Nav menüsü

```
Deneyim · Projeler · Liderlik · Hedefler · CV · İletişim
```

## Diğer sayfalar (deneyim, projeler, liderlik) hakkında not

Bu sayfaların TAM TR içeriği henüz ayrı bir dosyada detaylandırılmadı. Claude Code bu sayfaları yazarken YUKARIDAKİ genel çeviri prensibini uygulayacak: CV'deki (`Ismail_Ozyurt_CV_EN-2.docx`) İngilizce içeriği referans alıp doğal Türkçeye çevirecek, birebir çeviri yapmayacak. Eğer kullanıcı bu sayfalarda da "birebir çeviri gibi duruyor" geri bildirimi verirse, o sayfanın tam metni ayrı bir ek promptla düzeltilecek.
