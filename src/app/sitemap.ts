import type { MetadataRoute } from "next";
import { categories, products } from "@/data/products";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages = ["", "/urunler", "/hakkimizda", "/iletisim", "/beden-rehberi", "/kargo-ve-iade", "/sikca-sorulan-sorular"];
  return [
    ...staticPages.map((path) => ({
      url: `${site.url}${path}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.6,
    })),
    ...categories.map((c) => ({
      url: `${site.url}/kategori/${c.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((p) => ({
      url: `${site.url}/urun/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: p.images.map((i) => (i.src.startsWith("http") ? i.src : `${site.url}${i.src}`)),
    })),
  ];
}
