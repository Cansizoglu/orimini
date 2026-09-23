import Link from "next/link";
import { formatPrice, getCategory, SIZES, type Product } from "@/data/products";
import { getRatingSummary } from "@/data/reviews";
import { FavoriteButton } from "./FavoriteButton";
import { SafeImage } from "./SafeImage";
import { Stars } from "./Stars";

export function sizeRange(product: Product) {
  const labels = SIZES.filter((s) => product.sizes.includes(s.id)).map((s) => s.label);
  return labels.length > 1 ? `${labels[0]} – ${labels[labels.length - 1]}` : labels[0];
}

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const cover = product.images[0];
  const rating = getRatingSummary(product.slug);
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
          {product.badges && product.badges.length > 0 && (
            <div className="badges">
              {product.badges.slice(0, 2).map((b) => (
                <span key={b} className={`badge badge-${b === "İndirim" ? "sale" : "soft"}`}>
                  {b}
                </span>
              ))}
            </div>
          )}
          <FavoriteButton slug={product.slug} name={product.name} />
        </div>
        <div className="product-card-body">
          <p className="product-card-cat">{getCategory(product.category)?.shortName}</p>
          <h3 className="product-card-title">{product.name}</h3>
          <p className="product-card-sizes">{sizeRange(product)}</p>
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
