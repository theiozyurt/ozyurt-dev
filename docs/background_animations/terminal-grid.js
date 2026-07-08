// Terminal Grid — CV sayfası arka planı.
// Seyrek, çoğunlukla sabit duran monospace karakter ızgarası; hücreler ara sıra
// rastgele flicker eder (terminal buffer hissi). Okunabilirliği bozmaması için
// varsayılan alfa çok düşük tutuldu — bu sayfa metin ağırlıklı, arka plan sessiz kalmalı.

function createTerminalGrid(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const o = Object.assign({
    fullscreen: false,
    cellSize: 26,
    accent: '176, 141, 79',
    baseAlpha: 0.05,
    flickerChance: 0.0025,  // kare başına, hücre başına flicker olasılığı
    flickerAlpha: 0.4,
    flickerDuration: 900,   // ms
    chars: '01/_-.:[]#',
    fontSize: 12,
    mouseRadius: 110,
  }, options || {});

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouse = { x: -1000, y: -1000 };
  let cells = [];

  function dims() {
    if (o.fullscreen) return { w: window.innerWidth, h: window.innerHeight };
    const r = canvas.getBoundingClientRect();
    return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
  }

  function resize() {
    const d = dims();
    canvas.width = d.w;
    canvas.height = d.h;
    buildCells();
  }

  function randomChar() {
    return o.chars[Math.floor(Math.random() * o.chars.length)];
  }

  function buildCells() {
    cells = [];
    const cols = Math.ceil(canvas.width / o.cellSize);
    const rows = Math.ceil(canvas.height / o.cellSize);
    for (let cx = 0; cx < cols; cx++) {
      for (let cy = 0; cy < rows; cy++) {
        cells.push({
          x: cx * o.cellSize + o.cellSize / 2,
          y: cy * o.cellSize + o.cellSize / 2,
          char: randomChar(),
          flickerUntil: 0,
        });
      }
    }
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = `${o.fontSize}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const now = performance.now();

    cells.forEach((c) => {
      if (now > c.flickerUntil && Math.random() < o.flickerChance) {
        c.flickerUntil = now + o.flickerDuration;
        c.char = randomChar();
      }

      const dx = mouse.x - c.x, dy = mouse.y - c.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let alpha = o.baseAlpha;
      if (now < c.flickerUntil) alpha = o.flickerAlpha;
      if (dist < o.mouseRadius) alpha = Math.max(alpha, (1 - dist / o.mouseRadius) * 0.5);

      ctx.fillStyle = `rgba(${o.accent}, ${alpha})`;
      ctx.fillText(c.char, c.x, c.y);
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
  frame(); // reduced-motion ise tek kare çizer, döngü kurmaz
}

// Kullanım:
// createTerminalGrid(document.getElementById('cv-bg'), { fullscreen: true });
