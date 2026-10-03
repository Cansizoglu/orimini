import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductListing } from "@/components/ProductListing";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { fill } from "@/lib/site";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("urunler");
}

export default async function ProductsPage() {
  const { site, pages, categories, products } = await getContent();
  const page = pages.find((p) => p.slug === "urunler");
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: page?.title ?? "Tüm Ürünler", href: "/urunler" }]} />
      <header className="page-hero">
        <h1>{page ? fill(page.title, site) : "Tüm Ürünler"}</h1>
        {page?.lead && <p className="lead">{fill(page.lead, site)}</p>}
        <ul className="category-chips" aria-label="Kategoriler">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/kategori/${c.slug}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </header>
      <ProductListing products={products} categories={categories.map(({ slug, name }) => ({ slug, name }))} />
    </div>
  );
}
