import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getPage, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { fill } from "@/lib/site";
import { FavoritesList } from "./FavoritesList";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("favoriler", { robots: { index: false, follow: true } });
}

export default async function FavoritesPage() {
  const [page, site] = await Promise.all([getPage("favoriler"), getSite()]);
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Favorilerim", href: "/favoriler" }]} />
      <header className="page-hero">
        <h1>{page ? fill(page.title, site) : "Favorilerim"}</h1>
        {page?.lead && <p className="lead">{fill(page.lead, site)}</p>}
      </header>
      <FavoritesList />
    </div>
  );
}
