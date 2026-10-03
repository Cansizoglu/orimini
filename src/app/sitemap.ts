import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";

const noIndex = new Set(["anasayfa", "sepet", "favoriler"]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { site, pages, categories, products } = await getContent();
  const now = new Date();
  const staticPages = [
    "",
    "/urunler",
    ...pages
      .filter((p) => !noIndex.has(p.slug) && p.slug !== "urunler")
      .map((p) => (p.system ? `/${p.slug}` : `/sayfa/${p.slug}`)),
  ];
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
      images: p.images.map((i) => absoluteUrl(site, i.src)),
    })),
  ];
}
