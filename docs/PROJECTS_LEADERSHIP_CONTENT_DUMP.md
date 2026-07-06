# Projects & Leadership — Mevcut İçerik Dökümü

> `REQUEST_PROJECTS_LEADERSHIP_CONTENT_DUMP.md` talebine yanıt. Bu dosya **kod içermez** — yalnızca `/projects` ve `/leadership` ile ilgili şu an yayında olan tüm içerik (JSON verileri + sayfa metinleri + bullet noktaları), okunup düzenlenebilsin diye. Kaynaklar: `src/data/projects.json`, `src/data/leadership.json`, `src/pages/projects/*`, `src/pages/leadership/*`, `src/pages/projects/ceviz.astro`.

---

# Projects — Mevcut İçerik Dökümü

## Sayfa metinleri (/projects)

- Başlık (EN): **Things I've shipped and built.**
- Başlık (TR): **Yayınladığım ve inşa ettiğim şeyler.**
- "Diğer projeler" bölüm etiketi (EN / TR): More projects / Diğer projeler

---

## Ceviz Biyoteknoloji — Öne çıkan vaka çalışması (Featured)

> `/projects` sayfasında en üstte, öne çıkan büyük kart. Tam vaka çalışması ayrı bir sayfada: `/projects/ceviz`. Aşağıda hem karttaki kısa metin hem de vaka çalışması sayfasının tüm içeriği var.

**Öne çıkan kart (/projects):**
- Etiket (EN / TR): Featured case study / Öne çıkan vaka çalışması
- Dönem (EN / TR): 2025 — Present / 2025 — Devam ediyor
- Açıklama (EN): "A TÜBİTAK-funded biotech startup where I'm the sole developer and a project partner. Two products, one DICOM anonymization pipeline, and a KVKK/GDPR-compliant path from CT/MRI to 3D implant design."
- Açıklama (TR): "Tek geliştiricisi ve proje ortağı olduğum, TÜBİTAK destekli bir biyoteknoloji girişimi. İki ürün, bir DICOM anonimleştirme hattı ve BT/MR'dan 3D implant tasarımına KVKK/GDPR uyumlu bir yol."
- Teknolojiler/Taglar: Flutter, Firebase, Python, DICOM, KVKK/GDPR
- Link: `/projects/ceviz` (Read the full case study / Tam vaka çalışmasını oku)

**Vaka çalışması sayfası (/projects/ceviz):**
- Eyebrow (EN / TR): Case study · Developer & Partner · 2025 — Present  /  Vaka çalışması · Developer & Partner · 2025 — Devam ediyor
- Başlık: Ceviz Biyoteknoloji
- Giriş (EN): "A TÜBİTAK-funded biotech startup building the bridge between physicians and engineers — from raw CT/MRI to a manufacturable 3D implant. I'm the sole developer and a project partner alongside Emirhan Bozoğlan and Abdüssamet Doğan."
- Giriş (TR): "Hekimlerle mühendisler arasında köprü kuran, TÜBİTAK destekli bir biyoteknoloji girişimi — ham BT/MR'dan üretilebilir 3D implanta. Emirhan Bozoğlan ve Abdüssamet Doğan ile birlikte tek geliştirici ve proje ortağıyım."

Hızlı bilgiler (facts):
- My role / Rolüm: Developer & Partner (sole developer) / Developer & Partner (tek geliştirici)
- Funding / Destek: TÜBİTAK 1501 & 1812 Industrial R&D / TÜBİTAK 1501 & 1812 Sanayi Ar-Ge
- Domain / Alan: Medical imaging · 3D implants / Tıbbi görüntüleme · 3D implant
- Stack: Flutter · Firebase · Python · DICOM

İki ürün (Two products):
1. **Ceviz App** — B2B platform · Mobile + Web / B2B platform · Mobil + Web
   - EN: "A platform that connects hospitals and physicians with engineers for 3D implant and prosthetic design. Built with Flutter and Firebase, and live on both Google Play and the App Store."
   - TR: "Hastaneleri ve hekimleri, 3D implant ve protez tasarımı için mühendislerle buluşturan bir platform. Flutter ve Firebase ile geliştirildi; hem Google Play hem App Store'da yayında."
   - Kart görseli: Ceviz App splash ekranı (gerçek görsel)
