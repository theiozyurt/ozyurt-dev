// Sinyal Dalgası — İletişim sayfası arka planı.
// Sabit "kaynak" noktalardan periyodik olarak yayılan halka pingleri.
// Tıklayınca mouse konumundan da yeni bir ping başlar (iletişim/mesaj gönderme hissi).

function createSignalPulse(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const o = Object.assign({
    fullscreen: false,
    anchorCount: 4,
    pulseInterval: 2200,  // ms, kaynak başına ortalama ping aralığı
    maxRadius: 260,
    speed: 60,            // px/saniye genişleme hızı
    accent: '176, 141, 79',
    baseAlpha: 0.35,
    lineWidth: 1,
    mouseRadius: 150,
    clickSpawn: true,
  }, options || {});

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouse = { x: -1000, y: -1000 };
  let anchors = [];
  let pulses = [];

  function dims() {
    if (o.fullscreen) return { w: window.innerWidth, h: window.innerHeight };
    const r = canvas.getBoundingClientRect();
    return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
  }

  function resize() {
    const d = dims();
    canvas.width = d.w;
    canvas.height = d.h;
    buildAnchors();
  }

  function buildAnchors() {
    anchors = [];
    for (let i = 0; i < o.anchorCount; i++) {
      anchors.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        nextPulse: performance.now() + Math.random() * o.pulseInterval,
      });
    }
  }

  function spawnPulse(x, y) {
    pulses.push({ x, y, r: 0, born: performance.now() });
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const now = performance.now();

    anchors.forEach((a) => {
      if (now > a.nextPulse) {
        spawnPulse(a.x, a.y);
        a.nextPulse = now + o.pulseInterval * (0.8 + Math.random() * 0.4);
      }
      ctx.beginPath();
      ctx.arc(a.x, a.y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${o.accent}, ${o.baseAlpha})`;
      ctx.fill();
    });

    pulses = pulses.filter((p) => {
      const age = (now - p.born) / 1000;
      p.r = age * o.speed;
      if (p.r > o.maxRadius) return false;

      const fade = 1 - p.r / o.maxRadius;
      const dist = Math.hypot(mouse.x - p.x, mouse.y - p.y);
      let alpha = o.baseAlpha * fade;
      if (dist < o.mouseRadius) alpha += (1 - dist / o.mouseRadius) * 0.3 * fade;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${o.accent}, ${alpha})`;
      ctx.lineWidth = o.lineWidth;
      ctx.stroke();
      return true;
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

  if (o.clickSpawn) {
    canvas.addEventListener('click', () => {
      if (mouse.x > -500) spawnPulse(mouse.x, mouse.y);
    });
  }

  resize();
  frame(); // reduced-motion ise tek kare çizer, döngü kurmaz
}

// Kullanım:
// createSignalPulse(document.getElementById('contact-bg'), { fullscreen: true });
