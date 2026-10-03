import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { fill } from "@/lib/site";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("sikca-sorulan-sorular");
}

export default async function FaqPage() {
  const { site, pages, faqs } = await getContent();
  const page = pages.find((p) => p.slug === "sikca-sorulan-sorular");
  const items = faqs.map((f) => ({ q: fill(f.question, site), a: fill(f.answer, site) }));
  return (
    <div className="container prose">
      <Breadcrumbs items={[{ name: "Sıkça Sorulan Sorular", href: "/sikca-sorulan-sorular" }]} />
      <h1>{page ? fill(page.title, site) : "Sıkça Sorulan Sorular"}</h1>
      {page?.lead && <p className="lead">{fill(page.lead, site)}</p>}
      <div className="faq">
        {items.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </div>
  );
}
