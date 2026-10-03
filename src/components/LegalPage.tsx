import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { fill, t } from "@/lib/site";
import { Breadcrumbs } from "./Breadcrumbs";
import { RichText } from "./RichText";

export async function legalMetadata(slug: string): Promise<Metadata> {
  const { site, pages } = await getContent();
  const page = pages.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    title: fill(page.seoTitle || page.title, site),
    description: fill(page.seoDescription, site) || undefined,
    alternates: { canonical: `/${slug}` },
  };
}

export async function LegalPage({ slug }: { slug: string }) {
  const { site, pages } = await getContent();
  const page = pages.find((p) => p.slug === slug);
  if (!page) notFound();
  return (
    <div className="container prose legal">
      <Breadcrumbs items={[{ name: page.title, href: `/${slug}` }]} />
      <h1>{fill(page.title, site)}</h1>
      <p className="field-hint">{t(site, "txt_last_updated")}: {site.legal.updatedAt}</p>
      <RichText html={page.content} site={site} />
    </div>
  );
}
