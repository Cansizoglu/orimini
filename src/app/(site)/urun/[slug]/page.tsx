import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductOrderPanel } from "@/components/ProductOrderPanel";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ProductReviews } from "@/components/ProductReviews";
import { Stars } from "@/components/Stars";
import { RichText } from "@/components/RichText";
import { iconFor } from "@/components/icons";
import { getContent, ratingFor, relatedProducts, reviewsFor } from "@/lib/content";
import { absoluteUrl, fill, findCategory, formatPrice, sizeRange, splitLine, stripHtml } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const { products } = await getContent();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { products } = await getContent();
  const product = products.find((p) => p.slug === slug);
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
  const content = await getContent();
  const { site, sizes, categories } = content;
  const product = content.products.find((p) => p.slug === slug);
  if (!product) notFound();

  const category = findCategory(categories, product.category);
  const related = relatedProducts(content, product);
  const availableSizes = sizes.filter((s) => product.sizes.includes(s.id)).map((s) => s.label);
  const reviews = reviewsFor(content, product.slug);
  const rating = ratingFor(content, product.slug);
  const trustItems = site.raw.product_trust_items
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = splitLine(fill(line, site));
      return parts.length >= 2 ? { icon: parts[0], text: parts.slice(1).join(" ") } : { icon: "kalp", text: parts[0] };
    });

  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.code,
    mpn: product.code,
    description: [product.shortDescription, stripHtml(product.description)].join(" ").trim(),
    image: product.images.map((i) => absoluteUrl(site, i.src)),
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
              Beden: <strong>{sizeRange(sizes, product)}</strong>
            </span>
          </div>
          <p className="price product-price">
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
            <span>{formatPrice(product.price)}</span>
          </p>
          <p className="price-note">{fill(site.raw.price_note, site)}</p>
          <p className="product-summary">{product.shortDescription}</p>

          <Suspense fallback={<div className="order-panel" aria-busy="true" />}>
            <ProductOrderPanel product={product} />
          </Suspense>

          {trustItems.length > 0 && (
            <ul className="mini-trust">
              {trustItems.map(({ icon, text }) => {
                const Icon = iconFor(icon);
                return (
                  <li key={text}>
                    <Icon size={20} /> {text}
                  </li>
                );
              })}
            </ul>
          )}

          <div className="details">
            {product.description && (
              <details open>
                <summary>Ürün açıklaması</summary>
                <RichText html={product.description} site={site} className="details-body" />
              </details>
            )}
            {product.setContents.length > 0 && (
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
            )}
            {(product.fabric || product.care.length > 0) && (
              <details>
                <summary>Kumaş ve bakım</summary>
                <div className="details-body">
                  {product.fabric && (
                    <p>
                      <strong>Kumaş:</strong> {product.fabric}
                    </p>
                  )}
                  {product.care.length > 0 && (
                    <ul>
                      {product.care.map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            )}
            {site.raw.product_shipping_text && (
              <details>
                <summary>Kargo, teslimat ve iade</summary>
                <RichText html={site.raw.product_shipping_text} site={site} className="details-body" />
              </details>
            )}
          </div>
        </div>
      </div>

      <ProductReviews
        productSlug={product.slug}
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
