import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RichText } from "@/components/RichText";
import { SafeImage } from "@/components/SafeImage";
import { WhatsAppIcon } from "@/components/icons";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { fill } from "@/lib/site";
import { resolveLink } from "@/lib/whatsapp";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("hakkimizda");
}

export default async function AboutPage() {
  const { site, pages } = await getContent();
  const page = pages.find((p) => p.slug === "hakkimizda");
  if (!page) notFound();
  const button = page.buttonText ? resolveLink(site, page.buttonLink) : null;
  const isWhatsapp = button?.href.startsWith("https://wa.me/");

  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Hakkımızda", href: "/hakkimizda" }]} />
      <div className="split" style={{ paddingBottom: 60 }}>
        <div className="prose" style={{ paddingBottom: 0 }}>
          {page.eyebrow && (
            <p className="eyebrow" lang="en">
              {fill(page.eyebrow, site)}
            </p>
          )}
          <h1>{fill(page.title, site)}</h1>
          {page.lead && <p className="lead">{fill(page.lead, site)}</p>}
          <RichText html={page.content} site={site} />
          {button &&
            (button.external ? (
              <a
                href={button.href}
                className={`btn ${isWhatsapp ? "btn-whatsapp" : "btn-primary"}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isWhatsapp && <WhatsAppIcon size={20} />} {fill(page.buttonText, site)}
              </a>
            ) : (
              <Link href={button.href} className="btn btn-primary">
                {fill(page.buttonText, site)}
              </Link>
            ))}
        </div>
        {page.image && (
          <div className="split-media">
            <SafeImage src={page.image} alt={page.imageAlt || page.title} fill sizes="(max-width: 860px) 100vw, 50vw" />
          </div>
        )}
      </div>
    </div>
  );
}
