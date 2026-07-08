// Yükselen Ufuk Çizgisi — Ana Sayfa kişisel imza arka planı.
// Alt kısımda yavaşça yükselip yeniden şekillenen soyut blok silüetleri —
// "sürekli inşa etme / büyüme" metaforu. Mouse yaklaşınca o bölgedeki
// binalar büyür; en yüksek binanın tepesinde yanıp sönen bir vinç ucu var
// ("hâlâ inşaat halinde" detayı).

function createSkylineGrowth(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const o = Object.assign({
    fullscreen: false,
    barCount: 42,
    barGap: 3,
    accent: '176, 141, 79',
    dimAccent: '124, 140, 166',
    fillAlpha: 0.10,
    topLineAlpha: 0.4,
    maxHeightRatio: 0.55,   // en yüksek binanın canvas yüksekliğine oranı
    minHeightRatio: 0.08,
    mouseRadius: 220,
    mouseBoostRatio: 0.22,  // mouse yakınında ekstra yükseklik oranı
    starCount: 70,
    starAlpha: 0.08,
    craneBlink: true,
    craneRecalcMs: 2200,    // en yüksek binayı bu aralıkla yeniden bul
  }, options || {});

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouse = { x: -1000, y: -1000 };
  let bars = [];
  let stars = [];
  let craneIndex = 0;
  let lastCraneCheck = 0;

  function dims() {
    if (o.fullscreen) return { w: window.innerWidth, h: window.innerHeight };
    const r = canvas.getBoundingClientRect();
    return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
  }

  function resize() {
    const d = dims();
    canvas.width = d.w;
    canvas.height = d.h;
    buildBars();
    buildStars();
  }

  function buildBars() {
    bars = [];
    const w = canvas.width / o.barCount;
    for (let i = 0; i < o.barCount; i++) {
      bars.push({
        x: i * w,
        w: w - o.barGap,
        phase1: Math.random() * Math.PI * 2,
        phase2: Math.random() * Math.PI * 2,
        freq1: 0.06 + Math.random() * 0.05,
        freq2: 0.02 + Math.random() * 0.03,
        baseRatio: o.minHeightRatio + Math.random() * 0.15,
      });
    }
  }

  function buildStars() {
    stars = [];
    for (let i = 0; i < o.starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.7,
        flickerUntil: 0,
      });
    }
  }

  function barHeight(bar, time) {
    const wobble = (Math.sin(time * bar.freq1 + bar.phase1) + Math.sin(time * bar.freq2 + bar.phase2)) / 2;
    const ratio = bar.baseRatio + (wobble * 0.5 + 0.5) * (o.maxHeightRatio - bar.baseRatio);
    return Math.max(o.minHeightRatio, Math.min(o.maxHeightRatio, ratio)) * canvas.height;
  }

  function drawStars(now) {
    stars.forEach((s) => {
      if (now > s.flickerUntil && Math.random() < 0.0012) {
        s.flickerUntil = now + 400 + Math.random() * 500;
      }
      const alpha = now < s.flickerUntil ? o.starAlpha * 3 : o.starAlpha;
      ctx.beginPath();
      ctx.arc(s.x, s.y, 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${o.dimAccent}, ${alpha})`;
      ctx.fill();
    });
  }

  function frame(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = now * 0.001;

    drawStars(now);

    if (now - lastCraneCheck > o.craneRecalcMs) {
      lastCraneCheck = now;
      let maxH = -1;
      bars.forEach((b, i) => {
        const h = barHeight(b, time);
        if (h > maxH) { maxH = h; craneIndex = i; }
      });
    }

    bars.forEach((bar, i) => {
      let h = barHeight(bar, time);

      const barCenterX = bar.x + bar.w / 2;
      const dist = Math.abs(mouse.x - barCenterX);
      if (mouse.x > -500 && dist < o.mouseRadius) {
        const f = 1 - dist / o.mouseRadius;
        h += f * o.mouseBoostRatio * canvas.height;
      }
      h = Math.min(h, canvas.height * (o.maxHeightRatio + o.mouseBoostRatio));

      const y = canvas.height - h;

      ctx.fillStyle = `rgba(${o.accent}, ${o.fillAlpha})`;
      ctx.fillRect(bar.x, y, bar.w, h);

      ctx.beginPath();
      ctx.moveTo(bar.x, y);
      ctx.lineTo(bar.x + bar.w, y);
      ctx.strokeStyle = `rgba(${o.accent}, ${o.topLineAlpha})`;
      ctx.lineWidth = 1;
      ctx.stroke();

      if (o.craneBlink && i === craneIndex) {
        const craneX = bar.x + bar.w / 2;
        const craneTopY = y - 18;
        ctx.beginPath();
        ctx.moveTo(craneX, y);
        ctx.lineTo(craneX, craneTopY);
        ctx.strokeStyle = `rgba(${o.dimAccent}, 0.35)`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        const blink = reduce ? 1 : (Math.sin(time * 2) + 1) / 2;
        ctx.beginPath();
        ctx.arc(craneX, craneTopY, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${o.accent}, ${0.3 + blink * 0.5})`;
        ctx.fill();
      }
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
// createSkylineGrowth(document.getElementById('home-bg'), { fullscreen: true });
