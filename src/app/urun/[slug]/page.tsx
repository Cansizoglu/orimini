import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard, sizeRange } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductOrderPanel } from "@/components/ProductOrderPanel";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ProductReviews } from "@/components/ProductReviews";
import { Stars } from "@/components/Stars";
import { getRatingSummary, getReviews } from "@/data/reviews";
import { NeedleIcon, TruckIcon, ShieldIcon, HeartIcon } from "@/components/icons";
import {
  formatPrice,
  getCategory,
  getProduct,
  getRelatedProducts,
  products,
  SIZES,
} from "@/data/products";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

const absolute = (src: string) => (src.startsWith("http") ? src : `${site.url}${src}`);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const { title, description } = product.seo;
  return {
    title,
    description,
    alternates: { canonical: `/urun/${product.slug}` },
    openGraph: {
      type: "website",
      title,
      description,
      url: `/urun/${product.slug}`,
      images: product.images.map((i) => ({ url: i.src, alt: i.alt })),
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);
  const availableSizes = SIZES.filter((s) => product.sizes.includes(s.id)).map((s) => s.label);
  const reviews = getReviews(product.slug);
  const rating = getRatingSummary(product.slug);

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    mpn: product.code,
    description: [product.shortDescription, ...product.description].join(" "),
    image: product.images.map((i) => absolute(i.src)),
    brand: { "@type": "Brand", name: site.name },
    category: category?.name,
    color: product.color,
    material: product.fabric,
    size: availableSizes.join(", "),
    offers: {
      "@type": "Offer",
      url: `${site.url}/urun/${product.slug}`,
      priceCurrency: "TRY",
      price: product.price,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.name },
    },
    ...(rating.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: rating.average,
            reviewCount: rating.count,
            bestRating: 5,
            worstRating: 1,
          },
          review: reviews.slice(0, 10).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.author },
            datePublished: r.date,
            reviewBody: r.comment,
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
          })),
        }
      : {}),
  };

  return (
    <div className="container">
      <Breadcrumbs
        items={[
          ...(category ? [{ name: category.name, href: `/kategori/${category.slug}` }] : []),
          { name: product.name, href: `/urun/${product.slug}` },
        ]}
      />

      <div className="product-layout">
        <ProductGallery images={product.images} name={product.name} />

        <div className="product-info">
          <div className="product-title-row">
            <p className="eyebrow">{category?.name}</p>
            <FavoriteButton slug={product.slug} name={product.name} variant="inline" />
          </div>
          <h1>{product.name}</h1>
          <a href="#yorumlar" className="rating-link">
            <Stars value={rating.average} size={16} />
            <span>{rating.count > 0 ? `${rating.average.toLocaleString("tr-TR")} · ${rating.count} yorum` : "Henüz yorum yok · İlk yorumu yazın"}</span>
          </a>
          <div className="product-meta">
            <span>
              Ürün kodu: <strong>{product.code}</strong>
            </span>
            <span>
              Renk: <strong>{product.color}</strong>
            </span>
            <span>
              Beden: <strong>{sizeRange(product)}</strong>
            </span>
          </div>
          <p className="price product-price">
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
            <span>{formatPrice(product.price)}</span>
          </p>
          <p className="price-note">
            {formatPrice(site.freeShippingLimit)} ve üzeri siparişlerde kargo ücretsiz. Ödeme ve teslimat WhatsApp
            üzerinden netleştirilir.
          </p>
          <p className="product-summary">{product.shortDescription}</p>

          <Suspense fallback={<div className="order-panel" aria-busy="true" />}>
            <ProductOrderPanel product={product} />
          </Suspense>

          <ul className="mini-trust">
            <li>
              <NeedleIcon size={20} /> Ücretsiz isim nakışı
            </li>
            <li>
              <HeartIcon size={20} /> El emeği dikim
            </li>
            <li>
              <TruckIcon size={20} /> Türkiye geneli kargo
            </li>
            <li>
              <ShieldIcon size={20} /> Nakış onayı sonrası üretim
            </li>
          </ul>

          <div className="details">
            <details open>
              <summary>Ürün açıklaması</summary>
              <div className="details-body">
                {product.description.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </details>
            <details>
              <summary>Set içeriği</summary>
              <div className="details-body">
                <ul>
                  {product.setContents.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </details>
            <details>
              <summary>Kumaş ve bakım</summary>
              <div className="details-body">
                <p>
                  <strong>Kumaş:</strong> {product.fabric}
                </p>
                <ul>
                  {product.care.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </details>
            <details>
              <summary>Kargo, teslimat ve iade</summary>
              <div className="details-body">
                <p>
                  Siparişler nakış onayından sonra hazırlanır ve genellikle 3-7 iş günü içinde kargoya verilir.{" "}
                  {site.city} içi elden teslim için bizimle iletişime geçebilirsiniz.
                </p>
                <p>
                  Kişiye özel nakış işlenen ürünlerde, üretim hatası dışında iade ve değişim yapılamaz. Ayrıntılar
                  için <Link href="/kargo-ve-iade">Kargo ve İade</Link> sayfasına bakın.
                </p>
              </div>
            </details>
          </div>
        </div>
      </div>

      <ProductReviews
        productName={product.name}
        productCode={product.code}
        reviews={reviews}
        average={rating.average}
      />

      {related.length > 0 && (
        <section className="section" aria-labelledby="benzer-urunler">
          <div className="section-head">
            <h2 id="benzer-urunler">Bunları da beğenebilirsiniz</h2>
          </div>
          <div className="product-grid">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}

      <JsonLd data={productLd} />
    </div>
  );
}
