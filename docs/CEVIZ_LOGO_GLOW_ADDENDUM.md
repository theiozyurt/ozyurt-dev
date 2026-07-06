# Ek Prompt — Ceviz Biyoteknoloji Logosu (Glow Efektli) Terminal Splash'te

## Dosya konumu

Logo zaten `/public/images/ceviztek.png` yoluna eklendi. Kod bu yolu referans alacak.

## Neden bu logo kullanılabilir

Diğer kurumların (Teknofest, Deneyap, KSBÜ, Gürok Group, Güral Porselen, Salerno Üniversitesi) logoları telif/marka riski nedeniyle kullanılmıyordu (bkz. `SPLASH_SCREEN_ADDENDUM.md`). Ceviz Biyoteknoloji istisna, çünkü kullanıcı o şirkette proje ortağı — kendi şirketinin logosunu kullanma hakkı var.

## Glow rengi — Claude Code kendi belirleyecek

**ÖNEMLİ:** Glow rengi logonun kendi baskın rengiyle eşleşmeli (örneğin logo yeşilse yeşil glow, maviyse mavi glow — marka tutarlılığı için). Claude Code dosya sistemine erişimi olduğu için `/public/images/ceviztek.png` dosyasını doğrudan inceleyip logonun baskın/marka rengini tespit edecek ve aşağıdaki `--ceviz-glow-color` değişkenine o rengin hex kodunu girecek. Emin olamazsa, logoyu görsel olarak inceleyip en belirgin/canlı rengi seçecek (genelde bir marka logosunun vurgu rengi olur, arka plan/nötr renk değil).

## Uygulama

### HTML — boot sekansına entegrasyon

Logo, boot satırları başlamadan HEMEN ÖNCE, terminal penceresinin üst kısmında kısa bir an belirecek, ardından "loading: ceviz_biyoteknoloji" satırı yazılırken o satırın hemen solunda küçük bir ikon olarak kalacak:

```html
<div class="terminal-body" id="splash-lines">
  <div class="ceviz-logo-reveal" id="ceviz-logo">
    <img src="/images/ceviztek.png" alt="Ceviz Biyoteknoloji" class="ceviz-logo-img" />
  </div>
  <!-- boot satırları buraya JS ile ekleniyor -->
</div>
```

### CSS — glow efekti

```css
:root {
  --ceviz-glow-color: #___; /* Claude Code, ceviztek.png dosyasını inceleyip logonun baskın rengini buraya girecek */
}

.ceviz-logo-reveal {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  opacity: 0;
  animation: logo-appear .6s ease forwards;
}
.ceviz-logo-img {
  height: 48px;
  width: auto;
  filter:
    drop-shadow(0 0 6px var(--ceviz-glow-color))
    drop-shadow(0 0 14px var(--ceviz-glow-color));
  animation: logo-pulse 2.5s ease-in-out infinite;
}
@keyframes logo-appear {
  to { opacity: 1; }
}
@keyframes logo-pulse {
  0%, 100% {
    filter:
      drop-shadow(0 0 6px var(--ceviz-glow-color))
      drop-shadow(0 0 14px var(--ceviz-glow-color));
  }
  50% {
    filter:
      drop-shadow(0 0 10px var(--ceviz-glow-color))
      drop-shadow(0 0 22px var(--ceviz-glow-color));
  }
}

/* Erişilebilirlik — hareket hassasiyeti olan kullanıcılar için */
@media (prefers-reduced-motion: reduce) {
  .ceviz-logo-img {
    animation: none;
    filter: drop-shadow(0 0 8px var(--ceviz-glow-color)); /* sabit, hafif glow — pulsing yok */
  }
  .ceviz-logo-reveal {
    animation: none;
    opacity: 1;
  }
}
```

### Zamanlama

- Logo, splash başladığında (`runSplash()` çağrıldığında) hemen görünür, `logo-appear` ile 0.6 saniyede fade-in yapar.
- Boot satırları logo göründükten ~300ms sonra yazılmaya başlar (mevcut `runSplash()` fonksiyonuna küçük bir `setTimeout` eklenerek).
- Logo, splash kapanana kadar (tüm boot satırları bitip `finishSplash()` çağrılana kadar) ekranda glow'lu şekilde kalır, splash'le birlikte fade-out olur.

### Boyut ve konum notu

- Logo yüksekliği `48px` — terminal penceresinin `min-height: 220px` içinde orantılı, satırları ezmeyecek.
- Ortalanmış (`justify-content: center`), terminal başlık çubuğunun hemen altında, ilk boot satırından önce.
- `ceviztek.png` şeffaf arka planlıysa (muhtemelen öyledir) glow efekti temiz görünecek; eğer düz/opak arka planlıysa Claude Code görseli incelerken bunu da kontrol edip gerekirse kullanıcıya "arka planı şeffaf bir versiyon gerekiyor" diye geri bildirim verecek.
