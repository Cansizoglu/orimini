import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RichText } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { fill } from "@/lib/site";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("kargo-ve-iade");
}

export default async function ShippingPage() {
  const { site, pages } = await getContent();
  const page = pages.find((p) => p.slug === "kargo-ve-iade");
  return (
    <div className="container prose">
      <Breadcrumbs items={[{ name: page?.title ?? "Kargo ve İade", href: "/kargo-ve-iade" }]} />
      <h1>{page ? fill(page.title, site) : "Kargo ve İade"}</h1>
      {page?.lead && <p className="lead">{fill(page.lead, site)}</p>}
      {page && <RichText html={page.content} site={site} />}
    </div>
  );
}
