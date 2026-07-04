# Ek Prompt — Splash / Boot Ekranı

Site ilk açıldığında (her sayfa yüklemesinde değil, ilk ziyarette) kısa bir "boot sequence" ekranı gösterilecek, ardından otomatik olarak ana sayfaya (hero) geçilecek.

## Neden bu yaklaşım

Gerçek kurum logoları (Teknofest, Deneyap, KSBÜ, Gürok Group, Güral Porselen, Salerno Üniversitesi) telif/marka izni gerektirdiği için KULLANILMIYOR — bunun yerine tamamen tipografik, terminal/boot ekranı estetiğinde bir "sistem başlatma" animasyonu kullanılıyor. Bu hem telif riskini sıfırlıyor hem de zaten kurulu pixel/terminal kimliğine (Geist Mono, `[ ]_` dili) birebir oturuyor. İstisna: Ceviz Biyoteknoloji logosu kullanılabilir (kullanıcı o şirketin proje ortağı), ama bu ekranda logo değil, diğerleriyle tutarlı olması için o da metin satırı olarak kalıyor.

## İçerik sıralaması — ÖNEMLİ

Satırlar bir CV özeti gibi işlev görecek: kısa, öz, ne çok uzun ne çok kısa. Sıralama ÖNCELİK sırasına göre: önce Ceviz ve stajlar (somut, güncel, iş deneyimi), SONRA topluluk/mentorluk (Teknofest, Deneyap — bunlar daha düşük öncelikli, sona bırakılıyor).

```js
const bootLines = [
  "booting ismail-ozyurt.dev...",
  "loading: ceviz_biyoteknoloji — developer & partner",
  "mounting: gurok_group — software internship",
  "connecting: gural_porselen — mobile dev internship",
  "importing: salerno_research — computer vision, 2024",
  "compiling: ksbu — computer engineering, 3rd year",
  "syncing: teknofest_topluluk + deneyap_mentor",
  "ready."
];
```

TR versiyonu (dil tercihine göre gösterilecek):
```js
const bootLinesTR = [
  "ismail-ozyurt.dev başlatılıyor...",
  "yükleniyor: ceviz_biyoteknoloji — geliştirici & ortak",
  "bağlanıyor: gurok_group — yazılım stajı",
  "bağlanıyor: gural_porselen — mobil geliştirme stajı",
  "içe aktarılıyor: salerno_araştırma — görüntü işleme, 2024",
  "derleniyor: ksbu — bilgisayar mühendisliği, 3. sınıf",
  "senkronize ediliyor: teknofest_topluluğu + deneyap_mentörlüğü",
  "hazır."
];
```

**Not:** 8 satır — çok uzun değil (5-6 saniyede tamamlanır), çok kısa da değil (CV'nin ana hatlarını kapsıyor). Ceviz ve stajlar en başta, akademik araştırma ortada, topluluk/mentorluk en sonda — kullanıcının önceliklendirmesine göre.

## Görsel yapı

```html
<div id="splash-screen" class="splash">
  <div class="splash-lines" id="splash-lines"></div>
  <button class="splash-skip" id="splash-skip">[ SKIP ]</button>
</div>
```

```css
.splash {
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem;
  font-family: var(--font-mono);
}
.splash-lines {
  font-size: 14px;
  color: var(--text-body);
  line-height: 2;
}
.splash-line {
  opacity: 0;
  animation: splash-fade-in .3s ease forwards;
}
.splash-line.done { color: var(--text-muted); }
.splash-line.current { color: var(--accent); }
.splash-line .checkmark { color: var(--accent); margin-right: 8px; }
@keyframes splash-fade-in {
  to { opacity: 1; }
}
.splash-skip {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 12px;
  cursor: pointer;
}
.splash-skip:hover { color: var(--accent); }
.splash.fade-out {
  animation: splash-fade-out .4s ease forwards;
}
@keyframes splash-fade-out {
  to { opacity: 0; visibility: hidden; }
}
```

## Davranış mantığı

```js
function runSplash() {
  const lines = document.documentElement.lang === 'tr' ? bootLinesTR : bootLines;
  const container = document.getElementById('splash-lines');
  const splash = document.getElementById('splash-screen');
  let i = 0;

  function showNextLine() {
    if (i > 0) {
      // önceki satırı "done" durumuna al, checkmark ekle
      const prev = container.children[i - 1];
      prev.classList.remove('current');
      prev.classList.add('done');
      prev.innerHTML = `<span class="checkmark">✓</span>` + prev.textContent;
    }
    if (i >= lines.length) {
      setTimeout(() => finishSplash(splash), 500);
      return;
    }
    const lineEl = document.createElement('div');
    lineEl.className = 'splash-line current';
    lineEl.textContent = `> ${lines[i]}`;
    container.appendChild(lineEl);
    i++;
    setTimeout(showNextLine, 450); // her satır arası ~450ms
  }

  showNextLine();
}

function finishSplash(splash) {
  splash.classList.add('fade-out');
  setTimeout(() => splash.remove(), 400);
  sessionStorage.setItem('splashShown', 'true');
}

document.getElementById('splash-skip').addEventListener('click', () => finishSplash(document.getElementById('splash-screen')));

// Sadece ilk ziyarette göster, aynı oturumda tekrar gösterme
if (!sessionStorage.getItem('splashShown') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  runSplash();
} else {
  document.getElementById('splash-screen')?.remove();
  sessionStorage.setItem('splashShown', 'true');
}
```

## Kurallar

- **Süre:** Toplam ~4-5 saniye (8 satır × ~450ms + son bekleme). Bundan uzun olmayacak — ziyaretçiyi bekletmemek önemli.
- **Skip butonu:** Her zaman görünür, `[ SKIP ]` terminal CTA diliyle tutarlı, sağ alt köşede.
- **Sadece ilk ziyaret:** `sessionStorage` ile aynı oturumda tekrar gösterilmiyor — kullanıcı sayfalar arası gezinirken her seferinde splash görmesin.
- **`prefers-reduced-motion: reduce`** tespit edilirse splash TAMAMEN atlanır, direkt hero gösterilir.
- **SEO/erişilebilirlik notu:** Splash ekranı DOM'dan tamamen kaldırılıyor (`splash.remove()`), arkasındaki içerik her zaman DOM'da mevcut — arama motorları ve ekran okuyucular splash'i bir engel olarak görmüyor.
- **Ceviz logosu kullanılmıyor** bu ekranda — tutarlılık için diğerleriyle aynı metin formatında kalıyor. İstersen ileride SADECE Ceviz için küçük bir logo ikonu eklenebilir (kullanıcının kendi şirketi olduğu için telif sorunu yok), ama bu opsiyonel, şimdilik metin yeterli.
