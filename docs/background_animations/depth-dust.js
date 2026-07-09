// Derinlik Tozu — Ana Sayfa kişisel imza arka planı (final).
// Dört farklı derinlikte süzülen toz/parçacık katmanı. Mouse'a sert değil,
// gecikmeli (eased) paralaks ile tepki verir — derinlik hissi buradan gelir.
// En öndeki katmanda ara sıra beliren 4 uçlu pırıltılar dışında hiçbir
// figüratif şekil yok; tamamen soyut, sakin, içerikle yarışmayan bir zemin.

function createDepthDust(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const o = Object.assign({
    fullscreen: false,
    accent: '176, 141, 79',    // brass — ön katmanlar
    dimAccent: '124, 140, 166', // dimAccent — arka katmanlar
    parallaxEase: 0.04,        // mouse'u takip yumuşaklığı (düşük = daha ağır/derin his)
    sparkleCycle: 14,          // saniye — ön katman parçacığı ortalama bu aralıkla pırıldar
    sparkleDuration: 1.6,      // saniye — tek pırıltının süresi
    // Katmanlar: arkadan öne. n = 1400x800 referans yoğunluk (alanla ölçeklenir),
    // par = paralaks şiddeti (px), drift = yatay süzülme hızı (px/s).
    layers: [
      { n: 150, size: 0.7, alpha: 0.10, drift: 2,  par: 4,  useAccent: false, sparkle: false },
      { n: 110, size: 1.0, alpha: 0.17, drift: 4,  par: 10, useAccent: false, sparkle: false },
      { n: 75,  size: 1.4, alpha: 0.26, drift: 7,  par: 20, useAccent: true,  sparkle: false },
      { n: 40,  size: 2.0, alpha: 0.42, drift: 11, par: 34, useAccent: true,  sparkle: true  },
    ],
  }, options || {});

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouse = { x: -1000, y: -1000 };
  let par = { x: 0, y: 0 };
  let layers = [];

  function dims() {
    if (o.fullscreen) return { w: window.innerWidth, h: window.innerHeight };
    const r = canvas.getBoundingClientRect();
    return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
  }

  function resize() {
    const d = dims();
    canvas.width = d.w;
    canvas.height = d.h;
    buildLayers();
  }

  function buildLayers() {
    const areaScale = (canvas.width * canvas.height) / (1400 * 800);
    layers = o.layers.map((L) => {
      const pts = [];
      const count = Math.max(8, Math.round(L.n * areaScale));
      for (let i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          ph: Math.random() * Math.PI * 2,
          vSeed: 0.5 + Math.random(),
          sparkleAt: Math.random() * o.sparkleCycle * 1.5,
        });
      }
      return Object.assign({}, L, { pts });
    });
  }

  function sparklePath(x, y, r, rot) {
    const inner = r * 0.35;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = rot + i * Math.PI / 4;
      const rad = i % 2 === 0 ? r : inner;
      const px = x + Math.cos(a) * rad;
      const py = y + Math.sin(a) * rad;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  function frame(now) {
    const t = now * 0.001;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const tx = mouse.x > -500 ? (mouse.x - canvas.width / 2) / (canvas.width / 2) : 0;
    const ty = mouse.y > -500 ? (mouse.y - canvas.height / 2) / (canvas.height / 2) : 0;
    par.x += (tx - par.x) * o.parallaxEase;
    par.y += (ty - par.y) * o.parallaxEase;

    layers.forEach((L) => {
      const color = L.useAccent ? o.accent : o.dimAccent;
      L.pts.forEach((p) => {
        const driftX = reduce ? 0 : t * L.drift;
        const x = (((p.x + driftX) % canvas.width) + canvas.width) % canvas.width - par.x * L.par;
        const y = p.y + (reduce ? 0 : Math.sin(t * 0.35 * p.vSeed + p.ph) * 5) - par.y * L.par;
        const tw = reduce ? 0.5 : (Math.sin(t * 0.6 * p.vSeed + p.ph) + 1) / 2;
        const a = L.alpha * (0.55 + tw * 0.65);

        if (L.sparkle && !reduce) {
          const cyc = (t + p.sparkleAt) % o.sparkleCycle;
          if (cyc < o.sparkleDuration) {
            const s = Math.sin((cyc / o.sparkleDuration) * Math.PI);
            sparklePath(x, y, L.size * (1.8 + s * 2.4), t * 0.4 + p.ph);
            ctx.fillStyle = `rgba(${o.accent}, ${a * 0.5 + s * 0.5})`;
            ctx.fill();
            return;
          }
        }
        ctx.beginPath();
        ctx.arc(x, y, L.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${a})`;
        ctx.fill();
      });
    });

    if (!reduce) requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', (e) => {
    const r = o.fullscreen ? { left: 0, top: 0 } : canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  }, { passive: true });
  window.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

  resize();
  frame(performance.now()); // reduced-motion ise tek kare çizer, döngü kurmaz
}

// Kullanım:
// createDepthDust(document.getElementById('home-bg'), { fullscreen: true });
