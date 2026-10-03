import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getPage, getSite } from "@/lib/content";
import { fill } from "@/lib/site";
import { CartView } from "./CartView";

export const metadata: Metadata = {
  title: "Sepetim",
  robots: { index: false, follow: true },
  alternates: { canonical: "/sepet" },
};

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
