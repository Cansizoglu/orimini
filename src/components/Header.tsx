"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, site } from "@/data/site";
import { useCart } from "@/lib/cart";
import { whatsappUrl, questionMessage } from "@/lib/whatsapp";
import { BagIcon, CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, ready } = useCart();

  const menuOpen = open;
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="announcement">
        <p>
          Adana&apos;dan tüm Türkiye&apos;ye kargo · İsim nakışı ücretsiz ·{" "}
          <a href={whatsappUrl(questionMessage())} target="_blank" rel="noopener noreferrer">
            WhatsApp: {site.phoneDisplay}
          </a>
        </p>
      </div>
      <div className="container header-bar">
        <button
          type="button"
          className="icon-button menu-toggle"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          aria-controls="ana-menu"
          onClick={() => setOpen(!menuOpen)}
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Link href="/" className="brand" aria-label={`${site.name} anasayfa`}>
          <Image
            src="/images/orimini-yazi.webp"
            alt={`${site.name} - ${site.slogan}`}
            width={520}
            height={180}
            priority
            className="brand-mark"
          />
        </Link>

        <nav id="ana-menu" className={`main-nav${menuOpen ? " is-open" : ""}`} aria-label="Ana menü">
          <ul>
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={close} aria-current={pathname === l.href ? "page" : undefined}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="main-nav-extra">
              <Link href="/sikca-sorulan-sorular" onClick={close}>Nasıl Sipariş Veririm?</Link>
            </li>
            <li className="main-nav-extra">
              <Link href="/iletisim" onClick={close}>İletişim</Link>
            </li>
          </ul>
        </nav>

        <div className="header-actions">
          <a
            href={whatsappUrl(questionMessage())}
            className="icon-button whatsapp-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp ile yazın"
          >
            <WhatsAppIcon size={22} />
          </a>
          <Link href="/sepet" className="icon-button cart-link" aria-label={`Sepet, ${count} ürün`}>
            <BagIcon />
            {ready && count > 0 && <span className="cart-count">{count}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}
