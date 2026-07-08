// Düğüm Ağı — Projeler sayfası arka planı.
// Serbestçe süzülen noktalar; birbirine yakın olanlar geçici çizgilerle bağlanır.
// Kasıtlı olarak "devre/board" hissinden kaçınıldı — organik, düzensiz hareket
// birbirine bağlı fikir/proje ağı metaforuna oturuyor.

function createNodeNetwork(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const o = Object.assign({
    fullscreen: false,
    nodeCount: 60,        // 1400x800 referans yoğunluk — canvas boyutuna göre ölçeklenir
    linkDistance: 140,     // bağlantı kurulacak maksimum mesafe (px)
    driftSpeed: 0.15,      // serbest hareket hızı
    accent: '176, 141, 79',
    baseAlpha: 0.5,
    linkAlpha: 0.12,
    nodeSize: 1.6,
    mouseRadius: 160,
  }, options || {});

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouse = { x: -1000, y: -1000 };
  let nodes = [];

  function dims() {
    if (o.fullscreen) return { w: window.innerWidth, h: window.innerHeight };
    const r = canvas.getBoundingClientRect();
    return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
  }

  function resize() {
    const d = dims();
    canvas.width = d.w;
    canvas.height = d.h;
    buildNodes();
  }

  function buildNodes() {
    const count = Math.round(o.nodeCount * (canvas.width * canvas.height) / (1400 * 800));
    nodes = [];
    for (let i = 0; i < Math.max(count, 12); i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * o.driftSpeed,
        vy: (Math.random() - 0.5) * o.driftSpeed,
      });
    }
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    nodes.forEach((n) => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
    });

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < o.linkDistance) {
          const midX = (a.x + b.x) / 2, midY = (a.y + b.y) / 2;
          const mDist = Math.hypot(mouse.x - midX, mouse.y - midY);
          let alpha = o.linkAlpha * (1 - dist / o.linkDistance);
          if (mDist < o.mouseRadius) alpha += (1 - mDist / o.mouseRadius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${o.accent}, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    nodes.forEach((n) => {
      const dx = mouse.x - n.x, dy = mouse.y - n.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let alpha = o.baseAlpha * 0.4;
      let size = o.nodeSize;
      if (dist < o.mouseRadius) {
        const f = 1 - dist / o.mouseRadius;
        alpha = o.baseAlpha * 0.4 + f * 0.5;
        size = o.nodeSize + f * 1.6;
      }
      ctx.beginPath();
      ctx.arc(n.x, n.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${o.accent}, ${alpha})`;
      ctx.fill();
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
// createNodeNetwork(document.getElementById('projects-bg'), { fullscreen: true });
