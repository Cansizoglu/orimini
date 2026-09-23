"use client";

import Link from "next/link";
import { useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { SafeImage } from "@/components/SafeImage";
import { formatPrice, sizeLabel } from "@/data/products";
import { site } from "@/data/site";
import { useCart } from "@/lib/cart";
import { cartOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export function CartView() {
  const { lines, total, ready, update, remove } = useCart();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");

  if (!ready) return <div className="empty" aria-busy="true" />;

  if (lines.length === 0) {
    return (
      <div className="cta-box" style={{ marginBottom: 60 }}>
        <h2>Sepetiniz boş</h2>
        <p>Beğendiğiniz ürünleri sepete ekleyip hepsini tek mesajla sipariş verebilirsiniz.</p>
        <Link href="/urunler" className="btn btn-primary">
          Alışverişe başla
        </Link>
      </div>
    );
  }

  const message = cartOrderMessage(
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
              <p>Yaş / Beden: {sizeLabel(l.size)}</p>
              {l.personalization && <p>Nakış: {l.personalization}</p>}
              <p>{formatPrice(l.product.price)} / adet</p>
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
                Kaldır
              </button>
              <p className="price">{formatPrice(l.product.price * l.quantity)}</p>
            </div>
          </li>
        ))}
      </ul>

      <aside className="summary-box" aria-label="Sipariş özeti">
        <div className="summary-row">
          <span>Toplam</span>
          <span>{formatPrice(total)}</span>
        </div>
        <p className="field-hint">
          {total >= site.freeShippingLimit
            ? "Kargo ücretsiz."
            : `${formatPrice(site.freeShippingLimit - total)} daha ekleyin, kargo ücretsiz olsun.`}
        </p>
        <div className="field">
          <label htmlFor="ad">Ad Soyad</label>
          <input id="ad" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="il">İl / İlçe</label>
          <input
            id="il"
            autoComplete="address-level2"
            placeholder="Örn: Adana / Çukurova"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="siparis-notu">Sipariş notu</label>
          <textarea id="siparis-notu" rows={2} value={note} onChange={(e) => setNote(e.target.value)} />
        </div>
        <a
          href={whatsappUrl(message)}
          className="btn btn-whatsapp btn-block btn-large"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={22} /> WhatsApp ile sipariş ver
        </a>
        <p className="field-hint">
          Mesajınız {site.phoneDisplay} numaralı WhatsApp hattımıza hazır olarak açılır. Ödeme ve teslimat
          bilgilerini oradan netleştiriyoruz.
        </p>
      </aside>
    </div>
  );
}
