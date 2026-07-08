// Duvar Katmanları — Ana Sayfa kişisel imza arka planı (v2).
// Skyline denemesi çok belirgin/yorucu bulunduğu için değiştirildi.
// Üç farklı derinlikte, çok düşük opaklıkta, yavaşça kayan tuğla duvar
// dokusu (running-bond örgü). İçerikle yarışmaz, sadece dokusal bir zemin.
// Mouse sadece en öndeki katmanı çok hafif aydınlatır.

function createBrickLayers(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const o = Object.assign({
    fullscreen: false,
    brickW: 96,          // taban tuğla genişliği (px) — geniş tutuldu, "çok yakın" hissi olmasın
    brickH: 34,           // taban tuğla yüksekliği (px)
    accent: '176, 141, 79',   // brass — çok seyrek/hafif kullanılır
    mortar: '124, 140, 166',  // dimAccent — asıl doku bu tonla çiziliyor
    mouseRadius: 260,
    mouseBoost: 0.05,    // sadece ön katmanda, çok hafif
    layers: [
      { scale: 0.75, alpha: 0.028, speedX: 0.006, speedY: 0,      dashed: false },
      { scale: 1.0,  alpha: 0.045, speedX: -0.004, speedY: 0.002, dashed: false },
      { scale: 1.35, alpha: 0.065, speedX: 0.002, speedY: -0.003, dashed: false },
    ],
  }, options || {});

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouse = { x: -1000, y: -1000 };
  let startTime = null;

  function dims() {
    if (o.fullscreen) return { w: window.innerWidth, h: window.innerHeight };
    const r = canvas.getBoundingClientRect();
    return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
  }

  function resize() {
    const d = dims();
    canvas.width = d.w;
    canvas.height = d.h;
  }

  // Sabit, konuma bağlı sahte-rastgele değer (kaydırma sırasında tuğlalar
  // titremesin diye satır/sütun indeksine göre deterministik hash).
  function hash(row, col, layerIndex) {
    const v = Math.sin(row * 12.9898 + col * 78.233 + layerIndex * 37.719) * 43758.5453;
    return v - Math.floor(v);
  }

  function drawLayer(layer, layerIndex, time, isFront) {
    const bw = o.brickW * layer.scale;
    const bh = o.brickH * layer.scale;

    const offsetX = time * layer.speedX * 60; // px cinsinden yumuşak kayma
    const offsetY = time * layer.speedY * 60;

    const startCol = Math.floor(-offsetX / bw) - 2;
    const endCol = Math.ceil((canvas.width - offsetX) / bw) + 2;
    const startRow = Math.floor(-offsetY / bh) - 1;
    const endRow = Math.ceil((canvas.height - offsetY) / bh) + 1;

    for (let row = startRow; row <= endRow; row++) {
      const rowShift = (row % 2 !== 0) ? bw / 2 : 0; // running-bond örgü
      for (let col = startCol; col <= endCol; col++) {
        const x = col * bw + rowShift + offsetX;
        const y = row * bh + offsetY;

        const jitter = hash(row, col, layerIndex);
        let alpha = layer.alpha * (0.6 + jitter * 0.8);

        if (isFront && mouse.x > -500) {
          const cx = x + bw / 2, cy = y + bh / 2;
          const dist = Math.hypot(mouse.x - cx, mouse.y - cy);
          if (dist < o.mouseRadius) {
            alpha += (1 - dist / o.mouseRadius) * o.mouseBoost;
          }
        }

        // çok hafif dolgu — "duvar" hissi için
        ctx.fillStyle = `rgba(${o.mortar}, ${alpha * 0.5})`;
        ctx.fillRect(x, y, bw - 1.5, bh - 1.5);

        // ince derz (mortar) çizgisi
        ctx.strokeStyle = `rgba(${o.mortar}, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, bw - 1.5, bh - 1.5);
      }
    }
  }

  function frame(now) {
    if (startTime === null) startTime = now;
    const time = (now - startTime) / 1000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    o.layers.forEach((layer, i) => {
      const isFront = i === o.layers.length - 1;
      drawLayer(layer, i, time, isFront);
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
// createBrickLayers(document.getElementById('home-bg'), { fullscreen: true });
