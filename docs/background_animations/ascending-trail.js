// Yükselen İz — Hedefler sayfası arka planı.
// Aşağıdan yukarı süzülen, kıvılcım/iz bırakan parçacıklar (roket/büyüme metaforu).
// Mouse yaklaşınca parçacıklar hızlanır ve parlar.

function createAscendingTrail(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const o = Object.assign({
    fullscreen: false,
    particleCount: 70,
    baseSpeed: 0.35,       // px/frame taban yükselme hızı
    drift: 18,             // yatay salınım genliği
    accent: '176, 141, 79',
    baseAlpha: 0.22,
    tailLength: 26,        // iz uzunluğu (px)
    mouseRadius: 130,
    mouseBoost: 1.4,       // mouse yakınında hız çarpanı
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
    buildParticles();
  }

  function spawn(p) {
    p.x = Math.random() * canvas.width;
    p.y = canvas.height + Math.random() * 40;
    p.speed = o.baseSpeed * (0.6 + Math.random() * 0.8);
    p.seed = Math.random() * Math.PI * 2;
    p.size = 0.8 + Math.random() * 1.2;
  }

  function buildParticles() {
    particles = [];
    for (let i = 0; i < o.particleCount; i++) {
      const p = {};
      spawn(p);
      p.y = Math.random() * canvas.height; // ilk yükseklikleri dağıt
      particles.push(p);
    }
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = performance.now() * 0.001;

    particles.forEach((p) => {
      p.y -= p.speed;
      p.x += Math.sin(time * 0.5 + p.seed) * o.drift * 0.02;

      if (p.y < -20) spawn(p);

      const dx = mouse.x - p.x, dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      let alpha = o.baseAlpha;
      let size = p.size;
      if (dist < o.mouseRadius) {
        const f = 1 - dist / o.mouseRadius;
        alpha = o.baseAlpha + f * 0.6;
        size = p.size + f * 1.5;
        p.y -= p.speed * f * (o.mouseBoost - 1); // ekstra kaldırma
      }

      const grad = ctx.createLinearGradient(p.x, p.y + o.tailLength, p.x, p.y);
      grad.addColorStop(0, `rgba(${o.accent}, 0)`);
      grad.addColorStop(1, `rgba(${o.accent}, ${alpha})`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = size * 0.8;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y + o.tailLength);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${o.accent}, ${Math.min(alpha + 0.15, 1)})`;
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
// createAscendingTrail(document.getElementById('goals-bg'), { fullscreen: true });
