# Ek Prompt — /goals Sayfası + Hero Strip Güncellemesi

## Karar

Şirket kurma hedefi artık hero'da AÇIKÇA belirtilmeyecek. Bunun yerine ayrı, kendine ait bir `/goals` ("Hayaller / Hedefler") sayfası oluşturulacak. Hero sadece bu sayfaya dair bir merak/teaser bırakacak, hedefi kendisi söylemeyecek.

## 1. Hero strip güncellemesi

`PROJECT_BRIEF.md` madde 3.5 ve `HERO_AND_BACKGROUND_ADDENDUM.md`'deki hero'nun 3'lü strip bölümündeki üçüncü kutu ("ahead — A company of my own") DEĞİŞECEK:

**Eski:**
```html
<div class="strip-item">
  <span class="strip-label">ahead</span>
  <span class="strip-title">A company of my own</span>
  <span class="strip-sub">In progress</span>
</div>
```

**Yeni:**
```html
<a href="/goals" class="strip-item strip-item-link">
  <span class="strip-label">ahead</span>
  <span class="strip-title">See where this is going</span>
  <span class="strip-sub">→ Goals</span>
</a>
```

Bu kutu artık tıklanabilir bir link (`<a>` etiketi), `/goals` sayfasına gidiyor. Hover durumunda `--accent` renginde ince bir alt çizgi ya da renk geçişi eklenebilir (mevcut `.strip-item` stiline ek, kutu şekli değişmiyor).

## 2. Yeni sayfa: /goals

Site haritasına eklenecek: `src/pages/goals.astro`

### İçerik yapısı

- **Başlık:** "Where this is going" (EN) / "Bu nereye gidiyor" (TR)
- **Ana anlatı bloğu:** Burada inşa etme tutkusu ve gelecek vizyonu daha yumuşak, açık uçlu bir çerçevede anlatılıyor. ÖNEMLİ: "Kendi şirketimi kuracağım" gibi kesin/nihai bir iddia YAPILMIYOR — bu, işverenlere "bu kişi zaten ayrılacak" sinyali verdiği için kullanıcı tarafından reddedildi. Bunun yerine "inşa etmeyi, liderlik etmeyi seviyorum, uzun vadede tam şekli hâlâ netleşiyor" tonu kullanılacak.

**EN (onaylandı, kullan):**
> I care about building things that work end-to-end — from an idea to something people actually use. That's what draws me to Ceviz Biyoteknoloji, to research, and to every project I take on. I'm still figuring out exactly what shape that takes long-term, but I know I want to keep building, leading, and learning how great products and teams come together.

**TR (onaylandı, kullan):**
> Beni asıl motive eden şey, bir fikri baştan sona gerçek bir ürüne dönüştürmek — insanların gerçekten kullandığı bir şeye. Ceviz Biyoteknoloji'de, araştırmalarımda ve üstlendiğim her projede beni çeken şey bu. Bunun uzun vadede tam olarak nasıl bir şekil alacağını hâlâ keşfediyorum, ama inşa etmeye, liderlik etmeye ve harika ürünlerin/ekiplerin nasıl bir araya geldiğini öğrenmeye devam etmek istediğimi biliyorum.

- **İkincil blok (opsiyonel ama önerilir):** Neden Selçuk Bayraktar tipi bir girişimci olmak istediğine dair kısa bir paragraf (kullanıcının uzun vadeli ilham kaynağı, önceki konuşmalardan biliniyor) — eğer kullanıcı bunu paylaşmak isterse.
- **Görsel:** Bu sayfa da hero'daki tasarım sistemini (ghost number, terminal CTA, pixel twinkle arka plan) taşıyacak — `02` gibi bir ghost number, sayfanın site haritasındaki sırasına göre.

### Tasarım notu

Bu sayfa diğer sayfalardan (deneyim, projeler) farklı olarak daha kişisel/manifesto tonunda olabilir — Manrope gövde metni yerine kısmi olarak `--font-display` (Pixelify Sans) ile büyük, vurgulu alıntı blokları kullanılabilir, tıpkı hero'daki `border-left` alıntı stilinde.

## 3. Site haritası güncellemesi

`PROJECT_BRIEF.md` madde 4'teki site haritasına eklenecek:

```
/goals           → Hayaller/Hedefler sayfası (şirket kurma hedefi, akademi/kurumsal deneyimin bu hedefe giden yol olarak çerçevelenmesi — hero'dan taşınan içerik burada genişletiliyor)
```

Nav menüsüne de eklenmesi önerilir (Deneyim, Projeler, Liderlik, CV, İletişim'in yanına).
