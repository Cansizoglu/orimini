import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getSite } from "@/lib/content";
import { t } from "@/lib/site";
import { SearchResults } from "./SearchResults";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    title: t(site, "txt_search_title"),
    robots: { index: false, follow: true },
    alternates: { canonical: "/arama" },
  };
}

export default async function SearchPage() {
  const site = await getSite();
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: t(site, "txt_search_title"), href: "/arama" }]} />
      <Suspense fallback={<div className="empty" aria-busy="true" />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
