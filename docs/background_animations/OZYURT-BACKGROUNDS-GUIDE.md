# ozyurt.dev — Sayfa Bazlı Arka Plan Animasyonları

Her sayfa için `bg.js`'teki DNA helix ile aynı mimaride (fullscreen/kart modu,
resize, mouse etkileşimi, `prefers-reduced-motion` desteği) ama içeriğe özgü
farklı bir motif. Hepsi vanilla JS, bağımlılık yok.

## Sayfa → Dosya → Motif eşleşmesi

| Sayfa | Dosya | Motif | Accent |
|---|---|---|---|
| **Ana Sayfa** (kişisel imza) | `compass-bearing.js` | Pusula/Rota — merkezde pusula gülü, mouse'a yönelen ibre, ambient radar taraması, rota çizgisi üzerinde derece okuması | `176, 141, 79` (brass) |
| Deneyim | `flight-path.js` | Uçuş Rotası — kayan, iz bırakan parçacık şeritleri | `176, 141, 79` |
| Projeler | `node-network.js` | Düğüm Ağı — organik, birbirine bağlanan noktalar | `176, 141, 79` |
| Hedefler | `ascending-trail.js` | Yükselen İz — aşağıdan yukarı süzülen kıvılcımlar | `176, 141, 79` |
| CV | `terminal-grid.js` | Terminal Grid — seyrek flicker eden karakter ızgarası | `176, 141, 79` |
| İletişim | `signal-pulse.js` | Sinyal Dalgası — yayılan radar pingleri, tıklayınca yeni ping | `176, 141, 79` |
| **Ceviz Biotech sayfası/kartları** | `bg.js` (mevcut, değişmedi) | DNA Helix | `107, 183, 255` (mavi — Ceviz'in kendi kimliği) |

**Önemli ayrım:** DNA helix artık SADECE Ceviz'den bahsedilen sayfa/bölümlerde
kullanılıyor (örn. Ceviz case study sayfası, "deneyim" bölümündeki Ceviz kartı).
Ana Sayfa genelinde kişisel imza olan Pusula/Rota geçerli. Bu ikisinin görsel
olarak net ayrışması bilinçli — ziyaretçi "bu İsmail'in kişisel markası, bu da
Ceviz'in" ayrımını arka planlardan bile hissetmeli.

Tüm sayfa-özel motifler brass (`176, 141, 79` = `--accent: #B08D4F`) kullanıyor,
sadece Ceviz mavi tonunu (`107, 183, 255`) koruyor — bu tutarlılık site genelinde
"bu benim, bu Ceviz'in" ayrımını görsel olarak da netleştiriyor.

---

## HTML (her sayfa için aynı desen)

```html
<canvas id="page-bg"></canvas>
<!-- sayfa içeriği -->
<script src="/scripts/flight-path.js"></script> <!-- ilgili dosya -->
<script>
  createFlightPath(document.getElementById('page-bg'), { fullscreen: true });
</script>
```

Astro'da bunu her sayfanın layout'una (ya da ortak `<BackgroundCanvas />`
component'ine) `motif` prop'uyla parametrize edip tek component'ten
yönetmek daha temiz olur:

```astro
---
// src/components/PageBackground.astro
const { motif = 'helix' } = Astro.props;
const scriptMap = {
  compass: '/scripts/compass-bearing.js',
  helix: '/scripts/bg.js',
  flight: '/scripts/flight-path.js',
  nodes: '/scripts/node-network.js',
  trail: '/scripts/ascending-trail.js',
  grid: '/scripts/terminal-grid.js',
  signal: '/scripts/signal-pulse.js',
};
const initMap = {
  compass: `createCompassBearing(document.getElementById('page-bg'), { fullscreen: true });`,
  helix: `createHelix(document.getElementById('page-bg'), { fullscreen: true });`,
  flight: `createFlightPath(document.getElementById('page-bg'), { fullscreen: true });`,
  nodes: `createNodeNetwork(document.getElementById('page-bg'), { fullscreen: true });`,
  trail: `createAscendingTrail(document.getElementById('page-bg'), { fullscreen: true });`,
  grid: `createTerminalGrid(document.getElementById('page-bg'), { fullscreen: true });`,
  signal: `createSignalPulse(document.getElementById('page-bg'), { fullscreen: true });`,
};
---
<canvas id="page-bg"></canvas>
<script src={scriptMap[motif]}></script>
<script set:html={initMap[motif]}></script>
```

Kullanım: `<PageBackground motif="compass" />` (Ana Sayfa'da, varsayılan),
`<PageBackground motif="helix" />` (sadece Ceviz case study sayfasında),
`<PageBackground motif="flight" />` (Deneyim'de), `<PageBackground motif="grid" />` (CV'de), vb.

---

## CSS (aynı, `bg.js` kılavuzundaki gibi)

```css
#page-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -3;
  pointer-events: none;
}
```

---

## Sayfa özelinde ince ayar notları

- **Ana Sayfa (`compass-bearing.js`):** Mouse hareket etmezken ibre
  `sweepAngle`'ı takip ederek yavaşça döner — sayfa hiç etkileşim almasa
  bile "canlı" durur. `sweepSpeed`'i düşürmek (`0.12`) daha sakin, yükseltmek
  (`0.4`) daha "radar/HUD" hissi verir. `showBearingLabel: false` yaparsan
  derece okuması kaybolur, sadece ibre + pusula kalır (daha minimal).
- **CV (`terminal-grid.js`):** `baseAlpha` bilerek çok düşük (`0.05`) — bu
  sayfa metin/okuma ağırlıklı, arka plan asla dikkat çekmemeli. Daha da
  sessiz istersen `flickerChance`'i `0.001`'e çek.
- **Projeler (`node-network.js`):** `nodeCount` canvas alanına göre otomatik
  ölçekleniyor; çok kalabalık hissediyorsa `nodeCount: 40` dene.
- **İletişim (`signal-pulse.js`):** `clickSpawn: true` sayesinde ziyaretçi
  tıkladığında da bir ping yayılır — küçük bir "mesaj gönderiyor" hissi;
  istemezsen `false` yap.
- **Hedefler (`ascending-trail.js`):** `mouseBoost` mouse yakınında
  parçacıkların ekstra hızlanmasını kontrol eder; sayfa çok "canlı"
  hissettiriyorsa `1.1`'e düşür.
- **Deneyim (`flight-path.js`):** `laneCount` arttıkça daha yoğun ama daha
  fazla FPS maliyeti; mobilde `laneCount: 3-4` önerilir.

---

## Performans / erişilebilirlik (tüm dosyalar için ortak)

- Hepsi `prefers-reduced-motion: reduce` durumunda tek kare çizip döngüyü
  hiç kurmuyor — `bg.js` ile aynı davranış.
- Her fonksiyon kendi `resize`/`mousemove` dinleyicisini `window`'a ekliyor;
  aynı anda birden fazla canvas'ta farklı motif çalıştırırsan (örn. bir
  sayfada iki bölüm) dinleyici sayısı artar — performans sorununda ilk
  bakılacak yer burası.
- Mobilde tüm motiflerde parçacık/hücre sayısını (`particleCount`,
  `nodeCount`, `trailCount`, cellSize'ı büyülterek grid yoğunluğunu) düşürmen
  önerilir; `window.innerWidth < 768` kontrolüyle options objesini koşullu
  oluşturabilirsin.
