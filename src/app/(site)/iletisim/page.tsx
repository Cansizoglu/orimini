import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RichText } from "@/components/RichText";
import { ClockIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { fill, t } from "@/lib/site";
import { questionMessage, whatsappUrl } from "@/lib/whatsapp";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("iletisim");
}

export default async function ContactPage() {
  const { site, pages } = await getContent();
  const page = pages.find((p) => p.slug === "iletisim");
  return (
    <div className="container prose" style={{ maxWidth: 960 }}>
      <Breadcrumbs items={[{ name: "İletişim", href: "/iletisim" }]} />
      <h1>{page ? fill(page.title, site) : "İletişim"}</h1>
      {page?.lead && <p className="lead">{fill(page.lead, site)}</p>}
      <div className="contact-cards">
        <a href={whatsappUrl(site, questionMessage(site))} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={26} />
          <strong>{t(site, "txt_contact_whatsapp")}</strong>
          <span>{site.phoneDisplay}</span>
        </a>
        <a href={`tel:${site.phoneE164}`}>
          <PhoneIcon size={26} />
          <strong>{t(site, "txt_contact_phone")}</strong>
          <span>{site.phoneDisplay}</span>
        </a>
        {site.email ? (
          <a href={`mailto:${site.email}`}>
            <span aria-hidden="true" style={{ fontSize: 24 }}>✉</span>
            <strong>{t(site, "txt_contact_email")}</strong>
            <span>{site.email}</span>
          </a>
        ) : null}
        <div>
          <ClockIcon size={26} />
          <strong>{t(site, "txt_contact_hours")}</strong>
          <span>{site.workingHours}</span>
        </div>
      </div>
      {page && <RichText html={page.content} site={site} />}
      {site.mapsEmbed && (
        <div className="map-embed">
          <iframe
            src={site.mapsEmbed}
            title={`${site.name} konum`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}
