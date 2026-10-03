"use client";

import Link from "next/link";
import { useCatalog } from "@/lib/catalog";
import { findCategory, formatPrice, sizeRange, t } from "@/lib/site";
import type { Product } from "@/lib/types";
import { FavoriteButton } from "./FavoriteButton";
import { SafeImage } from "./SafeImage";
import { Stars } from "./Stars";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { categories, sizes, ratings, site } = useCatalog();
  const cover = product.images[0];
  const rating = ratings[product.slug] ?? { count: 0, average: 0 };
  return (
    <article className="product-card">
      <Link href={`/urun/${product.slug}`} className="product-card-link">
        <div className="product-card-media">
          <SafeImage
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            priority={priority}
          />
          {product.badges.length > 0 && (
            <div className="badges">
              {product.badges.slice(0, 2).map((b) => (
                <span key={b} className={`badge badge-${b === t(site, "txt_sale_badge") ? "sale" : "soft"}`}>
                  {b}
                </span>
              ))}
            </div>
          )}
          <FavoriteButton slug={product.slug} name={product.name} />
        </div>
        <div className="product-card-body">
          <p className="product-card-cat">{findCategory(categories, product.category)?.shortName}</p>
          <h3 className="product-card-title">{product.name}</h3>
          <p className="product-card-sizes">{sizeRange(sizes, product)}</p>
          <p className="product-card-rating">
            <Stars value={rating.average} size={14} />
            <span>({rating.count})</span>
          </p>
          <p className="price">
            {product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}
            <span>{formatPrice(product.price)}</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
