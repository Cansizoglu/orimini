import { fill } from "@/lib/site";
import type { Site } from "@/lib/types";

// Admin panelindeki editörden gelen HTML'i kısa kodları doldurarak basar.
export function RichText({ html, site, className }: { html: string; site: Site; className?: string }) {
  if (!html) return null;
  return <div className={className ?? "rich-text"} dangerouslySetInnerHTML={{ __html: fill(html, site, { html: true }) }} />;
}
