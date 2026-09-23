import type { Metadata } from "next";
import { legalDocs, type LegalSlug } from "@/content/legal";
import { site } from "@/data/site";
import { Breadcrumbs } from "./Breadcrumbs";

export function legalMetadata(slug: LegalSlug): Metadata {
  const doc = legalDocs[slug];
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/${slug}` },
  };
}

export function LegalPage({ slug }: { slug: LegalSlug }) {
  const { title, Body } = legalDocs[slug];
  return (
    <div className="container prose legal">
      <Breadcrumbs items={[{ name: title, href: `/${slug}` }]} />
      <h1>{title}</h1>
      <p className="field-hint">Son güncelleme: {site.legal.updatedAt}</p>
      <Body />
    </div>
  );
}
