# ozyurt.dev — Sitedeki TÜM Metinler (EN + TR)

> Bu dosya, web sitesindeki **tüm kullanıcıya görünen metinleri** tek yerde toplar — sayfalar, bileşenler ve `src/data/*.json` verileri dahil. Her madde İngilizce (EN) ve Türkçe (TR) karşılıklarıyla verilmiştir. Yalnızca tek dilde olan öğeler (marka adları, etiketler/tag'ler, bazı meta açıklamaları, ekran okuyucu/aria etiketleri) ayrıca belirtilmiştir. Kaynak: `src/data/*.json`, `src/pages/**`, `src/components/**`, `src/layouts/BaseLayout.astro`.

---

## 0. Genel / Marka / Meta (tüm sayfalarda ortak)

**Sayfa başlığı (title) kalıbı** (tarayıcı sekmesi + OG/Twitter):
- Ana sayfa: `İsmail Özyurt — Computer Engineering student & Developer at Ceviz Biyoteknoloji` (role EN, tüm dillerde İngilizce)
- Diğer sayfalar: `{Sayfa Başlığı} — İsmail Özyurt`

**Site rolü (role)** — `site.json`
- EN: Computer Engineering student & Developer at Ceviz Biyoteknoloji
- TR: Bilgisayar Mühendisliği öğrencisi & Ceviz Biyoteknoloji'de geliştirici

**Konum (location)** — `site.json`
- EN / TR: Kütahya, Türkiye

**Site meta açıklaması (description)** — `site.json`
- EN: İsmail Özyurt — Computer Engineering student at Kütahya Health Sciences University, Developer & Partner at Ceviz Biyoteknoloji.
- TR: Kütahya Sağlık Bilimleri Üniversitesi'nde Bilgisayar Mühendisliği okuyorum. Ceviz Biyoteknoloji'de geliştirici ve ortak olarak çalışıyorum.

**İletişim sabitleri** (tüm dillerde aynı): E-posta `ismailozyurt96@gmail.com` · Telefon `+90 538 634 94 34` · LinkedIn `linkedin.com/in/ismail-özyurt` · GitHub `github.com/theiozyurt` · Ceviz `cevizbiotech.com`

**Ekran okuyucu / erişilebilirlik metinleri (yalnızca EN, aria/gizli):**
- Skip link: `Skip to content`
- Nav aria-label'ları: `Primary`, `Menu`, `Mobile`
- Dil değiştirici aria-label: `Language / Dil`
- Lightbox aria-label'ları (TR): `Görsel önizleme`, `Kapat`, `Önceki görsel`, `Sonraki görsel`
- Galeri buton aria-label (TR): `Görseli büyüt`

---

## 1. Navigasyon (Nav) — `site.json` + `Nav.astro`

**Marka:** `İÖ` (monogram) · `İsmail Özyurt` · `.dev`

**Menü öğeleri:**
| EN | TR |
|---|---|
| Home | Ana Sayfa |
| Experience | Deneyim |
| Projects | Projeler |
| Leadership | Liderlik |
| Goals | Hedefler |
| CV | CV |
| Contact | İletişim |

---

## 2. Footer — `Footer.astro`

- Marka: `İsmail Özyurt.dev`
- Sütun başlığı 1 — EN: **Elsewhere** / TR: **Diğer** (altında: e-posta, LinkedIn, GitHub, Ceviz Biyoteknoloji, telefon)
- Sütun başlığı 2 — EN: **Site** / TR: **Site** (altında nav öğeleri)
- Telif: `© {yıl} İsmail Özyurt`
- İmza: `by Ozyurt` (tüm dillerde aynı)

---

## 3. Açılış animasyonu (Splash / boot sekansı) — `Splash.astro`

- Terminal başlığı: `ismail@ozyurt — zsh — 80×24`
- Atla butonu: `[ SKIP ]`

**Boot satırları — EN:**
```
booting ismail-ozyurt.dev...
mounting: gurok_group — software internship
connecting: gural_porselen — mobile dev internship
importing: salerno_research — computer vision, 2024
compiling: ksbu — computer engineering, 3rd year
syncing: teknofest_topluluk + deneyap_mentor
loading: ceviz_biyoteknoloji — developer & partner
ready.
```

**Boot satırları — TR:**
```
ismail-ozyurt.dev başlatılıyor...
mounting: gurok_group — yazılım stajı
connecting: gural_porselen — mobil geliştirme stajı
importing: salerno_research — bilgisayarlı görü, 2024
compiling: ksbu — bilgisayar mühendisliği, 3. sınıf
syncing: teknofest_topluluğu + deneyap_mentörlüğü
loading: ceviz_biyoteknoloji — geliştirici & ortak
hazır.
```

---

## 4. Ana Sayfa (/) — `index.astro` + `Hero.astro`

### 4.1 Hero
- Başlık — EN: **This is where I document my journey.** / TR: **Yolculuğumu burada belgeliyorum.**
- Genel bakış (overview):
  - EN: I build real products with Flutter, Firebase and Python — not just prototypes. At Ceviz I develop two products and the KVKK/GDPR DICOM pipeline behind them, and I'll soon be leading algorithm development on an international ML research project.
  - TR: Flutter, Firebase ve Python ile gerçek ürünler geliştiriyorum — prototip değil. Ceviz'de iki ürünü ve arkalarındaki KVKK/GDPR DICOM hattını geliştiriyorum; yakında uluslararası bir ML araştırma projesinde algoritma geliştirmeye liderlik edeceğim.
- CTA'lar: **See my work / Çalışmalarıma bak** · **Get in touch / İletişime geç**

**Hero daktilo (typewriter) satırları:**
| EN | TR |
|---|---|
| building at Ceviz Biyoteknoloji | ceviz_biyoteknoloji'de geliştirme yapıyorum |
| researching computer vision at Salerno | salerno'da bilgisayarlı görü araştırması yaptım (2024) |
| leading algorithm development on an international ML project | uluslararası bir ML projesinde algoritma geliştirmeye liderlik edeceğim |

**Hero şeridi (strip):**
| Etiket (EN/TR) | Başlık (EN/TR) | Alt (EN/TR) |
|---|---|---|
| now / şu an | Ceviz Biyoteknoloji | Developer & Partner / Geliştirici & Ortak |
| before / öncesinde | University of Salerno / Salerno Üniversitesi | Computer vision, 2024 / Bilgisayarlı görü, 2024 |
| ahead / ilerisi | Where I'm headed / Sırada ne var | → Goals / Hedefler |

### 4.2 "What I'm building / İnşa ettiklerim" (üç kart)
Bölüm etiketi — EN: **What I'm building** / TR: **Üzerinde Çalıştıklarım**

**Kart 1 — Ceviz Biyoteknoloji**
- Üst satır — EN: Developer & Partner · Now / TR: Developer & Partner · Şimdi
- EN: A TÜBİTAK-funded biotech startup. I build two products: a physician–engineer B2B platform and a 30+ format 3D viewer & converter — plus the KVKK/GDPR DICOM pipeline behind them.
- TR: TÜBİTAK destekli bir biyoteknoloji girişimi. İki ürün geliştiriyorum: hekim–mühendis B2B platformu ve 30+ format destekli 3D görüntüleyici/dönüştürücü — ve arkalarındaki KVKK/GDPR DICOM hattı.
- CTA: **Read the case study / Vaka çalışmasını oku**

**Kart 2 — Research & internships / Araştırma & stajlar**
- Üst satır — EN: Salerno, Güral, Gürok · Track record / TR: Salerno, Güral, Gürok · Geçmiş
- EN: Computer-vision research at the University of Salerno (2024), enterprise Flutter at Güral Porselen, and an upcoming Gürok Group internship — each has deepened my engineering experience.
- TR: Salerno Üniversitesi'nde bilgisayarlı görü araştırması (2024), Güral Porselen'de kurumsal Flutter deneyimi ve yaklaşan Gürok Group stajı — her biri mühendislik deneyimimi biraz daha derinleştirdi.
- CTA: **See the timeline / Zaman çizelgesine bak**

**Kart 3 — Where this is going / Bu nereye gidiyor**
- Üst satır — EN: The bigger picture · Ahead / TR: Büyük resim · İleride
- EN: Everything above has shaped where I am today. Academic work, leading KSBÜ Teknofest Club, mentoring — deliberate practice at building things that actually work end to end. I'm still figuring out exactly where it leads.
- TR: Yukarıdaki her şey beni bugüne getirdi. Akademik çalışmalar, KSBÜ Teknofest Topluluğu'nu yönetmek, mentorluk — baştan sona işleyen şeyler üretmek için bilinçli bir pratik. Uzun vadede beni nereye götüreceğini hâlâ keşfediyorum.
- CTA: **Where I'm headed / Devamını gör**

### 4.3 "Explore more / Yakından incele" (dizin)
- Bölüm etiketi — EN: **Explore more** / TR: **Yakından incele**
- Başlık — EN: **The full picture, page by page.** / TR: **Bütünü, sayfa sayfa.**

| # | Ad (EN/TR) | Açıklama (EN/TR) |
|---|---|---|
| 01 | Experience / Deneyim | Timeline of work & research / İş ve araştırma zaman çizelgesi |
| 02 | Projects / Projeler | Ceviz, Birth Adventure & more / Ceviz, Birth Adventure ve daha fazlası |
| 03 | Leadership / Liderlik | Teknofest Club, Deneyap, T3, ÜNİDES / Teknofest Topluluğu, Deneyap, T3, ÜNİDES |
| 04 | Goals / Hedefler | Where this is going / Bu nereye gidiyor |
| 05 | CV / Özgeçmiş | Full résumé, web & print / Tam özgeçmiş, web ve baskı |

---

## 5. Deneyim (/experience) — `experience/index.astro` + `experience.json`

**Sayfa:**
- Meta açıklama (yalnızca EN): İsmail Özyurt's experience — Ceviz Biyoteknoloji, international ML research, Gürok Group and Güral Porselen internships, and prior computer-vision research at the University of Salerno.
- Bölüm etiketi — EN: **Experience** / TR: **Deneyim**
- Başlık — EN: **Experience, built deliberately.** / TR: **Adım adım, bilerek kurduğum bir deneyim.**
- Alt metin — EN: Chronological, most recent first — role, organization, dates, and outcomes. / TR: Kronolojik, en yeniden eskiye — rol, kurum, tarih ve çıktılar.
- Kart CTA'sı — EN: **View details** / TR: **Detayları gör**
- Detay sayfası CTA'ları: **Back to experience / Deneyime dön** · **Get in touch / İletişime geç** · Geri linki: **Back to experience / Deneyimlere dön**

### 5.1 Ceviz Biyoteknoloji A.Ş.
- Dönem — EN: 2025 — Present / TR: 2025 — Devam ediyor
- Rol — EN/TR: Developer & Partner
- Tür — EN: Biotech startup · TÜBİTAK-funded / TR: Biyoteknoloji girişimi · TÜBİTAK destekli
- Özet:
  - EN: Sole developer and project partner (alongside Emirhan Bozoğlan and Abdüssamet Doğan) at a TÜBİTAK 1501- and 1812-funded biotech startup building a B2B platform that connects physicians and engineers for 3D implant and prosthetic design.
  - TR: TÜBİTAK 1501 ve 1812 destekli, hekimler ile mühendisleri 3D implant ve protez tasarımı için buluşturan B2B platform geliştiren biyoteknoloji girişiminde tek geliştirici ve proje ortağı (Emirhan Bozoğlan ve Abdüssamet Doğan ile).
- Maddeler:
  1. EN: Ship and maintain two separate products: Ceviz App (physician–engineer B2B platform, Flutter/Firebase) and Ceviz Viewer & Converter (a 30+ format 3D viewer & converter, planned as a standalone product and currently in testing).
     TR: İki ayrı ürünü geliştirip sürdürüyorum: Ceviz App (hekim–mühendis B2B platformu, Flutter/Firebase) ve Ceviz Viewer & Converter (30+ format destekli, bağımsız ürün olarak planlanan ve şu an test aşamasında olan 3D görüntüleyici/dönüştürücü).
  2. EN: Designed and implemented a DICOM anonymization pipeline in Python on Firebase (europe-west3) for KVKK/GDPR compliance on sensitive CT/MRI imaging.
     TR: Hassas BT/MR görüntüleri için KVKK/GDPR uyumu sağlayan, Firebase (europe-west3) üzerinde Python ile DICOM anonimleştirme hattı tasarlayıp geliştirdim.
  3. EN: Hand-coded the brand website in HTML5/CSS3 with a focus on performance and SEO, and shipped Ceviz App live on both Google Play and the App Store.
     TR: Marka web sitesini performans ve SEO odağıyla HTML5/CSS3 ile elle kodladım; Ceviz App'i hem Google Play hem App Store'da yayına aldım.
- Etiketler (yalnızca EN): Flutter, Firebase, Python, DICOM, KVKK/GDPR
- Link etiketi — EN: Read the case study / TR: Vaka çalışmasını oku

### 5.2 International ML Research Project / Uluslararası ML Araştırma Projesi
- Dönem — EN: 2026 — Upcoming / TR: 2026 — Yakında
- Rol — EN: Algorithm Development Lead / TR: Algoritma Geliştirme Lideri
- Tür — EN: Academic research / TR: Akademik araştırma
- Özet:
  - EN: Accepted onto an international machine learning research project at the invitation of Assoc. Prof. Dr. Bahar Çelik, where I'll lead algorithm development. It starts soon.
  - TR: Doç. Dr. Bahar Çelik'in davetiyle uluslararası bir makine öğrenmesi araştırma projesine kabul edildim; algoritma geliştirmeye liderlik edeceğim. Çalışma yakında başlayacak.
- Etiketler (yalnızca EN): Machine Learning, Python, Research

### 5.3 Gürok Group
- Dönem — EN: Jul — Aug 2026 / TR: Tem — Ağu 2026
- Rol — EN: Software Development Intern / TR: Yazılım Geliştirme Stajyeri
- Tür — EN: Internship / TR: Staj
- Özet:
  - EN: Summer software development internship at Gürok Group, a large industrial holding.
  - TR: Büyük bir sanayi holdingi olan Gürok Group'ta yaz dönemi yazılım geliştirme stajı.

### 5.4 Güral Porselen, Kütahya
- Dönem — EN/TR: 2025
- Rol — EN: Software Developer Intern / TR: Yazılım Geliştirme Stajyeri
- Tür — EN: Internship / TR: Staj
- Özet:
  - EN: Summer internship at one of Turkey's largest ceramics and porcelain manufacturers. Worked end-to-end on enterprise mobile app development with Flutter, Firebase and Figma — from UI design to backend service integration.
  - TR: Türkiye'nin en büyük seramik ve porselen üreticilerinden birinde yaz stajı. Flutter, Firebase ve Figma ile kurumsal mobil uygulama geliştirmede UI tasarımından backend servis entegrasyonuna kadar uçtan uca çalıştım.
- Etiketler (yalnızca EN): Flutter, Firebase, Figma

### 5.5 University of Salerno, Italy / Salerno Üniversitesi, İtalya
- Dönem — EN/TR: 2024
- Rol — EN: Erasmus+ Research Intern / TR: Erasmus+ Araştırma Stajyeri
- Tür — EN: Prior research experience / TR: Geçmiş araştırma deneyimi
- Özet:
  - EN: Spent 3 months in 2024 on the "Real-Time Face Tracking with Head-Mounted Displays" project, researching computer vision and extended reality (XR), and authored the project's technical report.
  - TR: 2024'te 3 ay boyunca "Real-Time Face Tracking with Head-Mounted Displays" projesinde bilgisayarlı görü ve genişletilmiş gerçeklik (XR) üzerine araştırma yaptım ve projenin teknik raporunu yazdım.
- Etiketler (yalnızca EN): Computer Vision, XR, Research
- Rapor indirme etiketi — EN: Download the internship report (PDF) / TR: Staj raporunu indir (PDF)

---

## 6. Projeler (/projects) — `projects/index.astro` + `projects.json`

**Sayfa:**
- Meta açıklama (yalnızca EN): Selected projects by İsmail Özyurt — Ceviz Biyoteknoloji (case study), Birth Adventure, Motivasyon Adam and more.
- Bölüm etiketi — EN: **Projects** / TR: **Projeler**
- Başlık — EN: **Things I've built and shipped.** / TR: **Geliştirdiğim ve yayınladığım işler.**
- "Diğer projeler" bölümü — EN: **More projects** / TR: **Diğer projeler**
- Liste kartı CTA — EN: **VIEW PROJECT** / TR: **PROJEYİ GÖR**

### 6.1 Öne çıkan kart — Ceviz Biyoteknoloji
- Etiket — EN: Featured case study / TR: Öne çıkan vaka çalışması
- Dönem — 2025 — EN: Present / TR: Devam ediyor
- EN: A TÜBİTAK-funded biotech startup where I'm the sole developer and a project partner. Two products, one DICOM anonymization pipeline, and a KVKK/GDPR-compliant path from CT/MRI to 3D implant design.
- TR: Tek geliştiricisi ve proje ortağı olduğum, TÜBİTAK destekli bir biyoteknoloji girişimi. İki ürün, bir DICOM anonimleştirme hattı ve BT/MR'dan 3D implant tasarımına KVKK/GDPR uyumlu bir yol.
- CTA — EN: Read the full case study / TR: Tam vaka çalışmasını oku

**Detay sayfası ortak metinleri (`projects/[slug].astro`):** Geri linki **All projects / Tüm projeler** · **VIEW REPO / REPOYU GÖR** · CTA'lar **Back to projects / Projelere dön**, **Get in touch / İletişime geç** · Mentor satırı: EN `Mentored by [ad] throughout the internship.` / TR `Staj boyunca [ad]'ın mentorluğunda çalıştım.`

### 6.2 Güral Porselen Personnel Information System / Güral Porselen Personel Bilgi Sistemi
- Dönem — 2025
- Ödül/etiket — EN: Built during the Güral Porselen internship / TR: Güral Porselen stajı sırasında geliştirildi
- Özet:
  - EN: A personnel information system mobile app built during my Güral Porselen internship — the first project that got me into mobile development. Developed end to end largely on my own, with very little AI assistance.
  - TR: Güral Porselen stajım sırasında geliştirdiğim bir personel bilgi sistemi mobil uygulaması — beni mobil geliştirmeye başlatan ilk proje. Çok az yapay zeka desteğiyle, büyük ölçüde kendi başıma, uçtan uca geliştirdim.
- Maddeler:
  1. EN: Handled sensitive employee data end to end: payroll for blue-collar staff, clock-in/clock-out logs, leave requests, and even daily cafeteria menus.
     TR: Hassas çalışan verilerini uçtan uca yönettim: mavi yaka personelin bordrosu, işe giriş-çıkış kayıtları, izin talepleri ve hatta günlük yemekhane menüleri.
- Mentor: **Oğuzhan Danış** (LinkedIn'e bağlı)
- Etiketler (yalnızca EN): Flutter, Firebase, Mobile
- Repo: github.com/theiozyurt/gural_porselen_personel_bilgi_sistemi

### 6.3 Birth Adventure
- Dönem — 2025
- Ödül/etiket — EN: Bronze Medal — 1IDEA 1WORLD International Competition / TR: Bronz Madalya — 1IDEA 1WORLD Uluslararası Yarışması
- Özet:
  - EN: My friends and I designed this game for a master's student in our university's Midwifery department, around her thesis project. The game itself was never fully completed; even so, the prototype won a bronze medal among 981 projects from 33 countries at the 1IDEA 1WORLD competition, organized by TÜMMİAD and Ankara Metropolitan Municipality. I played an active role in product design.
  - TR: Bu oyunu, üniversitemizin Ebelik bölümünden bir yüksek lisans öğrencisinin tez projesi için arkadaşlarımla birlikte tasarladık. Oyunun kendisi hiçbir zaman tam olarak tamamlanmadı; yine de prototip, TÜMMİAD ve Ankara Büyükşehir Belediyesi tarafından düzenlenen 1IDEA 1WORLD yarışmasında 33 ülkeden 981 proje arasında bronz madalya kazandı. Ürün tasarımında aktif rol aldım.
- Maddeler:
  1. EN: Designed with friends around a real academic thesis project in the Midwifery department — a rare cross-discipline collaboration.
     TR: Ebelik bölümündeki gerçek bir tez projesi için arkadaşlarımla birlikte tasarladık — disiplinler arası, ender bir iş birliği.
  2. EN: Won recognition despite being an unfinished prototype — a sign the core idea actually worked.
     TR: Tamamlanmamış bir prototip olmasına rağmen ödül aldı — temel fikrin karşılık bulduğunun bir işareti.
- Etiketler (yalnızca EN): Product design, Innovation

### 6.4 Motivasyon Adam
- Dönem — 2024
- Ödül/etiket — EN: Rehabilitation Game — Dumlupınar University collaboration / TR: Rehabilitasyon Oyunu — Dumlupınar Üniversitesi iş birliği
- Özet:
  - EN: This was a chance to contribute to Dumlupınar University's larger "Adım Robot" rehabilitation project. Ferzende Tekçe, one of the software developers on that project who I'd stayed in good contact with, asked if I knew of a game that could motivate patients while the machine regulated their walking during physical therapy. My friends and I built a simple one. It ended up not being used — it fell outside the project's budget — but the collaboration itself was the real win.
  - TR: Dumlupınar Üniversitesi'nin daha büyük "Adım Robot" rehabilitasyon projesine katkıda bulunma fırsatıydı. Projedeki yazılımcılardan, iletişimimi sürdürdüğüm Ferzende Tekçe, makine hastaların yürüyüşünü düzenlerken onları motive edecek bir oyun bilip bilmediğimi sordu. Arkadaşlarımla birlikte basit bir oyun geliştirdik. Proje bütçesinin dışında kaldığı için sonunda kullanılmadı; ama asıl kazanım iş birliğinin kendisiydi.
- Maddeler:
  1. EN: Built with friends in response to a real request from inside an active university rehabilitation project.
     TR: Aktif bir üniversite rehabilitasyon projesinden gelen gerçek bir talep üzerine arkadaşlarımla birlikte geliştirdik.
  2. EN: Not adopted due to budget constraints — an honest outcome, not a failure of the work itself.
     TR: Bütçe kısıtları nedeniyle kullanılmadı — çalışmanın bir başarısızlığı değil, dürüst bir sonuç.
- Etiketler (yalnızca EN): Game development, Health

---

## 7. Ceviz Vaka Çalışması (/projects/ceviz) — `projects/ceviz.astro`

- Meta açıklama (yalnızca EN): Case study: Ceviz Biyoteknoloji — a TÜBİTAK-funded biotech startup where İsmail Özyurt is Developer & Partner. Ceviz App, Ceviz Viewer & Converter, and a KVKK/GDPR DICOM anonymization pipeline.
- Geri linki — EN: All projects / TR: Tüm projeler
- Eyebrow — EN: Case study · Developer & Partner · 2025 — Present / TR: Vaka çalışması · Developer & Partner · 2025 — Devam ediyor
- Başlık: **Ceviz Biyoteknoloji**
- Giriş (intro):
  - EN: A TÜBİTAK-funded biotech startup building the bridge between physicians and engineers — from raw CT/MRI to a manufacturable 3D implant. I'm the sole developer and a project partner alongside Emirhan Bozoğlan and Abdüssamet Doğan.
  - TR: Hekimlerle mühendisler arasında köprü kuran, TÜBİTAK destekli bir biyoteknoloji girişimi — ham BT/MR'dan üretilebilir 3D implanta. Emirhan Bozoğlan ve Abdüssamet Doğan ile birlikte tek geliştirici ve proje ortağıyım.

**Hızlı bilgiler (facts):**
| EN | TR |
|---|---|
| My role → Developer & Partner (sole developer) | Rolüm → Developer & Partner (tek geliştirici) |
| Funding → TÜBİTAK 1501 & 1812 Industrial R&D | Destek → TÜBİTAK 1501 & 1812 Sanayi Ar-Ge |
| Domain → Medical imaging · 3D implants | Alan → Tıbbi görüntüleme · 3D implant |
| Stack → Flutter · Firebase · Python · DICOM | (aynı) |

**İki ürün (Two products / İki ürün):**
- Ürün 1 — Ceviz App
  - Alt satır — EN: B2B platform · Mobile + Web / TR: B2B platform · Mobil + Web
  - EN: A platform that connects hospitals and physicians with engineers for 3D implant and prosthetic design. Built with Flutter and Firebase, and live on both Google Play and the App Store.
  - TR: Hastaneleri ve hekimleri, 3D implant ve protez tasarımı için mühendislerle buluşturan bir platform. Flutter ve Firebase ile geliştirildi; hem Google Play hem App Store'da yayında.
  - Görsel etiketi: Ceviz App (alt: "Ceviz App splash ekranı")
- Ürün 2 — Ceviz Viewer & Converter
  - Alt satır — EN: 3D viewer & converter · Mobile + Web / TR: 3D görüntüleyici & dönüştürücü · Mobil + Web
  - EN: A separate 3D viewer and converter supporting 30+ formats, planned as a standalone product and currently in testing. It turns the messy reality of medical and 3D file formats into something a clinician or engineer can actually open and work with.
  - TR: 30+ format destekleyen, bağımsız ürün olarak planlanan ve şu an test aşamasında olan ayrı bir 3D görüntüleyici ve dönüştürücü. Tıbbi ve 3D dosya formatlarının karmaşasını, bir klinisyen ya da mühendisin gerçekten açıp çalışabileceği bir şeye dönüştürüyor.
  - Görsel etiketi: Ceviz Viewer & Converter (alt: "Ceviz Viewer & Converter splash ekranı")

**Ekran görüntüleri (Screenshots / Ekran görüntüleri):** galeri başlıkları `[ CEVIZ APP ]` ve `[ VIEWER & CONVERTER ]`

**Mühendislik derinliği (Engineering depth / Mühendislik derinliği):**
- Alt başlık — EN: The DICOM anonymization pipeline / TR: DICOM anonimleştirme hattı
  - EN: Patient CT and MRI scans arrive as DICOM files carrying identifying metadata. Before anything else can happen, that data has to be stripped and handled lawfully. I designed and implemented a Python pipeline running on Firebase (europe-west3) that anonymizes this imaging for KVKK/GDPR compliance — keeping the geometry clinicians need while removing the identity they don't.
  - TR: Hasta BT ve MR taramaları, kimlik bilgisi taşıyan meta verilerle birlikte DICOM dosyaları olarak geliyor. Başka hiçbir şey olmadan önce, bu veri hukuka uygun biçimde temizlenmeli. Bu görüntüleri KVKK/GDPR uyumu için anonimleştiren, Firebase (europe-west3) üzerinde çalışan bir Python hattı tasarlayıp geliştirdim — klinisyenlerin ihtiyaç duyduğu geometriyi korurken ihtiyaç duymadıkları kimliği kaldırıyor.
- Alt başlık — EN: Beyond the code / TR: Kodun ötesinde
  - EN: I also hand-coded the brand website in HTML5 and CSS3 — deliberately avoiding off-the-shelf WordPress components — with performance and SEO as first-class goals. As a project partner, engineering here isn't a task list; it's part of deciding what the product should be.
  - TR: Marka web sitesini de HTML5 ve CSS3 ile elle kodladım — hazır WordPress bileşenlerinden bilinçle kaçınarak — performans ve SEO'yu birincil hedef alarak. Proje ortağı olarak buradaki mühendislik bir görev listesi değil; ürünün ne olması gerektiğine karar vermenin bir parçası.

**Web siteleri (Websites / Web siteleri):**
- Başlık — EN: Three sites, hand-coded / TR: Üç site, elle kodlandı
- Giriş:
  - EN: Under the Ceviz Biyoteknoloji umbrella I hand-coded three separate websites in HTML5/CSS3 — free of off-the-shelf template constraints, with performance and SEO as first-class goals.
  - TR: Ceviz Biyoteknoloji çatısı altında üç ayrı web sitesini HTML5/CSS3 ile sıfırdan kodladım — hazır şablon kısıtlamalarından bağımsız, performans ve SEO odaklı.
- Kart 1: **Main site / Ana site** — cevizbiotech.com — EN: Brand & showcase site / TR: Marka ve tanıtım sitesi
- Kart 2: **Ceviz App** — cevizbiotech.com/app — EN: Physician–engineer B2B platform, web showcase / TR: Hekim-mühendis B2B platformu, web tanıtımı
- Kart 3: **Ceviz Viewer & Converter** — cevizbiotech.com/viewer — EN: 3D viewer/converter, web showcase / TR: 3D görüntüleyici/dönüştürücü, web tanıtımı
- Kart CTA'sı: **VISIT / SİTEYİ GÖR**

**Kapanış bandı:**
- Başlık — EN: Want the rest of the story? / TR: Hikâyenin devamını ister misin?
- CTA'lar: **See experience / Deneyime bak** · **Get in touch / İletişime geç**

---

## 8. Liderlik (/leadership) — `leadership/index.astro` + `leadership.json`

**Sayfa:**
- Meta açıklama (yalnızca EN): Community & leadership by İsmail Özyurt — founding president of KSBÜ Teknofest Club, Deneyap mentor, T3 Foundation scholar, and ÜNİDES project coordinator.
- Bölüm etiketi — EN: **Leadership** / TR: **Liderlik**
- Başlık — EN: **Community, at a realistic scale.** / TR: **Topluluk, gerçekçi bir ölçekte.**
- Alt metin — EN: No inflated titles — just roles I actually hold and what they've produced. / TR: Abartılı unvanlar yok — gerçekten üstlendiğim roller ve ortaya çıkardıkları işler.
- Kart CTA — EN: **View details** / TR: **Detayları gör**
- Detay sayfası: Geri linki + CTA **Back to leadership / Liderliğe dön** · **Get in touch / İletişime geç**

### 8.1 KSBÜ Teknofest Club / KSBÜ Teknofest Topluluğu
- Dönem — EN: 2024 — Present / TR: 2024 — Devam ediyor
- Rol — EN: Founding President / TR: Kurucu Başkan
- Özet:
  - EN: Founded and lead a student club at Kütahya Health Sciences University. It's young and still finding its feet — but there's real work behind it.
  - TR: Kütahya Sağlık Bilimleri Üniversitesi'nde bir öğrenci topluluğu kurdum ve yönetiyorum. Henüz yeni ve tanınırlığı sınırlı — ama arkasında gerçek işler var.
- Maddeler:
  1. EN: Organized a trip to the Milli Teknoloji Zirvesi at DEÜ İzmir with 38 participants.
     TR: DEÜ İzmir'deki Milli Teknoloji Zirvesi'ne 38 katılımcıyla bir gezi düzenledim.
  2. EN: Supported the GökTürk Tohumları team's entry to the TEKNOFEST Project Presentation Semi-Final — the Gök-Yeşil solar greenhouse project (team ID 756376).
     TR: GökTürk Tohumları takımının TEKNOFEST Proje Sunumu Yarı Final'ine katılımını destekledim — Gök-Yeşil solar sera projesi (takım ID 756376).

### 8.2 Deneyap Technology Workshops / Deneyap Teknoloji Atölyeleri
- Dönem — EN: 2024 — Present / TR: 2024 — Devam ediyor
- Rol — EN/TR: Mentor
- Özet:
  - EN: Technical mentor in Deneyap, a nationwide STEM program by the Ministry of Industry and Technology for gifted youth (ages 12–18). I guide students through hands-on projects and competition preparation in robotics, AI, software and electronics.
  - TR: Sanayi ve Teknoloji Bakanlığı'nın 12–18 yaş yetenekli gençlere yönelik ulusal STEM programı Deneyap'ta teknik mentor. Öğrencilere robotik, yapay zeka, yazılım ve elektronik alanlarında uygulamalı projeler ve yarışma hazırlığında rehberlik ediyorum.
- Maddeler:
  1. EN: Delivered training sessions on Software Technologies, Artificial Intelligence, and related topics to Deneyap students.
     TR: Deneyap öğrencilerine Yazılım Teknolojileri, Yapay Zeka ve ilgili konularda eğitimler verdim.

### 8.3 T3 Foundation / T3 Vakfı
- Dönem — EN: 2024 — Present / TR: 2024 — Devam ediyor
- Rol — EN: Scholar & Volunteer / TR: Bursiyer & Gönüllü
- Özet:
  - EN: Selected twice in a row for the T3 Foundation's "Sen Geleceksin" merit scholarship, among roughly 300 students nationwide each year. This scholarship is what makes both my Deneyap mentorship and my Teknofest Club presidency possible — it's the thread connecting the two. I also volunteer for the T3AI program, which brings AI education to cities across Turkey.
  - TR: T3 Vakfı'nın "Sen Geleceksin" başarı bursuna, her yıl yaklaşık 300 öğrenci arasından iki kez üst üste seçildim. Hem Deneyap'taki mentorluğumu hem de Teknofest Topluluğu başkanlığımı mümkün kılan da bu burs — ikisini birbirine bağlayan iplik. Ayrıca Türkiye genelinde yapay zeka eğitimi taşıyan T3AI programına gönüllü katkıda bulunuyorum.
- Maddeler:
  1. EN: Selected two consecutive years, among ~300 students nationwide each cycle.
     TR: Her dönem yaklaşık 300 öğrenci arasından, iki yıl üst üste seçildim.

### 8.4 ÜNİDES — Ministry of Youth & Sports / ÜNİDES — Gençlik ve Spor Bakanlığı
- Dönem — 2025
- Rol — EN: Project Coordinator / TR: Proje Koordinatörü
- Özet:
  - EN: Coordinated 'Göklerden Köylere' ('From the Skies to the Villages'), a rocket education project under ÜNİDES — a national grant program funding student-led social-impact initiatives — held in Çavdarhisar, Kütahya. I organized a model rocket event for primary school students there, and produced everything the program required: the final ÜNİDES report, social media content, and procurement specifications (şartname). I also coordinated the Digital Game Design and HealthNova AI program cycles under the same umbrella.
  - TR: Öğrenci öncülüğündeki sosyal etki girişimlerini fonlayan ulusal hibe programı ÜNİDES kapsamında, Kütahya'nın Çavdarhisar ilçesinde 'Göklerden Köylere' roket eğitimi projesini koordine ettim. Orada ilkokul öğrencileri için bir model roket etkinliği düzenledim ve programın gerektirdiği her şeyi hazırladım: ÜNİDES final raporu, sosyal medya içerikleri ve teknik şartnameler. Aynı çatı altında Digital Game Design ve HealthNova AI program döngülerini de yürüttüm.
- Maddeler:
  1. EN: Organized a hands-on model rocket event for primary school students in Çavdarhisar, Kütahya.
     TR: Kütahya Çavdarhisar'da ilkokul öğrencileri için uygulamalı bir model roket etkinliği düzenledim.
  2. EN: Produced the complete program documentation: final report, social media content, and procurement specifications.
     TR: Programın tüm dokümantasyonunu hazırladım: final raporu, sosyal medya içerikleri ve teknik şartnameler.

---

## 9. Hedefler (/goals) — `goals.astro`

- Meta açıklama:
  - EN: İsmail Özyurt on where this is going — building things that work end-to-end, and figuring out what shape that takes long-term.
  - TR: Bu işin nereye gittiğine dair düşüncelerim — bir fikri baştan sona gerçek bir ürüne dönüştürmek ve bunun uzun vadede alacağı şekil.
- Bölüm etiketi — EN: **Goals** / TR: **Hedefler**
- Başlık — EN: **Where this is going** / TR: **Bu nereye gidiyor**
- Ana metin (lead):
  - EN: I care about building things that work end-to-end — from an idea to something people actually use. That's what draws me to Ceviz Biyoteknoloji, to research, and to every project I take on. I'm still figuring out exactly where it leads long-term, but I know I want to keep building, leading, and learning what makes good products and teams work.
  - TR: Beni asıl motive eden şey, bir fikri baştan sona gerçek bir ürüne dönüştürmek — insanların gerçekten kullandığı bir şeye. Ceviz Biyoteknoloji'de, araştırmalarımda ve üstlendiğim her projede beni çeken şey bu. Bunun uzun vadede tam olarak nasıl bir şekil alacağını hâlâ keşfediyorum, ama inşa etmeye, liderlik etmeye ve iyi ürünlerin ve ekiplerin nasıl bir araya geldiğini öğrenmeye devam etmek istediğimi biliyorum.
- Vurgu (pull) — EN: **Build. Lead. Learn.** / TR: **Geliştir. Yönet. Öğren.**
- CTA'lar: **See what I'm building / Neler geliştirdiğime bak** · **Get in touch / İletişime geç**

---

## 10. CV (/cv) — `cv.astro` + `cv.json`

- Meta açıklama (yalnızca EN): Curriculum vitae of İsmail Özyurt — third-year Computer Engineering student, Developer & Partner at Ceviz Biyoteknoloji.
- Bölüm etiketi — EN: **CV** / TR: **Özgeçmiş**
- Rol satırı — EN: Third-year Computer Engineering student · Software Developer / TR: Üçüncü sınıf Bilgisayar Mühendisliği öğrencisi · Yazılım Geliştirici
- İletişim satırı: `{telefon} · {e-posta} · Kütahya, TR`
- Yazdır butonu — EN: Print / Save as PDF / TR: Yazdır / PDF olarak kaydet

**Bölüm başlıkları:**
| EN | TR |
|---|---|
| Summary | Özet |
| Experience | Deneyim |
| Education | Eğitim |
| Leadership & Community | Liderlik & Topluluk |
| Technical Skills | Teknik Beceriler |
| Languages | Diller |
| Certifications | Sertifikalar |

**Özet:**
- EN: Third-year Computer Engineering student at Kütahya Health Sciences University. Developer & Partner at Ceviz Biyoteknoloji (backed by TÜBİTAK 1501 and 1812), working on a B2B health-technology platform. Experienced in Flutter/Firebase mobile development, GDPR/KVKK compliance, and international research.
- TR: Kütahya Sağlık Bilimleri Üniversitesi'nde 3. sınıf Bilgisayar Mühendisliği öğrencisiyim. Ceviz Biyoteknoloji'de (TÜBİTAK 1501 ve 1812 destekli) geliştirici ve ortak olarak bir B2B sağlık teknolojisi platformu üzerinde çalışıyorum. Flutter/Firebase mobil geliştirme, GDPR/KVKK uyumluluğu ve uluslararası araştırma deneyimim var.

**Deneyim & Liderlik bölümleri:** özetler yukarıdaki Bölüm 5 (Deneyim) ve Bölüm 8 (Liderlik) ile aynı verilerden gelir.

**Eğitim:**
- Kayıt 1:
  - Dönem — EN: 2023 — Present / TR: 2023 — Devam ediyor
  - Derece — EN: B.Sc. Computer Engineering / TR: Bilgisayar Mühendisliği (Lisans)
  - Okul — EN: Kütahya Health Sciences University / TR: Kütahya Sağlık Bilimleri Üniversitesi
  - Not — EN: Third-year student. Admitted as the top-ranked student in the department. / TR: Üçüncü sınıf öğrencisiyim. Bölüme birincilikle girdim.
- Kayıt 2:
  - Dönem — EN: 2023 — Frozen / TR: 2023 — Donduruldu
  - Derece — EN: A.A.S. Foreign Trade / TR: Dış Ticaret (Ön Lisans)
  - Okul — EN: Anadolu University (Distance) / TR: Anadolu Üniversitesi (Açıköğretim)

**Teknik Beceriler (gruplar):**
| Grup (EN/TR) | İçerik |
|---|---|
| Mobile Development / Mobil Geliştirme | Flutter, Dart, GetX, Firebase (Firestore, Auth, Cloud Functions, Storage), Figma, App Store & Google Play publishing (yalnızca EN) |
| Programming / Programlama | Python, Java, Dart |
| Domains / Alanlar | AI/ML, Computer Vision, Extended Reality (XR), KVKK/GDPR Compliance (yalnızca EN) |
| Soft Skills / Kişisel Yetkinlikler | EN: Project management, team leadership, technical documentation, mentoring · TR: Proje yönetimi, ekip liderliği, teknik dokümantasyon, mentorluk |

**Diller:**
- Turkish / Türkçe — Native / Ana dil
- English / İngilizce — C2 — WLA Certified / C2 — WLA Sertifikalı
- Italian / İtalyanca — A1 / A1

**Sertifikalar (tüm dillerde aynı, tek çeviri farkı belirtildi):**
- Complete Flutter Bootcamp with Dart (2025)
- WLA English Certificate — C2 Level (2024) / WLA İngilizce Sertifikası — C2 Seviye (2024)
- Career Essentials in Generative AI — Microsoft & LinkedIn (2024)
- Data Science & Analytics — HP LIFE (2024)
- Strategic Planning — HP LIFE (2024)
- Financial Literacy Level 1 — SPL (2024)

---

## 11. İletişim (/contact) — `contact.astro`

- Meta açıklama (yalnızca EN): Get in touch with İsmail Özyurt — email, LinkedIn, or the contact form.
- Bölüm etiketi — EN: **Contact** / TR: **İletişim**
- Başlık — EN: **Let's talk.** / TR: **Konuşalım.**
- Ana metin:
  - EN: Building something, hiring, or just curious? The contact form is coming soon — for now, reach me directly through the channels on the left.
  - TR: Bir şey mi inşa ediyorsun, işe mi alıyorsun, yoksa sadece merak mı ettin? İletişim formu yakında aktif olacak — şimdilik soldaki kanallardan doğrudan ulaşabilirsin.

**Doğrudan kanallar (Direct / Doğrudan):** Email/E-posta · LinkedIn · GitHub · Ceviz Biyoteknoloji · Phone/Telefon · Location/Konum → Kütahya, Türkiye

**Form (Send a note / Not gönder):**
| Alan (EN/TR) | Placeholder (EN/TR) |
|---|---|
| Name / Ad Soyad | Your name / İsmin |
| Email / E-posta | mail@example.com / mail@ornek.com |
| Subject / Konu | What's it about? / Ne hakkında? |
| Message / Mesaj | Hi İsmail, … / Merhaba İsmail, … |
- Gönder butonu — EN: **Coming soon** / TR: **Yakında aktif**
- Form durum mesajı (gönderince):
  - EN: The contact form isn't live yet — it's coming soon. In the meantime, email me directly at {e-posta}.
  - TR: İletişim formu henüz aktif değil, yakında aktif olacak. Şimdilik doğrudan e-posta gönderebilirsin: {e-posta}.

---

## 12. 404 sayfası — `404.astro`

- Başlık (title, yalnızca EN): Not found
- Etiket: `404`
- Başlık — EN: **This page took a different path.** / TR: **Bu sayfa başka bir yola saptı.**
- Ana metin:
  - EN: The page you're after doesn't exist — or moved. Everything else is still one click away.
  - TR: Aradığın sayfa yok — ya da taşındı. Geri kalan her şey bir tık uzağında.
- CTA'lar: **Back home / Ana sayfaya dön** · **See projects / Projelere bak**

---

## 13. Ortak bileşen metinleri

- **Galeri (Gallery)** — boş durumda: EN: Images coming soon / TR: Görseller yakında eklenecek · Varsayılan başlık: `[ GALLERY ]`
- **MediaPlaceholder** etiketleri: "Ceviz App", "Ceviz Viewer & Converter"
- **Sık tekrar eden CTA'lar** (birçok sayfada): Get in touch / İletişime geç · Back to… / …dön

---

### Notlar
- **Etiketler / tag'ler** (Flutter, Firebase, Python, DICOM, Product design vb.) sitede her iki dilde de **İngilizce** gösterilir — teknoloji/alan adları olduğu için çevrilmez.
- **Meta açıklamalar**: Çoğu sayfanın `<meta description>`'ı yalnızca İngilizce'dir; yalnızca ana sayfa (`site.json`) ve `/goals` sayfasının ayrı bir Türkçe meta açıklaması vardır.
- **Marka/kurum adları** (Ceviz Biyoteknoloji, Ceviz App, Ceviz Viewer & Converter, Gürok Group, Güral Porselen, Deneyap, ÜNİDES, T3, TEKNOFEST vb.) çevrilmez.
- Ekran okuyucu (aria) ve terminal/boot metinleri arayüzde küçük rol oynar ama eksiksizlik için buraya dahil edilmiştir.
