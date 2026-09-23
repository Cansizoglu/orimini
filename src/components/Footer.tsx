import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/products";
import { infoLinks, site } from "@/data/site";
import { questionMessage, whatsappUrl } from "@/lib/whatsapp";
import { ClockIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "./icons";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Image src="/images/orimini-rozet.png" alt={`${site.name} logosu`} width={112} height={112} />
          <p>{site.tagline}. Her parça, küçükler için sevgiyle ve özenle hazırlanır.</p>
          <a
            className="btn btn-whatsapp btn-small"
            href={whatsappUrl(questionMessage())}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={18} /> WhatsApp&apos;tan yazın
          </a>
        </div>

        <div>
          <h2 className="footer-title">Kategoriler</h2>
          <ul className="footer-links">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/kategori/${c.slug}`}>{c.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/urunler">Tüm Ürünler</Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer-title">Kurumsal</h2>
          <ul className="footer-links">
            {infoLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer-title">İletişim</h2>
          <ul className="footer-contact">
            <li>
              <PinIcon /> <span>{site.address}</span>
            </li>
            <li>
              <PhoneIcon /> <a href={`tel:${site.phoneE164}`}>{site.phoneDisplay}</a>
            </li>
            <li>
              <ClockIcon /> <span>{site.workingHours}</span>
            </li>
            {site.instagram && (
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.city} · Siparişler WhatsApp üzerinden alınır.
          </p>
        </div>
      </div>
    </footer>
  );
}
