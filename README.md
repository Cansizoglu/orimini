# Orimini

Kişiye özel nakışlı bebek ve çocuk kıyafetleri için Next.js (App Router) e-ticaret sitesi. Siparişler şimdilik WhatsApp (0506 273 59 29) üzerinden alınır.

## Geliştirme

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # üretim derlemesi
npm run lint
```

## Nerede ne var?

| Dosya | İçerik |
| --- | --- |
| `src/data/site.ts` | Firma adı, telefon, şehir, çalışma saatleri, ücretsiz kargo limiti, Instagram |
| `src/data/products.ts` | Kategoriler, yaş/beden listesi ve ürünler (fiyat, görsel, açıklama, set içeriği, bedenler) |
| `src/lib/whatsapp.ts` | WhatsApp sipariş mesajının metni |
| `src/lib/cart.tsx` | Tarayıcıda tutulan sepet |
| `public/images/` | Logo ve ürün fotoğrafları |

Yeni ürün eklemek için `products.ts` içindeki `products` listesine bir kayıt ekleyin; sayfa, sitemap ve yapısal veri otomatik oluşur. Kendi fotoğraflarınızı `public/images/urunler/` klasörüne koyup `src: "/images/urunler/dosya.webp"` şeklinde kullanın. Şu anki Unsplash görselleri ve fiyatlar örnektir.

## Yayına alma

Demo adresi https://orimini.vercel.app (varsayılan). Alan adı alınınca Vercel'de `NEXT_PUBLIC_SITE_URL` ortam değişkenine yeni adresi (ör. `https://www.orimini.com`) yazın. Canonical adresler, sitemap ve Open Graph etiketleri bu değeri kullanır.

## SEO

- Sayfa bazlı başlık/açıklama, canonical ve Open Graph etiketleri
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`
- JSON-LD: ClothingStore (Adana), Product + Offer, BreadcrumbList, CollectionPage, FAQPage
- Tüm ürün ve kategori sayfaları statik olarak üretilir

## Yönetim paneli (/admin)

Sitedeki tüm içerik (logo, iletişim, duyuru bandı, anasayfa bölümleri, bannerlar, ürünler, kategoriler,
bedenler, sayfalar, sözleşmeler, SSS, menüler, yorumlar, SEO) `/admin` panelinden yönetilir ve Supabase'de tutulur.
Supabase bağlı değilken site `src/data` altındaki kurulum verisiyle aynı şekilde açılır.

Kurulum:
1. Supabase SQL Editor'de sırasıyla `supabase/schema.sql` ve `supabase/seed.sql` dosyalarını çalıştırın.
2. Authentication > Users'tan admin kullanıcısını oluşturun, ardından yetki verin:
   `insert into admin_users (user_id, email) select id, email from auth.users where email = 'ornek@mail.com';`
3. Bağlantı bilgileri `src/lib/supabase/config.ts` içinde varsayılan olarak yazılıdır (proje `ldsjtlczbwzjwolgygti`).
   Başka bir projeye geçmek için Vercel'de `NEXT_PUBLIC_SUPABASE_URL` ve `NEXT_PUBLIC_SUPABASE_ANON_KEY` tanımlayın.

Şema ve kurulum verisi bu projeye 2026-10-03'te yüklendi; yalnızca 2. adım (admin kullanıcısı) kaldı.
Admin şifresi panelin Dashboard sayfasından değiştirilebilir.

`src/data` içeriği değişirse `npx tsx scripts/generate-seed.ts` ile `supabase/seed.sql` yeniden üretilir.
