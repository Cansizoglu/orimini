import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/data/site";
import { CartProvider } from "@/lib/cart";
import { FavoritesProvider } from "@/lib/favorites";
import { ConsentBanner } from "@/components/ConsentBanner";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Nunito({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [...site.keywords],
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#F7F1E8",
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "@id": `${site.url}/#store`,
  name: site.name,
  slogan: site.slogan,
  description: site.description,
  url: site.url,
  logo: `${site.url}/images/orimini-monogram.png`,
  image: `${site.url}/opengraph-image.jpg`,
  telephone: site.phoneE164,
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
  ...(site.instagram ? { sameAs: [site.instagram] } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <a href="#icerik" className="skip-link">
          İçeriğe geç
        </a>
        <CartProvider>
          <FavoritesProvider>
            <Header />
            <main id="icerik">{children}</main>
            <Footer />
            <WhatsAppFloat />
            <ConsentBanner />
          </FavoritesProvider>
        </CartProvider>
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
      </body>
    </html>
  );
}
