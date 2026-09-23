import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} - ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F1E8",
    theme_color: "#F7F1E8",
    lang: "tr",
    icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }],
  };
}
