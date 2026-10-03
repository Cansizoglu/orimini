import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SafeImage } from "@/components/SafeImage";
import { TrustBar } from "@/components/TrustBar";
import { WhatsAppIcon } from "@/components/icons";
import { getContent, type Content } from "@/lib/content";
import { fill, splitLine, t } from "@/lib/site";
import type { HomeSection, Site } from "@/lib/types";
import { resolveLink } from "@/lib/whatsapp";

export async function generateMetadata(): Promise<Metadata> {
  const { site, pages } = await getContent();
  const page = pages.find((p) => p.slug === "anasayfa");
  return {
    title: { absolute: fill(page?.seoTitle, site) || `${site.name} | ${site.tagline}` },
    description: fill(page?.seoDescription, site) || site.description,
    alternates: { canonical: "/" },
  };
}

// Panelde yazılan butonu doğru linke çevirir ("whatsapp" yazılırsa WhatsApp'a gider).
function CtaButton({
  site,
  text,
  link,
  className,
  iconSize = 22,
}: {
  site: Site;
  text: string;
  link: string;
  className: string;
  iconSize?: number;
}) {
  if (!text) return null;
  const { href, external } = resolveLink(site, link);
  const isWhatsapp = href.startsWith("https://wa.me/");
  const label = (
    <>
      {isWhatsapp && <WhatsAppIcon size={iconSize} />} {fill(text, site)}
    </>
  );
  const cls = isWhatsapp ? className.replace("btn-primary", "btn-whatsapp") : className;
  return external ? (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {label}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}

function SectionHead({ s, site, id }: { s: HomeSection; site: Site; id: string }) {
  return (
    <div className="section-head">
      <div>
        {s.eyebrow && <p className="eyebrow">{fill(s.eyebrow, site)}</p>}
        <h2 id={id}>{fill(s.title, site)}</h2>
      </div>
      {s.buttonText && (
        <Link href={resolveLink(site, s.buttonLink).href} className="text-link">
          {fill(s.buttonText, site)}
        </Link>
      )}
    </div>
  );
}

function renderSection(s: HomeSection, content: Content, index: number) {
  const { site, categories, products, banners } = content;
  switch (s.key) {
    case "hero":
      return (
        <section className="hero" key={s.key}>
          <div className="container hero-inner">
            <div>
              {s.eyebrow && (
                <p className="eyebrow" lang="en">
                  {fill(s.eyebrow, site)}
                </p>
              )}
              <h1>{fill(s.title, site)}</h1>
              {s.content && <p className="lead">{fill(s.content, site)}</p>}
              <div className="hero-actions">
                <CtaButton site={site} text={s.buttonText} link={s.buttonLink} className="btn btn-primary btn-large" />
                <CtaButton site={site} text={s.button2Text} link={s.button2Link} className="btn btn-whatsapp btn-large" />
              </div>
              {s.items.length > 0 && (
                <ul className="hero-points">
                  {s.items.map((p) => (
                    <li key={p}>{fill(p, site)}</li>
                  ))}
                </ul>
              )}
            </div>
            {s.image && (
              <div className="hero-media">
                <div className="hero-photo">
                  <SafeImage
                    src={s.image}
                    alt={s.imageAlt}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 860px) 80vw, 420px"
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      );

    case "trust":
      return (
        <section className="trust-strip" aria-label={`Neden ${site.name}`} key={s.key}>
          <div className="container">
            <TrustBar items={s.items} site={site} />
          </div>
        </section>
      );

    case "banners":
      if (banners.length === 0) return null;
      return (
        <section className="section" aria-labelledby="kampanyalar" key={s.key}>
          <div className="container">
            {s.title && <SectionHead s={s} site={site} id="kampanyalar" />}
            <div className="promo-grid">
              {banners.map((b) => {
                const { href, external } = resolveLink(site, b.buttonLink);
                const inner = (
                  <>
                    {b.image && (
                      <div className="promo-media">
                        <SafeImage src={b.image} alt={b.title} fill sizes="(max-width: 860px) 100vw, 50vw" />
                      </div>
                    )}
                    <div className="promo-body">
                      <h3>{fill(b.title, site)}</h3>
                      {b.subtitle && <p>{fill(b.subtitle, site)}</p>}
                      {b.buttonText && <span className="btn btn-primary btn-small">{fill(b.buttonText, site)}</span>}
                    </div>
                  </>
                );
                const style = { "--tint": b.bgColor } as React.CSSProperties;
                if (!b.buttonLink) {
                  return (
                    <div key={b.id} className="promo-card" style={style}>
                      {inner}
                    </div>
                  );
                }
                return external ? (
                  <a key={b.id} href={href} className="promo-card" style={style} target="_blank" rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <Link key={b.id} href={href} className="promo-card" style={style}>
                    {inner}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      );

    case "categories":
      return (
        <section className="section" aria-labelledby="kategoriler" key={s.key}>
          <div className="container">
            <SectionHead s={s} site={site} id="kategoriler" />
            <div className="category-grid">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/kategori/${c.slug}`}
                  className="category-card"
                  style={{ "--tint": c.tint } as React.CSSProperties}
                >
                  <div className="category-card-media">
                    <SafeImage src={c.image || site.logo} alt={c.name} fill sizes="(max-width: 900px) 50vw, 25vw" />
                  </div>
                  <div className="category-card-body">
                    <h3>{c.name}</h3>
                    <span>{t(site, "txt_category_card_link")}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      );

    case "featured": {
      const featured = products.filter((p) => p.featured).slice(0, 8);
      if (featured.length === 0) return null;
      return (
        <section className="section band" aria-labelledby="one-cikanlar" key={s.key}>
          <div className="container">
            <SectionHead s={s} site={site} id="one-cikanlar" />
            <div className="product-grid">
              {featured.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "custom":
      return (
        <section className="section" aria-labelledby="kisiye-ozel" key={s.key}>
          <div className="container split">
            {s.image && (
              <div className="split-media">
                <SafeImage src={s.image} alt={s.imageAlt} fill sizes="(max-width: 860px) 100vw, 50vw" />
              </div>
            )}
            <div>
              {s.eyebrow && <p className="eyebrow">{fill(s.eyebrow, site)}</p>}
              <h2 id="kisiye-ozel">{fill(s.title, site)}</h2>
              {s.content && <p className="lead">{fill(s.content, site)}</p>}
              {s.items.length > 0 && (
                <ul className="check-list">
                  {s.items.map((i) => (
                    <li key={i}>{fill(i, site)}</li>
                  ))}
                </ul>
              )}
              <CtaButton site={site} text={s.buttonText} link={s.buttonLink} className="btn btn-primary" iconSize={20} />
            </div>
          </div>
        </section>
      );

    case "steps":
      return (
        <section className="section band-blush" aria-labelledby="nasil-siparis" key={s.key}>
          <div className="container">
            <SectionHead s={s} site={site} id="nasil-siparis" />
            <ol className="steps">
              {s.items.map((line) => {
                const [title, text] = splitLine(fill(line, site));
                return (
                  <li key={line}>
                    <h3>{title}</h3>
                    {text && <p>{text}</p>}
                  </li>
                );
              })}
            </ol>
          </div>
        </section>
      );

    case "cta":
      return (
        <section className="section" key={s.key}>
          <div className="container">
            <div className="cta-box">
              {s.eyebrow && <p className="eyebrow">{fill(s.eyebrow, site)}</p>}
              <h2>{fill(s.title, site)}</h2>
              {s.content && <p>{fill(s.content, site)}</p>}
              <CtaButton site={site} text={s.buttonText} link={s.buttonLink} className="btn btn-primary btn-large" />
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}

export default async function HomePage() {
  const content = await getContent();
  return <>{content.home.filter((s) => s.active).map((s, i) => renderSection(s, content, i))}</>;
}
