// Uçuş Rotası — Deneyim sayfası arka planı.
// Yatay şeritlerde kayan, hafif kavisli iz bırakan parçacıklar.
// bg.js (DNA Helix) ile aynı mimari: fullscreen/kart modu, resize, mouse etkileşimi,
// prefers-reduced-motion desteği.

function createFlightPath(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const o = Object.assign({
    fullscreen: false,
    laneCount: 6,        // yatay şerit sayısı
    laneSpacing: null,    // null ise otomatik (canvas.height / (laneCount+1))
    trailCount: 22,       // şerit başına parçacık
    speed: 0.6,           // kayma hızı
    arcHeight: 26,        // hafif dalgalanma genliği (px)
    accent: '176, 141, 79', // RGB — pirinç/bronz (Navy+Brass paleti)
    baseAlpha: 0.16,
    trailLength: 40,      // iz uzunluğu (px)
    mouseRadius: 150,
    headSize: 1.4,
  }, options || {});

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouse = { x: -1000, y: -1000 };
  let lanes = [];

  function dims() {
    if (o.fullscreen) return { w: window.innerWidth, h: window.innerHeight };
    const r = canvas.getBoundingClientRect();
    return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
  }

  function resize() {
    const d = dims();
    canvas.width = d.w;
    canvas.height = d.h;
    buildLanes();
  }

  function buildLanes() {
    lanes = [];
    const spacing = o.laneSpacing || canvas.height / (o.laneCount + 1);
    for (let i = 1; i <= o.laneCount; i++) {
      const baseY = spacing * i;
      const dir = i % 2 === 0 ? -1 : 1; // şeritler dönüşümlü yönde aksın
      const particles = [];
      for (let j = 0; j < o.trailCount; j++) {
        particles.push({ t: Math.random(), seed: Math.random() * Math.PI * 2 });
      }
      lanes.push({ baseY, dir, particles });
    }
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = performance.now() * 0.001;

    lanes.forEach((lane) => {
      lane.particles.forEach((p) => {
        p.t += o.speed * 0.0006 * lane.dir;
        if (p.t > 1) p.t = 0;
        if (p.t < 0) p.t = 1;

        const x = lane.dir > 0 ? p.t * canvas.width : (1 - p.t) * canvas.width;
        const y = lane.baseY + Math.sin(x * 0.01 + p.seed + time * 0.2) * o.arcHeight;

        const dx = mouse.x - x;
        const dy = mouse.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let alpha = o.baseAlpha;
        if (dist < o.mouseRadius) alpha = o.baseAlpha + (1 - dist / o.mouseRadius) * 0.6;

        const tailX = x - lane.dir * o.trailLength;
        const grad = ctx.createLinearGradient(tailX, y, x, y);
        grad.addColorStop(0, `rgba(${o.accent}, 0)`);
        grad.addColorStop(1, `rgba(${o.accent}, ${alpha})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(tailX, y);
        ctx.lineTo(x, y);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, o.headSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${o.accent}, ${Math.min(alpha + 0.2, 1)})`;
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
  frame(); // reduced-motion ise tek kare çizer, döngü kurmaz
}

// Kullanım:
// createFlightPath(document.getElementById('experience-bg'), { fullscreen: true });
