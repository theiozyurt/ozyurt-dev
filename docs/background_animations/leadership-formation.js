// Uçuş Formasyonu — Liderlik sayfası arka planı.
// Önde bir "lider" nokta (mouse varsa mouse, yoksa kendi başına dolaşır),
// arkasında geciktirilmiş tarihçeyle V formasyonunda takip eden noktalar.
// Birkaç takipçi diğerlerinden daha parlak (alt-lider / mentor hissi).

function createLeadershipFormation(canvas, options) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const o = Object.assign({
    fullscreen: false,
    followerCount: 26,
    delayStep: 3,          // her takipçi bir öncekinden bu kadar frame geride
    lateralGap: 7,         // V formasyonunda yanal açılma (px/index)
    subLeaderEvery: 6,     // her N takipçiden biri "alt-lider" (daha parlak)
    accent: '176, 141, 79',
    dimAccent: '124, 140, 166',
    baseAlpha: 0.5,
    idleRadius: 0.22,      // mouse yokken lider noktanın dolaştığı alan (canvas oranı)
    idleSpeed: 0.15,
    leaderEase: 0.06,      // lider mouse'a ne kadar çabuk yaklaşsın
    mouseRadius: 999999,   // her zaman aktif — lider mouse'u takip eder
  }, options || {});

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouse = { x: -1000, y: -1000 };
  let leader = { x: 0, y: 0 };
  let history = [];
  let followers = [];
  let maxHistory = 1;

  function dims() {
    if (o.fullscreen) return { w: window.innerWidth, h: window.innerHeight };
    const r = canvas.getBoundingClientRect();
    return { w: Math.max(1, Math.round(r.width)), h: Math.max(1, Math.round(r.height)) };
  }

  function resize() {
    const d = dims();
    canvas.width = d.w;
    canvas.height = d.h;
    leader.x = canvas.width / 2;
    leader.y = canvas.height / 2;
    buildFollowers();
  }

  function buildFollowers() {
    followers = [];
    maxHistory = o.followerCount * o.delayStep + 5;
    history = new Array(maxHistory).fill(null).map(() => ({ x: leader.x, y: leader.y }));
    for (let i = 0; i < o.followerCount; i++) {
      const side = i % 2 === 0 ? 1 : -1;
      const rank = Math.floor(i / 2);
      followers.push({
        delay: (i + 1) * o.delayStep,
        offset: side * o.lateralGap * (rank + 1),
        isSubLeader: (i + 1) % o.subLeaderEvery === 0,
      });
    }
  }

  function idleTarget(time) {
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const rx = canvas.width * o.idleRadius;
    const ry = canvas.height * o.idleRadius;
    return {
      x: cx + Math.cos(time * o.idleSpeed) * rx,
      y: cy + Math.sin(time * o.idleSpeed * 1.3) * ry,
    };
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = performance.now() * 0.001;

    const target = mouse.x > -500 ? mouse : idleTarget(time);
    leader.x += (target.x - leader.x) * o.leaderEase;
    leader.y += (target.y - leader.y) * o.leaderEase;

    history.push({ x: leader.x, y: leader.y });
    if (history.length > maxHistory) history.shift();

    const leaderAngle = (() => {
      const prev = history[Math.max(history.length - 4, 0)];
      return Math.atan2(leader.y - prev.y, leader.x - prev.x) || 0;
    })();

    // lider ile ilk birkaç takipçi arasında ince "organizasyon" çizgileri
    followers.slice(0, 6).forEach((f) => {
      const idx = Math.max(history.length - 1 - f.delay, 0);
      const p = history[idx];
      ctx.beginPath();
      ctx.moveTo(leader.x, leader.y);
      ctx.lineTo(p.x, p.y);
      ctx.strokeStyle = `rgba(${o.dimAccent}, 0.06)`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    });

    followers.forEach((f) => {
      const idx = Math.max(history.length - 1 - f.delay, 0);
      const p = history[idx];
      const idx2 = Math.max(idx - 3, 0);
      const p2 = history[idx2];
      const heading = Math.atan2(p.y - p2.y, p.x - p2.x) || leaderAngle;
      const perpAngle = heading + Math.PI / 2;

      const fx = p.x + Math.cos(perpAngle) * f.offset;
      const fy = p.y + Math.sin(perpAngle) * f.offset;

      const depthFade = 1 - idx / maxHistory * 0.5;
      const alpha = (f.isSubLeader ? o.baseAlpha * 0.9 : o.baseAlpha * 0.45) * depthFade;
      const size = f.isSubLeader ? 2.2 : 1.3;
      const color = f.isSubLeader ? o.accent : o.dimAccent;

      // basit üçgen — hareket yönüne bakan takipçi
      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate(heading);
      ctx.beginPath();
      ctx.moveTo(size * 1.6, 0);
      ctx.lineTo(-size, size * 0.9);
      ctx.lineTo(-size, -size * 0.9);
      ctx.closePath();
      ctx.fillStyle = `rgba(${color}, ${alpha})`;
      ctx.fill();
      ctx.restore();
    });

    // lider noktası
    ctx.save();
    ctx.translate(leader.x, leader.y);
    ctx.rotate(leaderAngle);
    ctx.beginPath();
    ctx.moveTo(4, 0);
    ctx.lineTo(-2.5, 2.2);
    ctx.lineTo(-2.5, -2.2);
    ctx.closePath();
    ctx.fillStyle = `rgba(${o.accent}, 0.9)`;
    ctx.fill();
    ctx.restore();

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
// createLeadershipFormation(document.getElementById('leadership-bg'), { fullscreen: true });
