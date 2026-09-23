import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { ProductListing } from "@/components/ProductListing";
import { categories, getCategory, getProductsByCategory } from "@/data/products";
import { site } from "@/data/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return {
    title: { absolute: `${category.seoTitle} | ${site.name}` },
    description: category.seoDescription,
    alternates: { canonical: `/kategori/${category.slug}` },
    openGraph: {
      title: category.seoTitle,
      description: category.seoDescription,
      url: `/kategori/${category.slug}`,
      images: [{ url: category.image, alt: category.name }],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  const items = getProductsByCategory(category.slug);

  return (
    <div className="container">
      <Breadcrumbs items={[{ name: category.name, href: `/kategori/${category.slug}` }]} />
      <header className="page-hero">
        <h1>{category.name}</h1>
        <p className="lead">{category.description}</p>
        <ul className="category-chips" aria-label="Diğer kategoriler">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/kategori/${c.slug}`} aria-current={c.slug === category.slug ? "page" : undefined}>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </header>

      <ProductListing products={items} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: category.name,
          description: category.seoDescription,
          url: `${site.url}/kategori/${category.slug}`,
          mainEntity: {
            "@type": "ItemList",
            itemListElement: items.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}/urun/${p.slug}`,
              name: p.name,
            })),
          },
        }}
      />
    </div>
  );
}
