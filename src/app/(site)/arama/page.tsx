import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchResults } from "./SearchResults";

export const metadata: Metadata = {
  title: "Ürün Arama",
  robots: { index: false, follow: true },
  alternates: { canonical: "/arama" },
};

export default function SearchPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Arama", href: "/arama" }]} />
      <Suspense fallback={<div className="empty" aria-busy="true" />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
