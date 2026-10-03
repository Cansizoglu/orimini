import type { Metadata } from "next";
import { getContent } from "./content";
import { fill } from "./site";

// Panelde girilen sayfa SEO başlık/açıklamasından metadata üretir.
export async function pageMetadata(slug: string, extra: Metadata = {}): Promise<Metadata> {
  const { site, pages } = await getContent();
  const page = pages.find((p) => p.slug === slug);
  if (!page) return extra;
  return {
    title: fill(page.seoTitle || page.title, site),
    description: fill(page.seoDescription || page.lead, site) || undefined,
    alternates: { canonical: `/${slug}` },
    ...(page.image ? { openGraph: { images: [{ url: page.image, alt: page.imageAlt || page.title }] } } : {}),
    ...extra,
  };
}
