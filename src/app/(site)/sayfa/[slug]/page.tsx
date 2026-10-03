import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RichText } from "@/components/RichText";
import { SafeImage } from "@/components/SafeImage";
import { getContent } from "@/lib/content";
import { fill } from "@/lib/site";
import { resolveLink } from "@/lib/whatsapp";

// Admin panelinden eklenen yeni sayfalar /sayfa/<slug> adresinde yayınlanır.
type Props = { params: Promise<{ slug: string }> };

async function findPage(slug: string) {
  const content = await getContent();
  const page = content.pages.find((p) => p.slug === slug && !p.system);
  return { site: content.site, page };
}

export async function generateStaticParams() {
  const { pages } = await getContent();
  return pages.filter((p) => !p.system).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { site, page } = await findPage(slug);
  if (!page) return {};
  return {
    title: fill(page.seoTitle || page.title, site),
    description: fill(page.seoDescription || page.lead, site) || undefined,
    alternates: { canonical: `/sayfa/${slug}` },
    ...(page.image ? { openGraph: { images: [{ url: page.image, alt: page.imageAlt || page.title }] } } : {}),
  };
}

export default async function CustomPage({ params }: Props) {
  const { slug } = await params;
  const { site, page } = await findPage(slug);
  if (!page) notFound();
  const button = page.buttonText ? resolveLink(site, page.buttonLink) : null;

  return (
    <div className="container prose">
      <Breadcrumbs items={[{ name: page.title, href: `/sayfa/${slug}` }]} />
      {page.eyebrow && <p className="eyebrow">{fill(page.eyebrow, site)}</p>}
      <h1>{fill(page.title, site)}</h1>
      {page.lead && <p className="lead">{fill(page.lead, site)}</p>}
      {page.image && (
        <div className="page-image">
          <SafeImage src={page.image} alt={page.imageAlt || page.title} fill sizes="(max-width: 860px) 100vw, 760px" />
        </div>
      )}
      <RichText html={page.content} site={site} />
      {button &&
        (button.external ? (
          <a href={button.href} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
            {fill(page.buttonText, site)}
          </a>
        ) : (
          <Link href={button.href} className="btn btn-primary">
            {fill(page.buttonText, site)}
          </Link>
        ))}
    </div>
  );
}
