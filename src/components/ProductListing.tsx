"use client";

import { useMemo, useState } from "react";
import { SIZES, type Product } from "@/data/products";
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

  const availableSizes = useMemo(
    () => SIZES.filter((s) => products.some((p) => p.sizes.includes(s.id))),
    [products],
  );

  const visible = useMemo(() => {
    const list = products.filter(
      (p) =>
        (!size || p.sizes.includes(size as Product["sizes"][number])) && (!category || p.category === category),
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
            <span>Kategori</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Tümü</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        )}
        <label>
          <span>Yaş / Beden</span>
          <select value={size} onChange={(e) => setSize(e.target.value)}>
            <option value="">Tümü</option>
            {availableSizes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Sırala</span>
          <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="onerilen">Önerilen</option>
            <option value="fiyat-artan">Fiyat: Düşükten yükseğe</option>
            <option value="fiyat-azalan">Fiyat: Yüksekten düşüğe</option>
          </select>
        </label>
        <p className="filters-count" aria-live="polite">
          {visible.length} ürün
        </p>
      </div>

      {visible.length > 0 ? (
        <div className="product-grid">
          {visible.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>
      ) : (
        <p className="empty">Bu filtrelere uygun ürün bulunamadı. Farklı bir beden seçmeyi deneyin.</p>
      )}
    </div>
  );
}
