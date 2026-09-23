import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ProductListing } from "@/components/ProductListing";
import { categories, products } from "@/data/products";

export const metadata: Metadata = {
  title: "Tüm Ürünler - Kişiye Özel Bebek ve Çocuk Kıyafetleri",
  description:
    "Orimini'nin tüm koleksiyonu: isim nakışlı kısa ve uzun salopet takımlar, kız çocuk elbiseleri ve yenidoğan setleri. Yaşa ve bedene göre filtreleyin.",
  alternates: { canonical: "/urunler" },
};

export default function ProductsPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Tüm Ürünler", href: "/urunler" }]} />
      <header className="page-hero">
        <h1>Tüm Ürünler</h1>
        <p className="lead">
          0-3 aydan 10 yaşa kadar, kişiye özel nakışlı takımlar ve elbiseler. Yaş / beden seçerek size uygun modelleri
          görün.
        </p>
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
