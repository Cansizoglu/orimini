"use client";

import { createContext, useContext, useMemo } from "react";
import type { Category, Product, Site, Size } from "./types";

export type Rating = { count: number; average: number };

type CatalogValue = {
  site: Site;
  products: Product[];
  categories: Category[];
  sizes: Size[];
  ratings: Record<string, Rating>;
  legalTitles: Record<string, string>;
  getProduct: (slug: string) => Product | undefined;
};

const CatalogContext = createContext<CatalogValue | null>(null);

// Sunucuda okunan site ayarlarını ve ürün kataloğunu tarayıcı bileşenlerine taşır.
export function CatalogProvider({
  children,
  ...data
}: Omit<CatalogValue, "getProduct"> & { children: React.ReactNode }) {
  const value = useMemo(() => {
    const map = new Map(data.products.map((p) => [p.slug, p]));
    return { ...data, getProduct: (slug: string) => map.get(slug) };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.site, data.products, data.categories, data.sizes, data.ratings, data.legalTitles]);
  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>;
}

export function useCatalog() {
  const ctx = useContext(CatalogContext);
  if (!ctx) throw new Error("useCatalog must be used inside CatalogProvider");
  return ctx;
}

export function useSite() {
  return useCatalog().site;
}
