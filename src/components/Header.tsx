"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, site } from "@/data/site";
import { useCart } from "@/lib/cart";
import { useFavorites } from "@/lib/favorites";
import { questionMessage, whatsappUrl } from "@/lib/whatsapp";
import { SearchBox } from "./SearchBox";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, WhatsAppIcon } from "./icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, ready } = useCart();
  const { slugs, ready: favReady } = useFavorites();
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
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="ana-menu"
          onClick={() => setOpen(!open)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Link href="/" className="brand" aria-label={`${site.name} anasayfa`} onClick={close}>
          <Image
            src="/images/orimini-logo-yazi.webp"
            alt={site.name}
            width={720}
            height={221}
            priority
            className="brand-mark"
          />
        </Link>

        <SearchBox className="header-search" />

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
          <Link href="/favoriler" className="icon-button" aria-label={`Favoriler, ${slugs.length} ürün`}>
            <HeartIcon size={22} />
            {favReady && slugs.length > 0 && <span className="cart-count">{slugs.length}</span>}
          </Link>
          <Link href="/sepet" className="icon-button cart-link" aria-label={`Sepet, ${count} ürün`}>
            <BagIcon />
            {ready && count > 0 && <span className="cart-count">{count}</span>}
          </Link>
        </div>
      </div>

      <nav id="ana-menu" className={`main-nav${open ? " is-open" : ""}`} aria-label="Ana menü">
        <ul className="container">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={close} aria-current={pathname === l.href ? "page" : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
          <li className="main-nav-extra">
            <Link href="/favoriler" onClick={close}>
              Favorilerim
            </Link>
          </li>
          <li className="main-nav-extra">
            <Link href="/sikca-sorulan-sorular" onClick={close}>
              Nasıl Sipariş Veririm?
            </Link>
          </li>
          <li className="main-nav-extra">
            <Link href="/iletisim" onClick={close}>
              İletişim
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
