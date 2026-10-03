"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { SearchBox } from "@/components/SearchBox";
import { useMemo } from "react";
import { useCatalog } from "@/lib/catalog";
import { buildIndex, searchProducts } from "@/lib/search";

export function SearchResults() {
  const q = useSearchParams().get("q")?.trim() ?? "";
  const { products, categories, sizes } = useCatalog();
  const index = useMemo(() => buildIndex(products, categories, sizes), [products, categories, sizes]);
  const results = useMemo(() => searchProducts(index, q), [index, q]);

  return (
    <>
      <header className="page-hero">
        <h1>{q ? `"${q}" için sonuçlar` : "Ürün ara"}</h1>
        <SearchBox className="search-page-box" />
        {q && <p className="lead">{results.length} ürün bulundu.</p>}
      </header>
      {results.length > 0 ? (
        <div className="product-grid" style={{ paddingBottom: 60 }}>
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        q && (
          <div className="empty">
            <p>Aradığınız ürünü bulamadık. Kategorilere göz atabilirsiniz:</p>
            <ul className="category-chips" style={{ justifyContent: "center" }}>
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link href={`/kategori/${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </>
  );
}
