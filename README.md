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
