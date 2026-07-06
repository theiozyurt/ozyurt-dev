# Ek Prompt — Ekip/Bireysel Ayrımı Düzeltmesi + Kalıcı Öz-Denetim Kuralı

## Bölüm A — Somut düzeltme: Birth Adventure ve Motivasyon Adam EKİP İŞİYDİ

Bu iki proje **arkadaşlarla birlikte** yapıldı, kullanıcı TEK BAŞINA yapmadı. Şu ana kadarki metinlerde bazı cümleler "ben" (tekil) diliyle yazılmış — bunlar "biz/arkadaşlarımla" (çoğul/ekip) diline çevrilecek. Kullanıcının kendi özel katkısı (örneğin ürün tasarımı) varsa o kısım tekil kalabilir, ama "geliştirdim/tasarladım" gibi ekibin ortak ürettiği işler "geliştirdik/tasarladık" olacak.

### Birth Adventure — summary

**Eski:**
> "Bu oyunu, üniversitemizin Ebelik bölümünden bir yüksek lisans öğrencisinin tez projesi için tasarladım. Oyunun kendisi hiçbir zaman tam olarak bitmedi; yine de prototip, TÜMMİAD ve Ankara Büyükşehir Belediyesi'nin düzenlediği 1IDEA 1WORLD yarışmasında 33 ülkeden 981 proje arasında bronz madalya kazandı."

**Yeni:**
> "Bu oyunu, üniversitemizin Ebelik bölümünden bir yüksek lisans öğrencisinin tez projesi için arkadaşlarımla birlikte tasarladık. Oyunun kendisi hiçbir zaman tam olarak bitmedi; yine de prototip, TÜMMİAD ve Ankara Büyükşehir Belediyesi'nin düzenlediği 1IDEA 1WORLD yarışmasında 33 ülkeden 981 proje arasında bronz madalya kazandı. Ürün tasarımında aktif rol aldım."

(Not: Son cümle ["Ürün tasarımında aktif rol aldım"] tekil kalıyor çünkü bu, ekip içindeki kullanıcının KENDİ özel katkısı — genel geliştirme "biz", spesifik rol "ben".)

### Birth Adventure — points

**Eski:**
> "Ebelik bölümünden gerçek bir tez projesi için tasarladım; disiplinler arası, az rastlanan bir iş birliğiydi."

**Yeni:**
> "Ebelik bölümünden gerçek bir tez projesi için arkadaşlarımla birlikte tasarladık; disiplinler arası, az rastlanan bir iş birliğiydi."

(İkinci point ["Tamamlanmamış bir prototip olmasına rağmen..."] değişmiyor, zaten kişi belirtmiyor.)

### Motivasyon Adam — points

**Eski:**
> "Üniversitenin yürüttüğü bir rehabilitasyon projesinden gelen gerçek bir talep üzerine bu oyunu geliştirdim."

**Yeni:**
> "Üniversitenin yürüttüğü bir rehabilitasyon projesinden gelen gerçek bir talep üzerine bu oyunu arkadaşlarımla birlikte geliştirdik."

(Motivasyon Adam summary'sindeki "Arkadaşlarımla birlikte basit bir oyun geliştirdik" cümlesi zaten doğru ekip diliyle yazılmıştı, DOKUNMA.)

---

## Bölüm B — KALICI KURAL: bireysel/ekip ayrımını her zaman kontrol et

Bu, tek seferlik bir düzeltme değil — sitede İÇERİK YAZILDIĞI/DÜZENLENDİĞİ HER SEFERDE uygulanması gereken bir süreç kuralı.

### Kural

Her proje/deneyim/liderlik girdisi için, iddia edilen eylemin GERÇEKTEN tekil mi yoksa ekip işi mi olduğunu bilinen gerçeklerle çapraz kontrol et, ve zamiri/fiil çekimini buna göre seç:

- **Bilinen TEKİL (bireysel) işler:** Ceviz Biyoteknoloji'deki geliştirme (kullanıcı "tek geliştirici"), Güral Porselen Personel Bilgi Sistemi ("büyük ölçüde kendi başına, çok az yapay zeka desteğiyle" — tekil), Erasmus/Salerno araştırması (bireysel staj).
- **Bilinen EKİP işleri:** Birth Adventure (arkadaşlarla), Motivasyon Adam (arkadaşlarla), Ceviz'in genel varlığı/ortaklığı (Emirhan Bozoğlan ve Abdüssamet Doğan ile birlikte — ama kullanıcının kod yazma kısmı tekil, iş ortaklığı çoğul: "İki ürün geliştiriyoruz" değil "Emirhan ve Abdüssamet ile ortağım, ama geliştirmeyi ben yapıyorum" ayrımı korunacak).
- **Liderlik/koordinatörlük rolleri (KSBÜ Teknofest Topluluğu, ÜNİDES, Deneyap mentorluğu):** Bunlar doğası gereği "ben yönetiyorum/koordine ediyorum/mentorluk yapıyorum" tekil kalabilir — bir topluluğu YÖNETMEK bireysel bir rol tanımı, içindeki üyelerin çokluğu bunu değiştirmez. Ama topluluğun ürettiği somut bir çıktıdan bahsederken (örneğin "GökTürk Tohumları takımı X'i yaptı") o takımın öznesi doğru seçilmeli (kullanıcı değil, o takım).

### Uygulama süreci

1. Herhangi bir proje/deneyim/liderlik metni yazılmadan/düzenlenmeden ÖNCE, o girdinin bireysel mi ekip işi mi olduğunu (yukarıdaki bilinen listeden ya da `PROJECT_BRIEF.md`/diğer addendum'lardaki bağlamdan) tespit et.
2. Tespit belirsizse, metni yazmadan önce İsmail'e sohbette sor ("Bu proje bireysel mi yoksa ekip işi miydi?") — YANLIŞ VARSAYIMLA YAZMA.
3. İçerik yazıldıktan/düzenlendikten SONRA, TÜM projects.json, experience.json, leadership.json dosyalarını TEK TEK tara ve her cümlede özne/fiil çekiminin (ben/biz, -dim/-dik) o girdinin gerçek bireysel/ekip doğasıyla eşleşip eşleşmediğini kontrol et.
4. Bulunan HER tutarsızlığı (bu promptta listelenenler dışında da olsa) düzelt ve DEĞİŞİKLİK RAPORU'na ekle.

### Teslim formatı (her içerik değişikliğinde geçerli, kalıcı kural)

Her içerik güncellemesi sonunda, değiştirilen TÜM cümlelerin "eski → yeni" karşılaştırmalı bir listesi verilecek — bu listede SADECE bu promptta açıkça istenenler değil, taramada kendiliğinden bulunan EK düzeltmeler de (varsa) ayrı bir "Ek olarak bulunan ve düzeltilen hatalar" başlığı altında gösterilecek.

## Bölüm C — genel hatırlatma

Bu kural, önceki `TR_VOICE_CONSISTENCY_ADDENDUM.md`'deki "birinci/üçüncü şahıs" kontrolüyle BİRLİKTE çalışıyor — o dosya "ben mi o mu" sorusuna, bu dosya "ben mi biz mi" sorusuna bakıyor. İkisi de aynı taramanın parçası olarak birlikte uygulanabilir.
