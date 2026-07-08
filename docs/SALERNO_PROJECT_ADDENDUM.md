# Salerno Projesi Ekleme — Claude Code Promptu

## Bağlam
Projeler sayfasında (ozyurt.dev/projects) Salerno Üniversitesi'ndeki (UNISA)
Erasmus+ stajım kapsamında yaptığım proje eksik. Aşağıdaki içeriği, mevcut
proje kartlarıyla AYNI yapıda (aynı component/şablon, aynı meta alanları:
başlık, taglar, teknoloji listesi, açıklama, tarih/kurum) projects sayfasına
ekle. Var olan başka hiçbir proje kartını değiştirme.

Eğer bir "kategori" veya "tag" sistemi varsa (örn. "Ürün" / "Araştırma" gibi),
bu projeyi **Araştırma** kategorisine koy — Ceviz gibi ürünleştirilmiş
çalışmalardan bilinçli olarak ayrışsın; bu bir "başarısız proje" değil, farklı
bir kategori (akademik/araştırma fizibilite çalışması).

## Eklenecek içerik (TR)

**Başlık:** HMD ile Gerçek Zamanlı Yüz Takibi — Bir Fizibilite Çalışması

**Alt başlık / one-liner:** Baş üstü ekranlarla (HMD) kullanıcının etrafındaki
kişilerin yüzlerini gerçek zamanlı takip etmenin ne kadar mümkün olduğunu
araştıran bir fizibilite çalışması.

**Kurum / Tarih:** Università degli Studi di Salerno (UNISA), Dipartimento di
Ingegneria Industriale — Erasmus+ staj, 1. sınıf, 2024

**Teknolojiler:** Unity, Unreal Engine, C#, Python, OpenCV, dlib, VGG Face, Varjo XR3

**Açıklama:**

Bu çalışmada, mevcut literatürün neredeyse tamamının HMD kullanıcısının
kendi yüzünü takip etmeye odaklandığını fark ettim — kullanıcının etrafındaki
kişileri takip etme tarafı büyük ölçüde boştu. Ben de bu boşluğu hedef aldım:
Varjo XR3 üzerinde gerçek zamanlı, çoklu yüz takibinin teknik olarak mümkün
olup olmadığını test ettim.

Üç farklı yaklaşımı denedim: dlib donanım uyumsuzluğu yüzünden çalışmadı;
OpenCV ile Python tarafında yüz tespiti başarıyla çalıştı ama Unity/Unreal
Engine ile senkronize etmeye çalıştığımda ciddi performans ve uyumluluk
sorunlarıyla karşılaştım; VGG Face teorik olarak en güçlü seçenekti ama aynı
entegrasyon sorunları onu da pratikte kullanılamaz hale getirdi.

Sonuç olarak, mevcut donanım (Varjo SDK'sinin yüz takibini doğrudan
desteklememesi), sınırlı uzmanlık kaynakları ve AB'nin bu alandaki belirli
araştırma/veri kısıtlamaları nedeniyle projenin o dönem için fizibil
olmadığına dürüstçe karar verdim. Bunu bir başarısızlık olarak değil, gerçek
bir "bu neden çalışmıyor" sorusuna erken ve net cevap bulma deneyimi olarak
görüyorum — sınırlı kaynaklarla yeni bir problem alanına girip sistematik
şekilde test etme ve sonucu olduğu gibi raporlama pratiği kazandım.

**Kısa versiyon (kart özeti için, açıklama alanı kısaysa):**

Varjo XR3 ile etraftaki kişilerin yüzünü gerçek zamanlı takip etmenin fizibilitesini
araştırdım (Unity/Unreal + OpenCV/dlib/VGG Face). Donanım desteği ve entegrasyon
kısıtları nedeniyle o dönem için fizibil olmadığı sonucuna vardım — literatürdeki
bir boşluğu hedefleyen, dürüst sonuçlanan bir araştırma denemesi.

## Notlar
- Bu proje Ceviz gibi "gerçek kullanıcıya ulaşan ürün" kategorisinde değil —
  ton buna göre ayarlanmalı: iddialı değil, dürüst ve öğrenme odaklı.
  Diğer proje kartlarındaki "ben gerçek ürün inşa ediyorum" tonuyla
  çelişmemesi için bunun bir *araştırma/fizibilite* çalışması olduğu net olsun.
- Danışman/hoca isimleri (Prof. Alessandro Naddeo, Dr. Bahar Çelik, Prof.
  Nicola Capetti, Dr. Carlotta Fontana) proje kartına eklenmesin — bu isimler
  zaten Testimonials taslağında (TESTIMONIALS_ADDENDUM.md) ayrı ele alınıyor,
  burada tekrar etmeye gerek yok.
- Varsa proje kartı görseli/thumbnail alanı: gerçek bir proje görseli yoksa
  şimdilik boş bırak, placeholder ekleme (sitede zaten bilinen bir boş
  görsel referansı sorunu var, tekrarlamayalım).
