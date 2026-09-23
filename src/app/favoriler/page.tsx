import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { FavoritesList } from "./FavoritesList";

export const metadata: Metadata = {
  title: "Favorilerim",
  robots: { index: false, follow: true },
  alternates: { canonical: "/favoriler" },
};

export default function FavoritesPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Favorilerim", href: "/favoriler" }]} />
      <header className="page-hero">
        <h1>Favorilerim</h1>
        <p className="lead">Beğendiğiniz ürünler burada saklanır.</p>
      </header>
      <FavoritesList />
    </div>
  );
}
