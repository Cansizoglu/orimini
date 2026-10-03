import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Nunito } from "next/font/google";
import { getSite } from "@/lib/content";

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

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const title = `${site.name} | ${site.tagline}`;
  const other: Record<string, string> = {};
  if (site.raw.yandex_verification) other["yandex-verification"] = site.raw.yandex_verification;
  if (site.raw.bing_verification) other["msvalidate.01"] = site.raw.bing_verification;
  return {
    metadataBase: new URL(site.url),
    title: { default: title, template: `%s | ${site.name}` },
    description: site.description,
    keywords: site.keywords,
    applicationName: site.name,
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: site.name,
      title,
      description: site.description,
      url: "/",
      ...(site.ogImage ? { images: [{ url: site.ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: site.description,
      ...(site.ogImage ? { images: [site.ogImage] } : {}),
    },
    robots: { index: true, follow: true },
    formatDetection: { telephone: true },
    ...(site.favicon ? { icons: { icon: site.favicon, apple: site.favicon } } : {}),
    verification: {
      ...(site.raw.google_verification ? { google: site.raw.google_verification } : {}),
      ...(Object.keys(other).length ? { other } : {}),
    },
  };
}

export async function generateViewport(): Promise<Viewport> {
  const site = await getSite();
  return { themeColor: site.themeColor };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
