import Image from "next/image";
import Link from "next/link";
import type { Content } from "@/lib/content";
import { fill, t } from "@/lib/site";
import { questionMessage, whatsappUrl } from "@/lib/whatsapp";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

export function Footer({ content }: { content: Content }) {
  const { site, categories, footerMenu } = content;
  const social = [
    { href: site.instagram, label: "Instagram" },
    { href: site.facebook, label: "Facebook" },
    { href: site.tiktok, label: "TikTok" },
  ].filter((s) => s.href);

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image
            src={site.footerLogo}
            alt={`${site.name} logosu`}
            width={720}
            height={221}
            className="footer-logo"
          />
          <p>{fill(site.raw.footer_about_text, site)}</p>
          <a
            className="btn btn-whatsapp btn-small"
            href={whatsappUrl(site, questionMessage(site))}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} /> {fill(site.raw.footer_whatsapp_button, site)}
          </a>
        </div>

        <div>
          <h2 className="footer-title">{t(site, "txt_footer_categories")}</h2>
          <ul className="footer-links">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/kategori/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/urunler">{t(site, "txt_footer_all_products")}</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title">{t(site, "txt_footer_corporate")}</h2>
          <ul className="footer-links">
            {footerMenu.map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-title">{t(site, "txt_footer_contact")}</h2>
          <ul className="footer-contact">
            <li>
              <PinIcon /> <span>{site.address}</span>
            </li>
            <li>
              <PhoneIcon /> <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
            </li>
            {site.email && (
              <li>
                <span aria-hidden="true">✉</span> <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            )}
            <li>
              <ClockIcon /> <span>{site.workingHours}</span>
            </li>
            {social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {site.name} · {fill(site.raw.footer_bottom_text, site)}
          </p>
        </div>
      </div>
    </footer>
  );
}
