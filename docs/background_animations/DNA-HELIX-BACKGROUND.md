# DNA Çift Sarmal Arka Planı — Yeniden Kullanım Kılavuzu

Mouse'a tepki veren, canlas tabanlı dönen/dalgalanan DNA helix arka planı.
Tek bir `createHelix(canvas, options)` fonksiyonu; hem **tam ekran arka plan**
hem de **kart içi yoğun motif** olarak kullanılabilir. Bağımlılık yok (vanilla JS).

> Kaynak: Ceviz Biotech web sitesi (`bg.js`). Başka bir projeye taşımak için
> aşağıdaki 3 parçayı (HTML + CSS + JS) kopyalaman yeterli.

---

## 1. Nasıl çalışır (kısaca)

- Ekranı dikey şeritlere böler (`strandSpacing` aralığıyla).
- Her şeritte, dikey eksen boyunca noktalar üretir; her `y` seviyesinde **iki nokta**
  vardır (180° faz farkıyla) → bu iki nokta sarmalın iki ipliğini oluşturur.
- Her karede noktaların `x` konumu, `baseY`'ye ve zamana bağlı bir **sinüs dalgasıyla**
  hesaplanır → sarmalın dönüyormuş hissi buradan gelir.
- Eşli noktalar arası çizgiler ("rungs") DNA basamaklarını çizer.
- Mouse yarıçapına (`mouseRadius`) giren noktalar **parlar, büyür ve dışa itilir**
  (hafif balık gözü etkisi).
- `prefers-reduced-motion: reduce` açıksa animasyon döngüsü kurulmaz, **tek kare** çizilir.

---

## 2. HTML

```html
<!-- Tam ekran arka plan -->
<canvas id="bg-canvas"></canvas>

<!-- (Opsiyonel) Bir kartın içinde yoğun motif -->
<canvas class="hc-dna-canvas" aria-hidden="true"></canvas>

<!-- Sayfanın en altında -->
<script src="bg.js"></script>
```

---

## 3. CSS

```css
/* Tam ekran arka plan — içeriğin arkasına sabitlenir, tıklamayı geçirir */
#bg-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;            /* içeriğin arkasında kalsın */
  pointer-events: none;   /* mouse olayları alttaki içeriğe geçsin */
}

/* Kart içi kullanım (opsiyonel) — kartın kendisi position: relative olmalı */
.hc-dna-canvas {
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  /* Kenarlarda yumuşak geçiş isteğe bağlı: */
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 14%, #000 86%, transparent);
}
```

> Not: `pointer-events: none` sayesinde canvas mouse'u bloklamaz; kod mouse'u
> `window` üzerinden dinlediği için etkileşim yine de çalışır.

---

## 4. JavaScript (`bg.js`)

