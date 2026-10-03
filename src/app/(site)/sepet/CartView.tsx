"use client";

import Link from "next/link";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { OrderConsent } from "@/components/OrderConsent";
import { SafeImage } from "@/components/SafeImage";
import { useCart } from "@/lib/cart";
import { useCatalog } from "@/lib/catalog";
import { fill, formatPrice, sizeLabel, t } from "@/lib/site";
import { cartOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export function CartView() {
  const { lines, total, ready, update, remove } = useCart();
  const { site, categories, sizes } = useCatalog();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [consentError, setConsentError] = useState(false);

  if (!ready) return <div className="empty" aria-busy="true" />;

  if (lines.length === 0) {
    return (
      <div className="cta-box" style={{ marginBottom: 60 }}>
        <h2>{t(site, "txt_cart_empty_title")}</h2>
        <p>{t(site, "txt_cart_empty_text")}</p>
        <Link href="/urunler" className="btn btn-primary">
          {t(site, "txt_cart_empty_button")}
        </Link>
      </div>
    );
  }

  const message = cartOrderMessage(
    site,
    { categories, sizes },
    lines.map((l) => ({ product: l.product, size: l.size, quantity: l.quantity, personalization: l.personalization })),
    { name, city, note },
  );

  return (
    <div className="cart-layout">
      <ul className="cart-list">
        {lines.map((l) => (
          <li key={l.id} className="cart-item">
            <div className="cart-item-media">
              <SafeImage src={l.product.images[0].src} alt={l.product.images[0].alt} fill sizes="96px" />
            </div>
            <div>
              <h2>
                <Link href={`/urun/${l.product.slug}?beden=${l.size}`}>{l.product.name}</Link>
              </h2>
              <p>
                {t(site, "txt_cart_size")}: {sizeLabel(sizes, l.size)}
              </p>
              {l.personalization && <p>
                  {t(site, "txt_cart_embroidery")}: {l.personalization}
                </p>}
              <p>
                {formatPrice(l.product.price)} {t(site, "txt_cart_per_item")}
              </p>
            </div>
            <div className="cart-item-side">
              <div className="qty" aria-label="Adet">
                <button type="button" aria-label="Adedi azalt" onClick={() => update(l.id, l.quantity - 1)}>
                  −
                </button>
                <span>{l.quantity}</span>
                <button type="button" aria-label="Adedi artır" onClick={() => update(l.id, l.quantity + 1)}>
                  +
                </button>
              </div>
              <button type="button" className="remove-button" onClick={() => remove(l.id)}>
                {t(site, "txt_cart_remove")}
              </button>
              <p className="price">{formatPrice(l.product.price * l.quantity)}</p>
            </div>
          </li>
        ))}
      </ul>

      <aside className="summary-box" aria-label="Sipariş özeti">
        <div className="summary-row">
          <span>{t(site, "txt_cart_total")}</span>
          <span>{formatPrice(total)}</span>
        </div>
        <p className="field-hint">
          {total >= site.freeShippingLimit
            ? t(site, "txt_cart_free_shipping")
            : t(site, "txt_cart_shipping_left", { kalan: formatPrice(site.freeShippingLimit - total) })}
        </p>
        <div className="field">
          <label htmlFor="ad">{t(site, "txt_cart_name")}</label>
          <input id="ad" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="il">{t(site, "txt_cart_city")}</label>
          <input
            id="il"
            autoComplete="address-level2"
            placeholder={t(site, "txt_cart_city_placeholder")}
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="siparis-notu">{t(site, "txt_cart_note")}</label>
          <textarea id="siparis-notu" rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <OrderConsent
          checked={consent}
          error={consentError && !consent}
          onChange={(v) => {
            setConsent(v);
            if (v) setConsentError(false);
          }}
        />
        <a
          href={consent ? whatsappUrl(site, message) : "#"}
          className="btn btn-whatsapp btn-block btn-large"
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!consent) {
              e.preventDefault();
              setConsentError(true);
            }
          }}
        >
          <WhatsAppIcon size={22} /> {t(site, "txt_order_whatsapp")}
        </a>
        <p className="field-hint">{fill(site.raw.cart_whatsapp_hint, site)}</p>
      </aside>
    </div>
  );
}
