"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { useSite } from "@/lib/catalog";
import { useFavorites } from "@/lib/favorites";
import { fill, isOn } from "@/lib/site";
import type { MenuLink } from "@/lib/types";
import { questionMessage, whatsappUrl } from "@/lib/whatsapp";
import { SearchBox } from "./SearchBox";
import { BagIcon, CloseIcon, HeartIcon, MenuIcon, WhatsAppIcon } from "./icons";

export function Header({ menu, mobileMenu }: { menu: MenuLink[]; mobileMenu: MenuLink[] }) {
  const site = useSite();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { count, ready } = useCart();
  const { slugs, ready: favReady } = useFavorites();
  const close = () => setOpen(false);

  return (
    <header className="site-header">
      {isOn(site, "announcement_active") && (
        <div className="announcement">
          <p>
            {fill(site.raw.announcement_text, site)}
            {isOn(site, "announcement_show_whatsapp") && (
              <>
                {site.raw.announcement_text ? " · " : ""}
                <a href={whatsappUrl(site, questionMessage(site))} target="_blank" rel="noopener noreferrer">
                  WhatsApp: {site.phoneDisplay}
                </a>
              </>
            )}
          </p>
        </div>
      )}
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
            src={site.logo}
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
            href={whatsappUrl(site, questionMessage(site))}
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
          {menu.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={close} aria-current={pathname === l.href ? "page" : undefined}>
                {l.label}
              </Link>
            </li>
          ))}
          {mobileMenu.map((l) => (
            <li key={`m-${l.href}-${l.label}`} className="main-nav-extra">
              <Link href={l.href} onClick={close}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
