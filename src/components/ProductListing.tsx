"use client";

import { useMemo, useState } from "react";
import { useCatalog, useSite } from "@/lib/catalog";
import { t } from "@/lib/site";
import type { Product } from "@/lib/types";
import { ProductCard } from "./ProductCard";

type Sort = "onerilen" | "fiyat-artan" | "fiyat-azalan";

export function ProductListing({
  products,
  categories,
}: {
  products: Product[];
  categories?: { slug: string; name: string }[];
}) {
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState<Sort>("onerilen");
  const { sizes } = useCatalog();
  const site = useSite();

  const availableSizes = useMemo(
    () => sizes.filter((s) => products.some((p) => p.sizes.includes(s.id))),
    [products, sizes],
  );

  const visible = useMemo(() => {
    const list = products.filter(
      (p) =>
        (!size || p.sizes.includes(size)) && (!category || p.category === category),
    );
    if (sort === "fiyat-artan") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "fiyat-azalan") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, size, category, sort]);

  return (
    <div className="listing">
      <div className="filters" role="group" aria-label="Ürün filtreleri">
        {categories && (
          <label>
            <span>{t(site, "txt_filter_category")}</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">{t(site, "txt_filter_all")}</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          <span>{t(site, "txt_filter_size")}</span>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">{t(site, "txt_filter_all")}</option>
            {availableSizes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>{t(site, "txt_sort")}</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="onerilen">{t(site, "txt_sort_recommended")}</option>
            <option value="fiyat-artan">{t(site, "txt_sort_price_asc")}</option>
            <option value="fiyat-azalan">{t(site, "txt_sort_price_desc")}</option>
          </select>
        </label>
        <p className="filters-count" aria-live="polite">
          {t(site, "txt_products_count", { n: visible.length })}
        </p>
      </div>

      {visible.length > 0 ? (
        <div className="product-grid">
          {visible.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>
      ) : (
        <p className="empty">{t(site, "txt_listing_empty")}</p>
      )}
    </div>
  );
}
