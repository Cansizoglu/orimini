import Link from "next/link";
import { getContent } from "@/lib/content";
import { fill, t } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export type Crumb = { name: string; href: string };

export async function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { site, pages } = await getContent();
  // Panelde tanımlı sayfaların adı, sayfanın "kısa ad" alanından gelir.
  const named = items.map((c) => {
    const page = pages.find((p) => c.href === `/${p.slug}` || c.href === `/sayfa/${p.slug}`);
    return page ? { ...c, name: fill(page.shortTitle, site) } : c;
  });
  const all = [{ name: t(site, "txt_breadcrumb_home"), href: "/" }, ...named];
  return (
    <>
      <nav aria-label="Sayfa yolu" className="breadcrumbs">
        <ol>
          {all.map((c, i) => (
            <li key={c.href}>
              {i < all.length - 1 ? <Link href={c.href}>{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: `${site.url}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}
