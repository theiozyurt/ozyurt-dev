# Ek Prompt — TR Metin Tutarlılığı: Birinci Tekil Şahıs + Mütevazı Ton (SİTE GENELİ, KAPSAMLI TARAMA)

## Sorun

Sitedeki Türkçe metinler farklı zamanlarda, farklı alışkanlıklarla yazıldığı için tutarsız: bazı cümleler birinci tekil şahıs ("geliştiriyorum", "kurdum"), bazıları üçüncü tekil şahıs ("okuyor", "çalışıyor" — CV'lerdeki gibi öznesiz/resmi anlatım alışkanlığından kalma). Ayrıca bazı yerlerde İngilizce'den birebir çeviri kokusu var (kelime sırası, bağlaç kullanımı doğal Türkçe değil).

## KURAL — istisnasız uygulanacak

1. **Sitedeki TÜM birinci taraf içerik (hero, goals, projects, experience, leadership, cv özeti, site meta açıklaması, footer) BİRİNCİ TEKİL ŞAHIS olacak.** ("okuyorum", "çalışıyorum", "kurdum", "geliştirdim" — "okuyor", "çalışıyor", "kurdu", "geliştirdi" DEĞİL.)
2. **İSTİSNA:** Başkalarının söylediği alıntılar (Testimonials/referans mektupları — `TESTIMONIALS_ADDENDUM.md`) DOĞAL OLARAK üçüncü şahıs kalacak, çünkü onlar gerçekten başka birinin ağzından — bu değişmiyor, karıştırılmayacak.
3. **Ton mütevazı olacak.** Abartı/özel-övgü sıfatları ("harika", "mükemmel", "başarılı bir şekilde", "etkileyici") KULLANILMAYACAK. Bunun yerine somut, sakin, faktüel bir anlatım tercih edilecek — başarı zaten anlatılan olgudan (madalya, TÜBİTAK desteği, 3 site vb.) görülüyor, ekstra sıfatla süslenmesine gerek yok.
4. **Birebir çeviri YOK, yeniden yazım VAR.** İngilizce cümlenin yapısını (özne-yüklem sırası, bağlaç kullanımı) taklit etmek yerine, aynı anlamı bir Türk'ün doğal olarak kuracağı cümleyle ifade et. (Bu kural zaten `TR_CONTENT_AND_TODOS_ADDENDUM.md`'de vardı, burada yeniden ve daha kapsamlı vurgulanıyor.)

## Bilinen hatalı örnekler — düzeltme

### site.json (description) — `FOUNDER_LANGUAGE_CLEANUP_ADDENDUM.md`'den

**Hatalı (üçüncü şahıs):**
> "İsmail Özyurt — Kütahya Sağlık Bilimleri Üniversitesi'nde Bilgisayar Mühendisliği okuyor, Ceviz Biyoteknoloji'de geliştirici ve ortak olarak çalışıyor."

**Düzeltilmiş (birinci şahıs, mütevazı):**
> "Kütahya Sağlık Bilimleri Üniversitesi'nde Bilgisayar Mühendisliği okuyorum. Ceviz Biyoteknoloji'de geliştirici ve ortak olarak çalışıyorum."

### cv.json (özet) — aynı dosyadan

**Hatalı (üçüncü şahıs):**
> "Kütahya Sağlık Bilimleri Üniversitesi'nde 3. sınıf Bilgisayar Mühendisliği öğrencisi. Ceviz Biyoteknoloji'de (TÜBİTAK 1501 destekli) geliştirici ve ortak olarak B2B bir sağlık teknolojisi platformu üzerinde çalışıyor. Flutter/Firebase mobil geliştirme, GDPR/KVKK uyumluluğu ve uluslararası araştırma deneyimine sahip."

**Düzeltilmiş (birinci şahıs, mütevazı, CV üslubunu koruyarak):**
> "Kütahya Sağlık Bilimleri Üniversitesi'nde 3. sınıf Bilgisayar Mühendisliği öğrencisiyim. Ceviz Biyoteknoloji'de (TÜBİTAK 1501 ve 1812 destekli) geliştirici ve ortak olarak bir B2B sağlık teknolojisi platformu üzerinde çalışıyorum. Flutter/Firebase mobil geliştirme, GDPR/KVKK uyumluluğu ve uluslararası araştırma deneyiminim var."

**Not:** CV'lerde öznesiz/telegraf tarzı ("... öğrencisi. ... çalışıyor.") İngilizce CV geleneğinde normaldir ama Türkçede üçüncü şahıs gibi okunuyor ve tutarsızlık yaratıyor — bu yüzden CV özeti bile birinci şahıs tam cümlelerle yazılacak.

## Kapsamlı tarama gerekiyor

Bu iki örnek dışında, aşağıdaki TÜM dosyalarda aynı hata olup olmadığı TEK TEK kontrol edilecek:

- `src/data/projects.json` (Ceviz, Güral Porselen, Birth Adventure, Motivasyon Adam açıklamaları)
- `src/data/experience.json`
- `src/data/leadership.json` (Teknofest Club, Deneyap, T3, ÜNİDES açıklamaları)
- `src/pages/goals.astro` içeriği
- `src/pages/index.astro` (hero, overview cümlesi)
- Footer metni
- Contact sayfası metinleri

**Kontrol yöntemi:** Her TR cümlede fiil çekimini kontrol et — "-yor", "-dı", "-mış" gibi ekler "-um/-im/-üm" (birinci tekil) ile mi bitiyor yoksa öznesiz/üçüncü tekil mi? Örnek: "geliştirdi" (o geliştirdi) YANLIŞ → "geliştirdim" (ben geliştirdim) DOĞRU. "kurdu" YANLIŞ → "kurdum" DOĞRU. "yönetiyor" YANLIŞ → "yönetiyorum" DOĞRU.

**Bu tarama sonucunda düzeltilen HER cümle, aynı zamanda madde 3-4'teki mütevazı ton ve doğal Türkçe kurallarından da geçirilecek** — sadece fiil çekimini düzeltmek yetmez, cümlenin genelinin doğal okunup okunmadığı da gözden geçirilecek.

## Önceki içerik zenginleştirmesiyle ilişki

`CONTENT_ENRICHMENT_AND_GOALS_FONT_ADDENDUM.md`'de yeni eklenen TR metinler (Güral, Birth Adventure, Motivasyon Adam, Deneyap, T3, ÜNİDES) bu addendum'dan ÖNCE yazıldı — onlar da bu YENİ kurala göre TEKRAR GÖZDEN GEÇİRİLECEK. Örnek kontrol: "Bu oyun ... tez projesi için tasarlanan bir konsept olarak başladı" — bu cümle öznesiz/edilgen bir yapı kullanıyor, "başladı" doğru ama cümlenin geneli çeviri kokuyor olabilir, gerekirse "Bu oyunu ... tez projesi için tasarladım" gibi daha aktif/birinci şahıs bir yapıya çevrilebilir.

## Teslim

Bu tarama ve düzeltme bittikten sonra, değiştirilen TÜM cümlelerin ÖNCESİ/SONRASI karşılaştırmalı bir tablo (daha önceki "girişimci ifadeleri" düzeltmesinde yapıldığı gibi) rapor olarak verilsin — böylece İsmail ve Claude (sohbet) hepsini tek tek gözden geçirip onaylayabilir.
