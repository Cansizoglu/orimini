import "@/app/globals.css";
import { ConsentBanner } from "@/components/ConsentBanner";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { CartProvider } from "@/lib/cart";
import { CatalogProvider } from "@/lib/catalog";
import { getContent, ratingFor } from "@/lib/content";
import { FavoritesProvider } from "@/lib/favorites";
import { absoluteUrl, isOn } from "@/lib/site";

// Header, footer, sepet/favori sağlayıcıları ve yapısal veriyi içeren site iskeleti.
export async function SiteShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const content = await getContent();
  const { site, products, categories, sizes, pages } = content;
  const ratings = Object.fromEntries(products.map((p) => [p.slug, ratingFor(content, p.slug)]));
  const legalTitles = Object.fromEntries(pages.map((p) => [p.slug, p.title]));
  const sameAs = [site.instagram, site.facebook, site.tiktok].filter(Boolean);

  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "ClothingStore",
    "@id": `${site.url}/#store`,
    name: site.name,
    slogan: site.slogan,
    description: site.description,
    url: site.url,
    logo: absoluteUrl(site, site.schemaLogo),
    image: absoluteUrl(site, site.ogImage || "/opengraph-image.jpg"),
    telephone: site.phoneE164,
    ...(site.email ? { email: site.email } : {}),
    priceRange: "₺₺",
    currenciesAccepted: "TRY",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    areaServed: { "@type": "Country", name: "Türkiye" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phoneE164,
      contactType: "customer service",
      availableLanguage: ["Turkish"],
    },
    ...(sameAs.length ? { sameAs } : {}),
  };

  return (
    <>
      <a href="#icerik" className="skip-link">
        İçeriğe geç
      </a>
      <CatalogProvider
        site={site}
        products={products}
        categories={categories}
        sizes={sizes}
        ratings={ratings}
        legalTitles={legalTitles}
      >
        <CartProvider>
          <FavoritesProvider>
            <Header menu={content.headerMenu} />
            <main id="icerik">{children}</main>
            <Footer content={content} />
            <WhatsAppFloat />
            {isOn(site, "consent_active") && <ConsentBanner />}
          </FavoritesProvider>
        </CartProvider>
      </CatalogProvider>
      <JsonLd data={organizationLd} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: site.name,
          url: site.url,
          inLanguage: "tr-TR",
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: `${site.url}/arama?q={search_term_string}` },
            "query-input": "required name=search_term_string",
          },
        }}
      />
    </>
  );
}