2. **Ceviz Viewer & Converter** — 3D viewer & converter · Mobile + Web / 3D görüntüleyici & dönüştürücü · Mobil + Web
   - EN: "A separate 3D viewer and converter supporting 30+ formats, planned as a standalone product and currently in testing. It turns the messy reality of medical and 3D file formats into something a clinician or engineer can actually open and work with."
   - TR: "30+ format destekleyen, bağımsız ürün olarak planlanan ve şu an test aşamasında olan ayrı bir 3D görüntüleyici ve dönüştürücü. Tıbbi ve 3D dosya formatlarının karmaşasını, bir klinisyen ya da mühendisin gerçekten açıp çalışabileceği bir şeye dönüştürüyor."
   - Kart görseli: Ceviz Viewer & Converter splash ekranı (gerçek görsel)

Mühendislik derinliği (Engineering depth) — "The DICOM anonymization pipeline / DICOM anonimleştirme hattı":
- EN: "Patient CT and MRI scans arrive as DICOM files carrying identifying metadata. Before anything else can happen, that data has to be stripped and handled lawfully. I designed and implemented a Python pipeline running on Firebase (europe-west3) that anonymizes this imaging for KVKK/GDPR compliance — keeping the geometry clinicians need while removing the identity they don't."
- TR: "Hasta BT ve MR taramaları, kimlik bilgisi taşıyan meta verilerle birlikte DICOM dosyaları olarak geliyor. Başka hiçbir şey olmadan önce, bu veri hukuka uygun biçimde temizlenmeli. Bu görüntüleri KVKK/GDPR uyumu için anonimleştiren, Firebase (europe-west3) üzerinde çalışan bir Python hattı tasarlayıp geliştirdim — klinisyenlerin ihtiyaç duyduğu geometriyi korurken ihtiyaç duymadıkları kimliği kaldırıyor."

"Beyond the code / Kodun ötesinde":
- EN: "I also hand-coded the brand website in HTML5 and CSS3 — deliberately avoiding off-the-shelf WordPress components — with performance and SEO as first-class goals. As a project partner, engineering here isn't a task list; it's part of deciding what the product should be."
- TR: "Marka web sitesini de HTML5 ve CSS3 ile elle kodladım — hazır WordPress bileşenlerinden bilinçle kaçınarak — performans ve SEO'yu birincil hedef alarak. Proje ortağı olarak buradaki mühendislik bir görev listesi değil; ürünün ne olması gerektiğine karar vermenin bir parçası."

Web siteleri (Websites) — "Three sites, hand-coded / Üç site, elle kodlandı":
- Giriş (EN): "Under the Ceviz Biyoteknoloji umbrella I hand-coded three separate websites in HTML5/CSS3 — free of off-the-shelf template constraints, with performance and SEO as first-class goals."
- Giriş (TR): "Ceviz Biyoteknoloji çatısı altında üç ayrı web sitesini HTML5/CSS3 ile sıfırdan kodladım — hazır şablon kısıtlamalarından bağımsız, performans ve SEO odaklı."
- Site 1: cevizbiotech.com — Main site / Ana site — Brand & showcase site / Marka ve tanıtım sitesi
- Site 2: cevizbiotech.com/app — Ceviz App — Physician–engineer B2B platform, web showcase / Hekim-mühendis B2B platformu, web tanıtımı
- Site 3: cevizbiotech.com/viewer — Ceviz Viewer & Converter — 3D viewer/converter, web showcase / 3D görüntüleyici/dönüştürücü, web tanıtımı

Galeri (Screenshots): İki ayrı galeri, gerçek görseller.
- `[ CEVIZ APP ]` — 2 görsel (3D model görüntüleyici, ana ekran/vaka listesi)
- `[ VIEWER & CONVERTER ]` — 4 görsel (ana ekran, 3D görüntüleyici, format dönüştürücü, profil)

Linkler:
- Vaka çalışması içi CTA'lar: /experience (See experience / Deneyime bak), /contact (Get in touch / İletişime geç)
- Dış siteler: cevizbiotech.com, cevizbiotech.com/app, cevizbiotech.com/viewer

---

## Güral Porselen Personnel Information System

