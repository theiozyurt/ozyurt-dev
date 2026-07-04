# Ek Prompt — Hero Metni Güncellemesi + Arka Plan Animasyonu

Bu dosya iki ayrı değişikliği birlikte tanımlar. İkisi de bağımsız uygulanabilir ama aynı anda verildiği için tek dosyada.

## 1. Hero metni güncellemesi

Önceki hero başlığı ("My goal was never to be known as an engineer or a researcher...") çok dışlayıcı bulundu — mühendis/araştırmacı arayan işverenlere/İK'lara yanlış sinyal veriyor, "bu kişi burada uzun kalmaz" hissi yaratıyordu. Eğer bu metin zaten koda geçirildiyse, aşağıdaki yeni versiyonla DEĞİŞTİR:

**EN (yeni, kullan):**
> This is where I document the journey — from Ceviz Biyoteknoloji to international research — every step building toward something of my own. Take a look.

**TR (yeni, kullan):**
> Burası benim yolculuğumu belgelediğim yer — Ceviz Biyoteknoloji'den uluslararası araştırmaya kadar, her adım kendi işime giden yolda bir basamak. Göz atmaya değer.

**Neden değişti:** Yeni versiyon "davet eden" bir çerçeve kuruyor (journey/keşif), dışlayıcı bir iddiayla açılmıyor, ama girişimcilik motivasyonu hâlâ örtük olarak taşınıyor. Asıl "kendi şirketimi kurmak" hedefi hero'nun altındaki 3'lü strip'te (now/before/ahead bölümünde "ahead — a company of my own" satırıyla) zaten net şekilde görünüyor, o kısım DEĞİŞMİYOR.

Hero başlığı artık bir alıntı/iddia tonunda değil, bir davet tonunda okunmalı — `<h1>` etiketi ve `border-left` vurgu stili aynı kalabilir (madde 3.5, `PROJECT_BRIEF.md`), sadece metin içeriği değişiyor.

## 2. Arka plan animasyonu — seyrek pixel parıltısı

Sitenin genelinde (en azından ana sayfa hero'sunda, ideal olarak diğer sayfaların üst bölümlerinde de) çok seyrek, düşük yoğunluklu bir "twinkle" animasyonu eklenecek. Amaç: sayfanın "canlı" hissetmesi ama dikkat dağıtmaması.

### Uygulama

```css
@keyframes pixel-twinkle {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
.pixel-dot {
  position: absolute;
  width: 3px;
  height: 3px;
  background: var(--accent); /* Navy+Brass paletinden #B08D4F */
  animation: pixel-twinkle 3s ease-in-out infinite;
  pointer-events: none;
}
```

Noktalar JS ile üretilecek (sabit HTML değil), böylece ekran boyutuna göre dağılım orantılı kalır:

```js
function generatePixelDots(container, count = 15) {
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    dot.className = 'pixel-dot';
    dot.style.top = `${Math.random() * 100}%`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.animationDelay = `${Math.random() * 3}s`;
    container.appendChild(dot);
  }
}
```

### Kurallar

- **Yoğunluk:** Section/container başına 12-20 nokta arası, ASLA daha fazla — yoğun olursa "kar yağışı" gibi görünür, dikkat dağıtır.
- **Konum:** Container'ın `position: relative; overflow: hidden;` olması gerekiyor, noktalar `position: absolute` ile onun içine yerleştirilir. İçerik (metin, butonlar) `position: relative; z-index: 1` ile noktaların üstünde kalmalı.
- **Renk:** Sadece `--accent` (bronz/pirinç, `#B08D4F`) rengi kullanılacak, başka renk yok.
- **Boyut:** 2-4px arası kare noktalar, büyük olmayacak.
- **Süre:** Her nokta 3 saniyelik bir döngüde yanıp sönüyor, ama `animationDelay` rastgele olduğu için hepsi senkronize yanıp sönmüyor — organik bir dağılım oluşuyor.
- **Erişilebilirlik — ZORUNLU:** `prefers-reduced-motion: reduce` medya sorgusu tespit edilirse animasyon tamamen kapatılacak:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .pixel-dot { animation: none; opacity: .3; }
  }
  ```
- **Performans:** Bu saf CSS animasyonu, JS sürekli hesaplama yapmıyor (sadece sayfa yüklenirken bir kere nokta konumları üretiliyor). Ekstra kütüphane/canvas gerekmiyor.

### Nerede kullanılacak

- Ana sayfa hero'su — zorunlu
- `/experience`, `/projects`, `/leadership` sayfalarının üst (hero benzeri) bölümleri — önerilir, tutarlılık için
- Kart içleri, form alanları gibi küçük/yoğun bileşenlerde KULLANILMAYACAK — sadece büyük, açık zeminli section'larda
