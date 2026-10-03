"use client";

import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { useCatalog } from "@/lib/catalog";
import { useFavorites } from "@/lib/favorites";
import { t } from "@/lib/site";

export function FavoritesList() {
  const { slugs, ready } = useFavorites();
  const { getProduct, site } = useCatalog();
  if (!ready) return <div className="empty" aria-busy="true" />;
  const items = slugs.flatMap((s) => {
    const p = getProduct(s);
    return p ? [p] : [];
  });
  if (items.length === 0) {
    return (
      <div className="cta-box" style={{ marginBottom: 60 }}>
        <h2>{t(site, "txt_fav_empty_title")}</h2>
        <p>{t(site, "txt_fav_empty_text")}</p>
        <Link href="/urunler" className="btn btn-primary">
          {t(site, "txt_fav_empty_button")}
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
