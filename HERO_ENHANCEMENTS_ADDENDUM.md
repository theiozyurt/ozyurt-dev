# Ek Prompt — Hero Geliştirmeleri (Typewriter, Teknik Overview, Fotoğraf)

Bu dosya hero bölümüne üç geliştirme ekler. Önceki hero yapısı (`PROJECT_BRIEF.md` madde 3.5, `HERO_AND_BACKGROUND_ADDENDUM.md`'deki güncellenmiş metinle birlikte) temel alınır, üzerine eklenir — silinmez.

## 1. Terminal-stili typewriter animasyonu

Hero headline'ının altına, subtext'ten önce ya da sonra, dönen/yazılan bir satır eklenecek. Zaten kurulu terminal CTA sistemiyle (`TYPOGRAPHY_AND_BUTTONS_ADDENDUM.md`'deki `[ ]` ve `_` imleç dili) aynı görsel dili kullanacak.

### İçerik (sırayla dönecek satırlar)

```js
const typewriterLines = [
  "building at Ceviz Biyoteknoloji",
  "researching computer vision at Salerno",
  "leading algorithm design on an international ML project"
];
```

### Görsel format

```
> building at Ceviz Biyoteknoloji_
```

`>` işareti sabit (terminal prompt hissi), metin harf harf yazılıyor, tamamlanınca birkaç saniye bekliyor, sonra harf harf siliniyor, sıradaki satıra geçiyor. İmleç (`_`) sürekli yanıp sönüyor.

### Implementasyon

```html
<div class="hero-typewriter">
  <span class="tw-prompt">&gt;</span>
  <span class="tw-text" id="tw-text"></span>
  <span class="tw-cursor">_</span>
</div>
```

```css
.hero-typewriter {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-body);
  margin: 1rem 0 2rem;
}
.tw-prompt { color: var(--accent); margin-right: 8px; }
.tw-cursor {
  color: var(--accent);
  animation: blink 1s step-start infinite;
}
```

```js
function typewriterEffect(elementId, lines, typeSpeed = 60, pauseMs = 1800, deleteSpeed = 30) {
  const el = document.getElementById(elementId);
  let lineIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = lines[lineIndex];
    if (!deleting) {
      el.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, pauseMs);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      el.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
      setTimeout(tick, deleteSpeed);
    }
  }
  tick();
}
```

**Erişilebilirlik — ZORUNLU:** `prefers-reduced-motion: reduce` tespit edilirse animasyon çalışmayacak, bunun yerine ilk satır statik olarak gösterilecek:
```js
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.getElementById('tw-text').textContent = typewriterLines[0];
} else {
  typewriterEffect('tw-text', typewriterLines);
}
```

## 2. Somut teknik overview cümlesi

Hero subtext'inin altına (ya da subtext'e entegre), Barış'ın sitesindeki gibi kanıtlanabilir/somut bir teknik özet cümlesi eklenecek. Amaç: "journey" anlatısının hemen ardından "ama somut olarak ne yapıyorum" sorusunu yanıtlamak.

**EN (taslak, İsmail'in gerçek stack'ine göre netleştirilmeli):**
> Flutter, Firebase, and Python — building products that ship, not just prototypes. Currently developing a DICOM anonymization pipeline and leading algorithm design for an international ML research project.

**TR:**
> Flutter, Firebase ve Python — prototip değil, gerçekten kullanılan ürünler üretiyorum. Şu an bir DICOM anonimleştirme pipeline'ı geliştiriyor ve uluslararası bir ML araştırma projesinde algoritma tasarımına liderlik ediyorum.

Bu cümle `Manrope` fontuyla, normal gövde metni boyutunda (14-15px), `--text-body` renginde yazılacak — hero'nun "iddialı" kısmı headline'da kalıyor, bu satır daha "kanıt" fonksiyonu görüyor.

## 3. Gerçek fotoğraf yerleşimi

Kullanıcı gerçek kişisel fotoğrafını kullanmaya karar verdi (henüz dosya sağlanmadı — placeholder ile ilerlenecek, kullanıcı fotoğrafı sağladığında `/public/images/portrait.jpg` yoluna eklenecek).

### Yerleşim

Hero'yu iki kolonlu bir grid'e çevir: sol tarafta mevcut metin içeriği (eyebrow, headline, typewriter, subtext, overview cümlesi, CTA'lar), sağ tarafta fotoğraf.

```html
<section class="hero">
  <div class="hero-grid">
    <div class="hero-content">
      <!-- mevcut hero içeriği -->
    </div>
    <div class="hero-photo">
      <img src="/images/portrait.jpg" alt="İsmail Özyurt" />
    </div>
  </div>
</section>
```

```css
.hero-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr;
  gap: 3rem;
  align-items: center;
}
.hero-photo img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border: 2px solid var(--accent);
  border-radius: 0; /* KESKIN KÖŞE, tasarım sistemine sadık kal */
  filter: grayscale(20%) contrast(1.05); /* hafif tonlama, paletle uyum için — opsiyonel, çok agresif olmasın */
}
```

**Mobilde:** `grid-template-columns: 1fr` tek kolona düşer, fotoğraf metnin üstünde ya da altında gösterilir (tercihen üstte, `order: -1` ile).

**Placeholder notu:** Fotoğraf dosyası henüz yok. Claude Code, `/public/images/portrait.jpg` yolunu koduna referans olarak yazsın ama dosya sağlanana kadar CSS'te bir `background: var(--bg-primary-darker)` fallback/placeholder kutusu göstersin, kırık görsel ikonu görünmesin.

### Nerede kullanılacak
- Hero'da (madde 1-2'deki güncellemelerle birlikte) — ana kullanım
- İstersen `/contact` sayfasında da küçük bir versiyon tekrar kullanılabilir (opsiyonel, zorunlu değil)