- Slug: `gural-personel-bilgi-sistemi`
- Başlık (EN / TR): Güral Porselen Personnel Information System / Güral Porselen Personel Bilgi Sistemi
- Dönem: 2025
- Etiket/Ödül (EN): "Built during the Güral Porselen internship"
- Etiket/Ödül (TR): "Güral Porselen stajı sırasında geliştirildi"
- Açıklama (EN): "A personnel information system mobile app built during my Güral Porselen internship — the first project that got me into mobile development. Developed end to end largely on my own, with very little AI assistance."
- Açıklama (TR): "Güral Porselen stajım sırasında geliştirdiğim bir personel bilgi sistemi mobil uygulaması — beni mobil geliştirmeye başlatan ilk proje. Çok az yapay zeka desteğiyle, büyük ölçüde kendi başıma, uçtan uca geliştirdim."
- Bullet noktaları: (yok)
- Teknolojiler/Taglar: Flutter, Firebase, Mobile
- Galeri: **6 gerçek görsel** (`gural_porselen/*.jpeg`)
- Linkler: repo alanı boş (repo yok / gösterilmiyor)

---

## Birth Adventure

- Slug: `birth-adventure`
- Başlık (EN / TR): Birth Adventure / Birth Adventure
- Dönem: 2025
- Etiket/Ödül (EN): "Bronze Medal — 1IDEA 1WORLD International Competition"
- Etiket/Ödül (TR): "Bronz Madalya — 1IDEA 1WORLD Uluslararası Yarışması"
- Açıklama (EN): "A bronze medal among 981 projects from 33 countries at the 1IDEA 1WORLD international innovation competition, organized by TÜMMİAD and Ankara Metropolitan Municipality. I played an active role in product design."
- Açıklama (TR): "TÜMMİAD ve Ankara Büyükşehir Belediyesi tarafından düzenlenen 1IDEA 1WORLD uluslararası inovasyon yarışmasında 33 ülkeden 981 proje arasında bronz madalya. Ürün tasarımında aktif rol aldım."
- Bullet noktaları: (yok)
- Teknolojiler/Taglar: Product design, Innovation
- Galeri: **boş** (görsel yok — "Görseller yakında eklenecek" placeholder gösterilir)
- Linkler: (yok)

---

## Motivasyon Adam

- Slug: `motivasyon-adam`
- Başlık (EN / TR): Motivasyon Adam / Motivasyon Adam
- Dönem: 2024
- Etiket/Ödül (EN): "Rehabilitation Game — Dumlupınar University collaboration"
- Etiket/Ödül (TR): "Rehabilitasyon Oyunu — Dumlupınar Üniversitesi iş birliği"
- Açıklama (EN): "Co-developed an interactive game that motivates physical-therapy patients during recovery, as part of the \"Adım Robot\" rehabilitation project."
- Açıklama (TR): "\"Adım Robot\" rehabilitasyon projesi kapsamında, fizik tedavi hastalarını iyileşme sürecinde motive eden interaktif bir oyunu birlikte geliştirdim."
- Bullet noktaları: (yok)
- Teknolojiler/Taglar: Game development, Health
- Galeri: **boş** (görsel yok — placeholder)
- Linkler: (yok)

---

# Leadership — Mevcut İçerik Dökümü

## Sayfa metinleri (/leadership)

- Başlık (EN): **Community, at a realistic scale.**
- Başlık (TR): **Topluluk, gerçekçi bir ölçekte.**
- Alt metin (EN): "No inflated titles — just roles I actually hold and the concrete things they've produced."
- Alt metin (TR): "Abartılı unvanlar yok — gerçekten üstlendiğim roller ve ürettikleri somut işler."

---

## KSBÜ Teknofest Club

- Slug: `teknofest-club`
- Rol (EN / TR): Founding President / Kurucu Başkan
- Kurum/Topluluk (EN / TR): KSBÜ Teknofest Club / KSBÜ Teknofest Topluluğu
- Tarih aralığı (EN / TR): 2024 — Present / 2024 — Devam ediyor
- Açıklama (EN): "Founded and lead a student club at Kütahya Health Sciences University. It's a young, small club with modest visibility so far — but with concrete activity to point to."
- Açıklama (TR): "Kütahya Sağlık Bilimleri Üniversitesi'nde bir öğrenci topluluğu kurdum ve yönetiyorum. Henüz genç, küçük ölçekli ve görünürlüğü sınırlı bir topluluk — ama somut işlerle."
- Bullet noktaları:
  - EN: "Organized a trip to the Milli Teknoloji Zirvesi at DEÜ İzmir with 38 participants."
    TR: "DEÜ İzmir'deki Milli Teknoloji Zirvesi'ne 38 katılımcıyla bir gezi düzenledim."
  - EN: "Supported the GökTürk Tohumları team's entry to the TEKNOFEST Project Presentation Semi-Final — the Gök-Yeşil solar greenhouse project (team ID 756376)."
    TR: "GökTürk Tohumları takımının TEKNOFEST Proje Sunumu Yarı Final'ine katılımını destekledim — Gök-Yeşil solar sera projesi (takım ID 756376)."
