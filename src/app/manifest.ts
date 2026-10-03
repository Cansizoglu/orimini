import type { MetadataRoute } from "next";
import { getSite } from "@/lib/content";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const site = await getSite();
  return {
    name: `${site.name} - ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: site.themeColor,
    theme_color: site.themeColor,
    lang: "tr",
    icons: [{ src: site.favicon || "/icon.png", sizes: "192x192", type: "image/png" }],
  };
}
