# Ek Prompt — macOS Terminal Splash + TR Metin Düzeltmesi + Mobil Sağlamlaştırma

## 1. Splash ekranı — gerçek macOS terminal penceresi

`SPLASH_SCREEN_ADDENDUM.md`'deki splash mantığı (boot satırları, skip butonu, sessionStorage, reduced-motion desteği) AYNEN kalıyor. SADECE görsel stil değişiyor: artık Navy+Brass değil, gerçek bir macOS terminal penceresi görünümü.

**ÖNEMLİ:** Bu stil DEĞİŞİKLİĞİ SADECE splash ekranına özgü. Splash kapandıktan sonra site Navy+Brass kimliğine geçiyor — sitenin geri kalanı DEĞİŞMİYOR. Bu bilinçli bir kontrast: splash "tanıdık bir terminal" hissi veriyor, asıl site kendine has kimliğini gösteriyor.

### Görsel yapı

```html
<div id="splash-screen" class="splash-backdrop">
  <div class="terminal-window">
    <div class="terminal-titlebar">
      <div class="terminal-dots">
        <span class="dot dot-red"></span>
        <span class="dot dot-yellow"></span>
        <span class="dot dot-green"></span>
      </div>
      <div class="terminal-title">ismail@ozyurt — zsh — 80×24</div>
    </div>
    <div class="terminal-body" id="splash-lines"></div>
  </div>
  <button class="splash-skip" id="splash-skip">[ SKIP ]</button>
</div>
```

```css
.splash-backdrop {
  position: fixed;
  inset: 0;
  background: #000000; /* TAM SİYAH, sadece splash'e özgü */
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.terminal-window {
  width: min(680px, 90vw);
  background: #1e1e1e;
  border-radius: 8px; /* macOS pencere görünümü için istisna — sadece bu bileşende */
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,.6);
  font-family: var(--font-mono);
}
.terminal-titlebar {
  background: #2d2d2d;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
}
.terminal-dots { display: flex; gap: 8px; }
.dot { width: 12px; height: 12px; border-radius: 50%; }
.dot-red { background: #ff5f57; }
.dot-yellow { background: #febc2e; }
.dot-green { background: #28c840; }
.terminal-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  color: #8a8a8a;
  font-size: 12px;
}
.terminal-body {
  background: #000000;
  padding: 20px 24px;
  min-height: 220px;
  font-size: 14px;
  line-height: 1.9;
  color: #d4d4d4;
}
.splash-line { opacity: 0; animation: splash-fade-in .3s ease forwards; }
.splash-line.done { color: #6a6a6a; }
.splash-line.current { color: #4ade80; } /* terminal yeşili, splash'e özgü */
.splash-line .checkmark { color: #4ade80; margin-right: 8px; }
.splash-line .prompt { color: #569cd6; margin-right: 6px; } /* '>' işareti için mavi ton, gerçek terminal hissi */
@keyframes splash-fade-in { to { opacity: 1; } }
.splash-skip {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: #6a6a6a;
  font-family: var(--font-mono);
  font-size: 12px;
  cursor: pointer;
}
.splash-skip:hover { color: #4ade80; }
.splash-backdrop.fade-out { animation: splash-fade-out .5s ease forwards; }
@keyframes splash-fade-out { to { opacity: 0; visibility: hidden; } }
```

JS mantığı (`SPLASH_SCREEN_ADDENDUM.md`'deki `runSplash()`, `finishSplash()`, sessionStorage kontrolü) AYNEN kullanılacak, sadece satır render'ında `<span class="prompt">&gt;</span>` eklenmesi ve renk sınıflarının yukarıdaki terminal paletine göre olması yeterli.

**Not:** `border-radius: 8px` (pencere köşesi) ve `border-radius: 50%` (trafik ışığı noktaları) burada kullanılıyor — bu, sitenin genelindeki "keskin köşe" kuralına bilinçli bir istisna, çünkü amaç gerçek bir macOS penceresi taklidi. Splash dışında hiçbir yerde bu yumuşak köşeler kullanılmayacak.

## 2. TR boot satırları — düzeltilmiş, daha az robotik

`SPLASH_SCREEN_ADDENDUM.md`'deki `bootLinesTR` dizisi AŞAĞIDAKİYLE DEĞİŞTİR — komut fiilleri (loading, mounting, connecting, importing, compiling, syncing) İNGİLİZCE bırakılıyor, sadece açıklama kısmı Türkçe. Gerçek bir yazılımcının terminal diliyle yazacağı gibi, birebir çeviri değil:

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

**Genel kural (ileride eklenecek tüm TR metinler için geçerli):** Terminal/kod bağlamındaki komut kelimeleri (loading, building, syncing, importing vb.) Türkçeye çevrilmeyecek — bu bağlamda İngilizce kalmaları daha doğal ve gerçekçi. Sadece insan diliyle okunan açıklama/başlık metinleri (hero headline, subtext, goals sayfası içeriği) tam Türkçe ve doğal cümle yapısıyla yazılacak.

## 3. Mobil sağlamlaştırma — genel düzeltmeler

Kullanıcı bazı ekranlarda mobil bozulma bildirdi, kesin ekran görüntüsü bekleniyor. O gelene kadar aşağıdaki genel kurallar tüm sayfalara uygulanacak:

- **Hero grid:** `grid-template-columns: 1.1fr 1fr` (fotoğraflı iki kolonlu düzen) mobilde (`max-width: 768px`) `grid-template-columns: 1fr` olarak tek kolona düşecek, fotoğraf metnin ÜSTÜNDE gösterilecek (`order: -1`).
- **Ghost number:** `font-size: 140px` mobilde orantısız büyük kalıyor — `max-width: 768px` altında `font-size: 60px` gibi bir değere düşürülecek, taşma olmaması için `overflow: hidden` container'da zaten var ama boyut da küçültülmeli.
- **Terminal splash penceresi:** `width: min(680px, 90vw)` zaten mobil uyumlu ama `.terminal-body` içindeki `font-size: 14px` küçük ekranlarda `12px`'e düşürülebilir, satır kaymalarını önlemek için.
- **Hero CTA satırı:** `[ SEE MY WORK ]_` ve `[ GET IN TOUCH ]` yan yana duruyor, dar ekranlarda `flex-wrap: wrap` ile alt alta düşmeli, aralarında yeterli boşluk (`gap: 16px`) korunmalı.
- **Hero strip (now/before/ahead):** 3 kolonlu grid mobilde tek kolona düşmeli (`grid-template-columns: 1fr`), her `strip-item` arası `border-bottom` ile ayrılmalı (şu anki `border-right` yatay ayraç yerine).
- **Genel test:** `npm run dev` sonrası tarayıcı dev tools'ta 375px (iPhone SE), 390px (iPhone 12/13/14), ve 768px (tablet) genişliklerinde her sayfa manuel kontrol edilmeli.

Kullanıcı hangi ekranda/bölümde tam olarak neyin bozulduğunu (ekran görüntüsüyle) paylaştığında, bu bölüme ek, nokta atışı bir düzeltme talimatı ayrıca verilecek.
