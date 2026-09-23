"use client";

import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getProduct } from "@/data/products";
import { useFavorites } from "@/lib/favorites";

export function FavoritesList() {
  const { slugs, ready } = useFavorites();
  if (!ready) return <div className="empty" aria-busy="true" />;
  const items = slugs.flatMap((s) => {
    const p = getProduct(s);
    return p ? [p] : [];
  });
  if (items.length === 0) {
    return (
      <div className="cta-box" style={{ marginBottom: 60 }}>
        <h2>Henüz favori ürününüz yok</h2>
        <p>Ürünlerin üzerindeki kalbe dokunarak beğendiklerinizi buraya ekleyebilirsiniz.</p>
        <Link href="/urunler" className="btn btn-primary">
          Ürünlere göz at
        </Link>
      </div>
    );
  }
  return (
    <div className="product-grid" style={{ paddingBottom: 60 }}>
      {items.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
