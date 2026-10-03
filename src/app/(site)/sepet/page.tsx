import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getPage, getSite } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { fill } from "@/lib/site";
import { CartView } from "./CartView";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("sepet", { robots: { index: false, follow: true } });
}

export default async function CartPage() {
  const [page, site] = await Promise.all([getPage("sepet"), getSite()]);
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Sepetim", href: "/sepet" }]} />
      <header className="page-hero">
        <h1>{page ? fill(page.title, site) : "Sepetim"}</h1>
        {page?.lead && <p className="lead">{fill(page.lead, site)}</p>}
      </header>
      <CartView />
    </div>
  );
}
