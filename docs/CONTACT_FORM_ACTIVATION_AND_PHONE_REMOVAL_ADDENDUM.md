# Ek Prompt — İletişim Formunu Aktifleştir + Telefon Numarasını Kaldır

## 1. İletişim formunu gerçek backend'e bağla

Altyapı hazır:
- `ismail@ozyurt.dev` ve `contact@ozyurt.dev` — Cloudflare Email Routing ile kuruldu, ikisi de Gmail'e (`ismailozyurt96@gmail.com`) yönleniyor
- Resend hesabı açıldı, `ozyurt.dev` domaini doğrulandı (Cloudflare entegrasyonuyla DNS kayıtları otomatik eklendi)
- `RESEND_API_KEY` ortam değişkeni Cloudflare Pages projesinin **Settings → Environment variables** kısmına zaten eklendi

`CONTACT_FORM_ADDENDUM.md`'deki teknik spesifikasyonu (Cloudflare Pages Function `functions/api/contact.js`, Resend API çağrısı, frontend fetch mantığı, honeypot spam koruması) ŞİMDİ UYGULA/AKTİFLEŞTİR. Şu detayı netleştir:

- **"from" adresi:** `contact@ozyurt.dev` (form üzerinden gönderilen mailler bu adresten gidecek)
- **"to" adresi:** `ismail@ozyurt.dev` (form mesajları buraya düşecek, oradan da Gmail'e yönleniyor zaten)
- **reply_to:** formu dolduran kişinin girdiği e-posta (İsmail'in doğrudan yanıtlayabilmesi için, `CONTACT_FORM_ADDENDUM.md`'de zaten tanımlıydı)

Eğer proje daha önce statik siteye geri döndürülmüşse (`output: 'static'` — deploy sorunlarını çözerken yapılmıştı), bu formun çalışması için Cloudflare Pages Functions'ın aktif olması gerekiyor. Bu, Astro'nun `output: 'hybrid'` moduna ve `@astrojs/cloudflare` adapter'ına ihtiyaç duyabilir — eğer bu ayarlar kaldırılmışsa GERİ EKLENMESİ gerekecek. Bu sefer `wrangler.jsonc`/deploy command sorununu tekrar yaşamamak için: Cloudflare Pages dashboard'daki **Deploy command** alanının BOŞ kalması gerektiğini unutma (Pages Functions, `wrangler deploy` çalıştırmadan, standart Pages build akışıyla otomatik algılanır — `functions/` klasörü varlığı yeterlidir).

Form davranışı: kullanıcı gönderince sayfa yenilenmeden "Mesajın gönderildi, en kısa sürede dönüş yapacağım." onayı görünecek (TR), başarısız olursa yedek olarak `ismail@ozyurt.dev` adresi gösterilecek (bkz. `TR_CONTENT_AND_TODOS_ADDENDUM.md` madde 5 — bu metinler zaten tanımlıydı).

## 2. Telefon numarasını siteden TAMAMEN kaldır

CV'deki telefon numarası (+90 538 634 94 34) hiçbir yerde herkese açık olarak GÖRÜNMEYECEK. Aşağıdaki TÜM olası konumlar kontrol edilip temizlenecek:

- `src/data/cv.json` — telefon alanı varsa TAMAMEN SİLİNECEK (sadece görünürlükten kaldırma değil, veri olarak da kaldır)
- `/cv` sayfası (web görünümü) — telefon satırı kaldırılacak
- İndirilebilir CV PDF'i (eğer PDF de bu veriden üretiliyorsa, o da güncellenecek — üretilmiyorsa, kullanıcı ayrıca kendi PDF'ini güncelleyecek)
- `/contact` sayfası — iletişim linkleri arasında telefon YOK, sadece e-posta (`ismail@ozyurt.dev`), LinkedIn, GitHub kalacak
- Footer — telefon zaten yoktu muhtemelen, kontrol amaçlı tekrar bakılsın
- Herhangi bir yapısal veri/meta tag (schema.org JSON-LD kullanılıyorsa, orada da telefon alanı varsa kaldırılsın)

**Not:** İletişim için artık sadece e-posta (`ismail@ozyurt.dev`) yeterli — telefon numarası bilgisi kullanıcının kendi özel kullanımı için CV'nin fiziksel/PDF versiyonunda kalabilir ama SİTEDE YER ALMAYACAK.

## Teslim

Bu iki değişiklik sonrası `npm run dev` ile hem formun (test ortamında en azından frontend davranışının) hem de `/cv` ve `/contact` sayfalarında telefon numarasının gerçekten kaybolduğu doğrulanacak.