- Galeri: **4 gerçek görsel** (`leadership/teknofest/*`)

---

## Deneyap Technology Workshops

- Slug: `deneyap`
- Rol (EN / TR): Mentor / Mentor
- Kurum/Topluluk (EN / TR): Deneyap Technology Workshops / Deneyap Teknoloji Atölyeleri
- Tarih aralığı (EN / TR): 2024 — Present / 2024 — Devam ediyor
- Açıklama (EN): "Technical mentor in Deneyap, a nationwide STEM program by the Ministry of Industry and Technology for gifted youth (ages 12–18). I guide students through hands-on projects and competition preparation in robotics, AI, software and electronics."
- Açıklama (TR): "Sanayi ve Teknoloji Bakanlığı'nın 12–18 yaş yetenekli gençlere yönelik ulusal STEM programı Deneyap'ta teknik mentor. Öğrencilere robotik, yapay zeka, yazılım ve elektronik alanlarında uygulamalı projeler ve yarışma hazırlığında rehberlik ediyorum."
- Bullet noktaları: (yok)
- Galeri: **3 gerçek görsel** (`leadership/deneyap/*`)

---

## T3 Foundation

- Slug: `t3`
- Rol (EN / TR): Scholar & Volunteer / Bursiyer & Gönüllü
- Kurum/Topluluk (EN / TR): T3 Foundation / T3 Vakfı
- Tarih aralığı (EN / TR): 2024 — Present / 2024 — Devam ediyor
- Açıklama (EN): "Two-time recipient of the T3 Foundation's \"Sen Geleceksin\" merit scholarship, and a volunteer contributor to the T3AI program bringing AI education to cities across Turkey."
- Açıklama (TR): "T3 Vakfı'nın \"Sen Geleceksin\" başarı bursunu iki kez aldım ve Türkiye genelinde yapay zeka eğitimi taşıyan T3AI programına gönüllü katkıda bulunuyorum."
- Bullet noktaları: (yok)
- Galeri: **1 gerçek görsel** (`leadership/sen_geleceksin/1769163026590.jpeg`)

---

## ÜNİDES — Ministry of Youth & Sports

- Slug: `unides`
- Rol (EN / TR): Project Coordinator / Proje Koordinatörü
- Kurum/Topluluk (EN / TR): ÜNİDES — Ministry of Youth & Sports / ÜNİDES — Gençlik ve Spor Bakanlığı
- Tarih aralığı: 2025
- Açıklama (EN): "Coordinated university-level community-service projects under ÜNİDES, a national grant program funding student-led social-impact initiatives. Managed the Digital Game Design and HealthNova AI program cycles."
- Açıklama (TR): "Öğrenci öncülüğündeki sosyal etki girişimlerini fonlayan ulusal hibe programı ÜNİDES kapsamında üniversite düzeyinde topluluk hizmeti projelerini koordine ettim. Digital Game Design ve HealthNova AI program döngülerini yönettim."
- Bullet noktaları: (yok)
- Galeri: **boş** (görsel yok — placeholder)

---

## Özet — nerede boşluk var

- **Bullet noktaları yalnızca** Ceviz (vaka çalışması) ve Teknofest Club'ta var. Deneyap, T3, ÜNİDES ve üç bağımsız projede (Güral, Birth Adventure, Motivasyon Adam) somut bullet/başarı maddesi yok — zenginleştirmeye en açık alan burası.
- **Galeri boş olanlar:** Birth Adventure, Motivasyon Adam (projeler) ve ÜNİDES (liderlik) — bunlarda gerçek görsel yok, placeholder gösteriliyor.
- **Linkler:** Ceviz dışında hiçbir projede canlı link/GitHub yok (Güral repo alanı boş). GitHub'da paylaşılabilir bir şey varsa eklenebilir.
- **En zengin içerik** Ceviz vaka çalışmasında; diğer projeler tek paragraflık özet düzeyinde.
