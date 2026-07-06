# Ek Prompt — Renk Paleti Güncellemesi (Navy + Brass)

Bu dosya `PROJECT_BRIEF.md`'deki "Autumn Harvest" (kahverengi) paletinin YERİNE geçer. Eğer kahverengi paletle ilgili herhangi bir kod zaten yazıldıysa (tokens.css, component'lerdeki inline stiller vb.), aşağıdaki yeni palete göre GÜNCELLE — eski kahverengi değerlerini silip yenileriyle değiştir.

## Yeni palet: Navy + Brass

```css
:root {
  --bg-primary: #0F1A2E;      /* Ana zemin — koyu lacivert */
  --bg-primary-darker: #0A1220; /* Alternatif daha koyu bölüm zemini, kontrast için */
  --text-heading: #EDEFF3;    /* Başlıklar — kırık beyaz, yüksek kontrast */
  --text-body: #7C8CA6;       /* Gövde/ikincil metin — soğuk mavi-gri */
  --text-muted: #4C617F;      /* En düşük öncelikli metin (tarihler, etiketler) */
  --accent: #B08D4F;          /* İMZA rengi — pirinç/bronz. Buton, link, çizgi vurguları. AZ KULLAN, egemen olmasın */
  --border: #263A57;          /* Ayraç çizgileri, kenarlıklar */
  --tag-bg: #3A537A;          /* SADECE küçük etiket/badge arka planı, geniş alanda KULLANMA */
  --tag-text: #EDEFF3;        /* Tag üzerindeki metin */
}
```

## Neden bu değişiklik

Önceki kahverengi palet ("Autumn Harvest") tasarım prensiplerine (keskin köşeler, editorial kompozisyon, imza olarak az kullanım) rağmen istenmedi. Yeni yön: koyu lacivert otorite/güven hissi taşıyor, girişimci-kurumsal ciddiyete daha çok oturuyor. Soğuk ve mesafeli durmaması için sıcak bir pirinç/bronz vurgu (`--accent: #B08D4F`) ile dengelendi — tıpkı önceki paletteki gibi bu vurgu rengi de SADECE imza noktalarında (ince çizgi, buton, link hover) kullanılacak, geniş yüzeylerde değil.

## Değişmeyen kısımlar — DİKKAT

`PROJECT_BRIEF.md`'deki aşağıdaki kurallar AYNEN geçerli, sadece renk değerleri değişti:

- Keskin köşeler (`border-radius: 0`), rounded corner YOK
- Serif başlık fontu (Fraunces/Playfair Display) + monospace etiketler (JetBrains Mono/IBM Plex Mono) + Manrope gövde metni — font sistemi DEĞİŞMEDİ
- İnce çizgilerle bölünmüş grid kompozisyonu, gölgesiz düz yüzeyler — DEĞİŞMEDİ
- Sol kenarlıklı alıntı/vurgu blokları — DEĞİŞMEDİ
- Genel ilke: bu site bir AI/chatbot arayüzüne benzememeli — DEĞİŞMEDİ

## Yapılacaklar

1. `src/styles/tokens.css` içindeki eski kahverengi CSS değişkenlerini yukarıdaki yeni değerlerle değiştir
2. Eğer `Hero.astro` veya başka bir component'te renk değerleri inline/hardcoded yazıldıysa, onları da `var(--...)` referanslarına çevir (zaten tokens.css'ten okuyorsa ek işlem gerekmez)
3. Değişiklik sonrası `npm run dev` ile lokal önizlemede hero bölümünü kontrol et — başlık/metin kontrastının lacivert zemin üzerinde yeterli okunabilirlikte olduğunu doğrula
