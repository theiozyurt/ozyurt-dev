// Pusula/Rota — Ana Sayfa kişisel imza arka planı.
// Ceviz'in DNA helix'inden tamamen ayrı, İsmail'in kendi görsel imzası:
// merkezde bir pusula gülü, mouse'a yönelen ibre, ambient radar taraması,
// ve mouse'a giden rota çizgisi üzerinde canlı derece (bearing) okuması.

function createCompassBearing(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const o = Object.assign({
    fullscreen: false,
    accent: '176, 141, 79',   // brass — Navy+Brass paleti
    dimAccent: '124, 140, 166', // text-body tonu, ikincil çizgiler için
    dotSpacing: 46,
    dotAlpha: 0.07,
    twinkleChance: 0.0015,
    routeCount: 4,            // sabit "rota" çizgisi sayısı
    needleEase: 0.06,         // ibrenin hedefe yaklaşma yumuşaklığı
    sweepSpeed: 0.25,         // rad/saniye — ambient radar dönüş hızı
    mouseLineMaxDist: 420,
    showBearingLabel: true,
  }, options || {});

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouse = { x: -1000, y: -1000 };
  let dots = [];
  let routes = [];
  let needleAngle = 0;
  let sweepAngle = -Math.PI / 2;
  let lastTime = null;

  function dims() {
    if (o.fullscreen) return { w: window.innerWidth, h: window.innerHeight };
    const r = canvas.getBoundingClientRect();
    return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
  }

  function resize() {
    const d = dims();
    canvas.width = d.w;
    canvas.height = d.h;
    buildDots();
    buildRoutes();
  }

  function buildDots() {
    dots = [];
    for (let x = o.dotSpacing / 2; x < canvas.width; x += o.dotSpacing) {
      for (let y = o.dotSpacing / 2; y < canvas.height; y += o.dotSpacing) {
        dots.push({ x, y, flickerUntil: 0 });
      }
    }
  }

  function buildRoutes() {
    routes = [];
    for (let i = 0; i < o.routeCount; i++) {
      routes.push(Math.random() * Math.PI * 2);
    }
  }

  function center() {
    return { x: canvas.width / 2, y: canvas.height / 2, r: Math.min(canvas.width, canvas.height) * 0.16 };
  }

  function drawDots(now) {
    dots.forEach((d) => {
      if (now > d.flickerUntil && Math.random() < o.twinkleChance) {
        d.flickerUntil = now + 500 + Math.random() * 600;
      }
      const alpha = now < d.flickerUntil ? o.dotAlpha * 3.5 : o.dotAlpha;
      ctx.beginPath();
      ctx.arc(d.x, d.y, 0.9, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${o.dimAccent}, ${alpha})`;
      ctx.fill();
    });
  }

  function drawCompassRose(c) {
    // dış çerçeve
    ctx.beginPath();
    ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(${o.accent}, 0.16)`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // derece işaretleri
    for (let deg = 0; deg < 360; deg += 15) {
      const a = (deg * Math.PI) / 180;
      const isCardinal = deg % 90 === 0;
      const inner = isCardinal ? c.r * 0.78 : c.r * 0.88;
      const x1 = c.x + Math.cos(a) * inner;
      const y1 = c.y + Math.sin(a) * inner;
      const x2 = c.x + Math.cos(a) * c.r;
      const y2 = c.y + Math.sin(a) * c.r;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(${o.accent}, ${isCardinal ? 0.35 : 0.14})`;
      ctx.lineWidth = isCardinal ? 1.2 : 0.7;
      ctx.stroke();
    }

    // kardinal etiketler (N/E/S/W)
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const labels = [['N', -Math.PI / 2], ['E', 0], ['S', Math.PI / 2], ['W', Math.PI]];
    labels.forEach(([label, a]) => {
      const x = c.x + Math.cos(a) * (c.r * 0.66);
      const y = c.y + Math.sin(a) * (c.r * 0.66);
      ctx.fillStyle = `rgba(${o.accent}, 0.4)`;
      ctx.fillText(label, x, y);
    });
  }

  function drawRoutes(c) {
    routes.forEach((a) => {
      const x2 = c.x + Math.cos(a) * c.r * 4;
      const y2 = c.y + Math.sin(a) * c.r * 4;
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(x2, y2);
      ctx.setLineDash([2, 10]);
      ctx.strokeStyle = `rgba(${o.dimAccent}, 0.08)`;
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }

  function drawSweep(c, dt) {
    sweepAngle += o.sweepSpeed * dt;
    const segments = 14;
    for (let i = 0; i < segments; i++) {
      const a = sweepAngle - i * 0.05;
      const alpha = 0.14 * (1 - i / segments);
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(c.x + Math.cos(a) * c.r, c.y + Math.sin(a) * c.r);
      ctx.strokeStyle = `rgba(${o.accent}, ${alpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  function drawNeedle(c) {
    const tipX = c.x + Math.cos(needleAngle) * c.r * 0.92;
    const tipY = c.y + Math.sin(needleAngle) * c.r * 0.92;
    const tailX = c.x - Math.cos(needleAngle) * c.r * 0.34;
    const tailY = c.y - Math.sin(needleAngle) * c.r * 0.34;

    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(tipX, tipY);
    ctx.strokeStyle = `rgba(${o.accent}, 0.85)`;
    ctx.lineWidth = 1.6;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(tailX, tailY);
    ctx.strokeStyle = `rgba(${o.dimAccent}, 0.5)`;
    ctx.lineWidth = 1.3;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(c.x, c.y, 2.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${o.accent}, 0.9)`;
    ctx.fill();
  }

  function drawBearingLine(c) {
    if (mouse.x < -500) return;
    const dx = mouse.x - c.x, dy = mouse.y - c.y;
    const dist = Math.min(Math.hypot(dx, dy), o.mouseLineMaxDist);
    const angle = Math.atan2(dy, dx);
    const x2 = c.x + Math.cos(angle) * dist;
    const y2 = c.y + Math.sin(angle) * dist;

    ctx.beginPath();
    ctx.moveTo(c.x, c.y);
    ctx.lineTo(x2, y2);
    ctx.setLineDash([1, 6]);
    ctx.strokeStyle = `rgba(${o.accent}, 0.25)`;
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.setLineDash([]);

    if (o.showBearingLabel) {
      let deg = Math.round(((angle * 180) / Math.PI + 90 + 360) % 360);
      ctx.font = '11px monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(${o.accent}, 0.55)`;
      ctx.fillText(`${String(deg).padStart(3, '0')}°`, x2 + 8, y2);
    }
  }

  function frame(now) {
    if (lastTime === null) lastTime = now;
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const c = center();

    drawDots(now);
    drawRoutes(c);
    drawSweep(c, dt);

    const targetAngle = mouse.x > -500
      ? Math.atan2(mouse.y - c.y, mouse.x - c.x)
      : sweepAngle;

    let diff = targetAngle - needleAngle;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    needleAngle += diff * o.needleEase;

    drawCompassRose(c);
    drawBearingLine(c);
    drawNeedle(c);

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
  if (reduce) {
    // Tek kare: ibre kuzeye (yukarı) sabit, sweep/needle animasyonu yok.
    needleAngle = -Math.PI / 2;
    frame(performance.now());
  } else {
    requestAnimationFrame(frame);
  }
}

// Kullanım:
// createCompassBearing(document.getElementById('home-bg'), { fullscreen: true });