```js
// DNA Çift Sarmal — Mouse'a tepki veren dikey helix şeritleri.
// Yeniden kullanılabilir: hem tam ekran arka plan hem de kart içi yoğun helix.

function createHelix(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const o = Object.assign({
    fullscreen: false,
    strandSpacing: 130,    // Sarmal şeritleri arası yatay mesafe
    helixAmplitude: 28,    // Sarmalın yatay genliği
    helixFrequency: 0.028, // Dalga sıklığı
    pointSpacing: 22,      // Noktalar arası dikey mesafe
    rungInterval: 2,       // Her N satırda bir basamak
    mouseRadius: 140,
    accent: '107, 183, 255', // RGB (virgülle, rgba() içine girer)
    baseAlpha: 0.18,
    baseSize: 0.9,
    speed: 0.4,
    scrollReact: true,     // Sayfa kaydırınca sarmal hafifçe kaysın mı
  }, options || {});

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouse = { x: -1000, y: -1000 };
  let particles = [];

  function dims() {
    if (o.fullscreen) return { w: window.innerWidth, h: window.innerHeight };
    const r = canvas.getBoundingClientRect();
    return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
  }

  function resize() {
    const d = dims();
    canvas.width = d.w;
    canvas.height = d.h;
    createParticles();
  }

  function createParticles() {
    particles = [];
    for (let cx = -o.strandSpacing; cx < canvas.width + o.strandSpacing; cx += o.strandSpacing) {
      for (let y = -o.pointSpacing; y < canvas.height + o.pointSpacing; y += o.pointSpacing) {
        // Her y seviyesinde iki nokta — sarmal 1 ve sarmal 2 (180° faz farkı)
        particles.push({ cx, baseY: y, phase: 0, x: cx, y });
        particles.push({ cx, baseY: y, phase: Math.PI, x: cx, y });
      }
    }
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const time = performance.now() * 0.001;
    const scrollOffset = o.scrollReact ? window.scrollY * 0.005 : 0;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // DNA sarmal hareketi: dikey eksende sinüs dalgası
      const angle = p.baseY * o.helixFrequency + time * o.speed + p.phase + scrollOffset;
      p.x = p.cx + Math.sin(angle) * o.helixAmplitude;
      p.y = p.baseY;

      // Mouse etkileşimi
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let alpha = o.baseAlpha;
      let size = o.baseSize;

      if (dist < o.mouseRadius) {
        const force = 1 - dist / o.mouseRadius;
        alpha = o.baseAlpha + force * 0.7;
        size = o.baseSize + force * 1.8;
        // Hafif balık gözü — parçacığı mouse'tan dışa it
        p.x -= dx * force * 0.3;
        p.y -= dy * force * 0.3;
      }

      // Sarmal noktasını çiz
      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${o.accent}, ${alpha})`;
      ctx.fill();

      // Sarmal basamakları (rungs) — eşli noktaları birleştiren çizgiler
      if (i % 2 === 0 && i + 1 < particles.length) {
        const partner = particles[i + 1];
        const rowIndex = Math.floor((p.baseY + canvas.height) / o.pointSpacing);

        if (rowIndex % o.rungInterval === 0) {
          const midX = (p.x + partner.x) / 2;
          const midY = (p.y + partner.y) / 2;
          const mDist = Math.hypot(mouse.x - midX, mouse.y - midY);

          let rungAlpha = 0.06;
          if (mDist < o.mouseRadius) {
            rungAlpha = 0.06 + (1 - mDist / o.mouseRadius) * 0.25;
          }

          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(partner.x, partner.y);
          ctx.strokeStyle = `rgba(${o.accent}, ${rungAlpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    if (!reduce) requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', (e) => {
    const r = o.fullscreen ? { left: 0, top: 0 } : canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  }, { passive: true });
  window.addEventListener('mouseleave', () => {
    mouse.x = -1000;
    mouse.y = -1000;
  });

  resize();
  frame(); // reduced-motion ise tek kare çizer, döngü kurmaz
}

// --- Kullanım ---

// 1) Tam ekran arka plan
createHelix(document.getElementById('bg-canvas'), { fullscreen: true });

// 2) (Opsiyonel) Kart içi yoğun helix — sık şeritler, kısa adım
createHelix(document.querySelector('.hc-dna-canvas'), {
  strandSpacing: 64,
  pointSpacing: 14,
  helixAmplitude: 15,
  helixFrequency: 0.05,
  rungInterval: 2,
  mouseRadius: 120,
  baseAlpha: 0.24,
  baseSize: 0.8,
  speed: 0.5,
  scrollReact: false,
});
```

---

## 5. Ayarlar (options) tablosu

| Ayar | Varsayılan | Ne işe yarar |
|---|---|---|
| `fullscreen` | `false` | `true` → boyut `window.innerWidth/Height`'tan alınır (sabit arka plan). `false` → canvas'ın kendi kutu boyutu (kart içi). |
| `strandSpacing` | `130` | Dikey sarmal şeritleri arası yatay mesafe (px). Küçük = daha sık/yoğun. |
| `helixAmplitude` | `28` | Sarmalın yatay salınım genliği (px). Büyük = daha geniş dalga. |
| `helixFrequency` | `0.028` | Dikey eksende dalga sıklığı. Büyük = daha sık kıvrım. |
| `pointSpacing` | `22` | Bir şerit üzerindeki noktalar arası dikey mesafe (px). Küçük = daha yoğun. |
| `rungInterval` | `2` | Her N satırda bir basamak (rung) çizilir. Büyük = daha az basamak. |
| `mouseRadius` | `140` | Mouse etki yarıçapı (px). |
| `accent` | `'107, 183, 255'` | Renk — **RGB, virgüllü string** (`rgba()` içine girer). Ör. `'140, 120, 255'`. |
| `baseAlpha` | `0.18` | Noktaların temel saydamlığı (etkileşim yokken). |
| `baseSize` | `0.9` | Nokta yarıçapı (px). |
| `speed` | `0.4` | Animasyon hızı (dönme/dalgalanma). |
| `scrollReact` | `true` | Sayfa kaydırınca sarmal hafifçe kaysın mı. Kart içi kullanımda genelde `false`. |

---

## 6. Uyarlama ipuçları

- **Renk:** `accent` değeri `rgb`'dir, `rgba()` içine gömülür — hex kullanma. Alfa,
  koddaki `baseAlpha`/`rungAlpha` ile kontrol edilir.
- **Yoğunluk/performans:** Çok fazla nokta olursa (küçük `strandSpacing` + küçük
  `pointSpacing` + büyük ekran) FPS düşebilir. Yoğunluğu bu iki değerle ayarla.
- **Birden çok canvas:** Fonksiyon her canvas için ayrı çağrılır; her biri kendi
  `resize`/`mousemove` dinleyicisini ekler (window üzerinde). Çok sayıda örnek
  eklerken bunu göz önünde bulundur.
- **Erişilebilirlik:** `prefers-reduced-motion` otomatik desteklenir (tek kare çizer).
  Dekoratif canvas'lara `aria-hidden="true"` eklemek iyi olur.
- **Katmanlama:** Tam ekranda `z-index: -3` ve `pointer-events: none` içeriğin
  üstte ve tıklanabilir kalmasını sağlar. Kart içinde kartın `position: relative`
  olması ve içerik metninin canvas'tan yüksek `z-index`'te olması gerekir.
- **Retina (opsiyonel):** Daha keskin görüntü için `resize()` içinde
  `devicePixelRatio` ölçekleme ekleyebilirsin (mevcut kodda yok; sadelik için CSS px kullanır).
