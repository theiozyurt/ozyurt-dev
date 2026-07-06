# Prompt — Projects ve Leadership İçerik Dökümü İsteği

Bu bir kod değişikliği talebi DEĞİL — mevcut durumun raporunu istiyoruz, ki İsmail ve Claude (sohbet) birlikte içeriği gözden geçirip zenginleştirebilsin.

## İstenen

Lütfen şu anda `/projects` ve `/leadership` ile ilgili yazılmış TÜM içeriği (JSON verileri + sayfa metinleri + varsa açıklama/bullet noktaları) TEK BİR MARKDOWN DOSYASI olarak dışa aktar. Bu dosya kod İÇERMEYECEK (CSS/HTML/JS yok), sadece İÇERİK — okunabilir, düzenlenebilir bir formatta.

## Format

```markdown
# Projects — Mevcut İçerik Dökümü

## [Proje Adı 1]
- Slug: ...
- Tip/Kategori: ...
- Açıklama (EN): ...
- Açıklama (TR): ...
- Bullet noktaları: ...
- Teknolojiler/Taglar: ...
- Galeri: [görsel var mı, kaç adet, placeholder mı gerçek mi]
- Linkler: (varsa GitHub, canlı site vb.)

## [Proje Adı 2]
... (aynı format, her proje için)

---

# Leadership — Mevcut İçerik Dökümü

## [Faaliyet Adı 1]
- Slug: ...
- Rol: ...
- Kurum/Topluluk: ...
- Tarih aralığı: ...
- Açıklama (EN): ...
- Açıklama (TR): ...
- Bullet noktaları: ...
- Galeri: [durum]

## [Faaliyet Adı 2]
... (aynı format)
```

## Neden bu isteniyor

Şu ana kadar birçok ek prompt (`PROJECT_BRIEF.md`, `CONTENT_CORRECTIONS_AND_CARD_INTERACTION_ADDENDUM.md`, `CEVIZ_WEBSITES_ADDENDUM.md`, `GALLERY_PATTERN_GENERALIZATION_ADDENDUM.md` vb.) üzerinden Projects ve Leadership sayfalarına içerik eklendi/düzeltildi. Ama bu içeriğin SON HALİNİN TAMAMINI göremiyoruz — hangi projelerin ne kadar detaylı yazıldığını, hangi bullet noktalarının eklendiğini, nerede boşluk kaldığını bilmiyoruz. Bu dökümü aldıktan sonra İsmail ve Claude (sohbet arayüzünde) içeriği birlikte gözden geçirip:
- Eksik/zayıf kalan açıklamaları zenginleştirecek
- Yanlış/eski bilgileri düzeltecek
- Hangi projelerin daha fazla detay hak ettiğine karar verecek

Bu döküm ÇIKTIKTAN SONRA, üzerinde yapılan düzenlemeler yeni bir ek prompt olarak tekrar Claude Code'a verilecek.

## Format notu

Markdown dosyasını doğrudan sohbete YAPIŞTIRABİLİR ya da bir `.md` dosyası olarak paylaşabilirsiniz — ikisi de çalışır, önemli olan içeriğin TAMAMININ (kısaltılmadan, özetlenmeden) burada görünmesi.
