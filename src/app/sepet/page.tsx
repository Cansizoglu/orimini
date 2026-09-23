import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CartView } from "./CartView";

export const metadata: Metadata = {
  title: "Sepetim",
  robots: { index: false, follow: true },
  alternates: { canonical: "/sepet" },
};

export default function CartPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Sepetim", href: "/sepet" }]} />
      <header className="page-hero">
        <h1>Sepetim</h1>
        <p className="lead">Seçtiğiniz ürünleri tek bir WhatsApp mesajıyla bize gönderin, siparişinizi hemen onaylayalım.</p>
      </header>
      <CartView />
    </div>
  );
}
