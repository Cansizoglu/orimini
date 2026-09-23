"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SIZES, type Product } from "@/data/products";
import { useCart } from "@/lib/cart";
import { questionMessage, singleOrderMessage, whatsappUrl } from "@/lib/whatsapp";
import { BagIcon, WhatsAppIcon } from "./icons";

export function ProductOrderPanel({ product }: { product: Product }) {
  const searchParams = useSearchParams();
  const initialSize = searchParams.get("beden");
  const [size, setSize] = useState<string | null>(
    initialSize && product.sizes.includes(initialSize as Product["sizes"][number]) ? initialSize : null,
  );
  const [quantity, setQuantity] = useState(1);
  const [personalization, setPersonalization] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  const selectSize = (id: string) => {
    setSize(id);
    setError(null);
    // Seçilen bedeni adres çubuğuna yaz, link paylaşılınca aynı beden açılsın.
    const url = new URL(window.location.href);
    url.searchParams.set("beden", id);
    window.history.replaceState(null, "", url);
  };

  const requireSize = () => {
    if (!size) {
      setError("Lütfen yaş / beden seçin.");
      document.getElementById("beden-secimi")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return false;
    }
    return true;
  };

  const orderHref = size
    ? whatsappUrl(singleOrderMessage({ product, size, quantity, personalization, note }))
    : undefined;

  return (
    <div className="order-panel">
      <fieldset id="beden-secimi" className="size-picker" aria-describedby={error ? "beden-hata" : undefined}>
        <legend>
          Yaş / Beden <Link href="/beden-rehberi">Beden rehberi</Link>
        </legend>
        <div className="size-options">
          {SIZES.map((s) => {
            const available = product.sizes.includes(s.id);
            return (
              <label key={s.id} className={`size-option${available ? "" : " is-disabled"}`}>
                <input
                  type="radio"
                  name="beden"
                  value={s.id}
                  checked={size === s.id}
                  disabled={!available}
                  onChange={() => selectSize(s.id)}
                />
                <span>{s.label}</span>
              </label>
            );
          })}
        </div>
        {error && (
          <p id="beden-hata" className="form-error" role="alert">
            {error}
          </p>
        )}
      </fieldset>

      {product.personalization && (
        <div className="field">
          <label htmlFor="nakis">{product.personalization.label}</label>
          <input
            id="nakis"
            type="text"
            maxLength={60}
            placeholder={product.personalization.placeholder}
            value={personalization}
            onChange={(e) => setPersonalization(e.target.value)}
          />
          <p className="field-hint">{product.personalization.note}</p>
        </div>
      )}

      <div className="field">
        <label htmlFor="not">Sipariş notu (isteğe bağlı)</label>
        <textarea
          id="not"
          rows={2}
          maxLength={300}
          placeholder="Örn: Teslim tarihi, renk tercihi, özel istekler"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="order-row">
        <div className="qty" aria-label="Adet">
          <button type="button" aria-label="Adedi azalt" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span aria-live="polite">{quantity}</span>
          <button type="button" aria-label="Adedi artır" onClick={() => setQuantity((q) => Math.min(20, q + 1))}>
            +
          </button>
        </div>
        <button
          type="button"
          className="btn btn-outline"
          onClick={() => {
            if (!requireSize() || !size) return;
            add({ slug: product.slug, size, quantity, personalization });
            setAdded(true);
          }}
        >
          <BagIcon size={20} /> Sepete ekle
        </button>
      </div>

      <a
        className="btn btn-whatsapp btn-block btn-large"
        href={orderHref ?? "#beden-secimi"}
        target={orderHref ? "_blank" : undefined}
        rel="noopener noreferrer"
        onClick={(e) => {
          if (!orderHref) {
            e.preventDefault();
            requireSize();
          }
        }}
      >
        <WhatsAppIcon size={22} /> WhatsApp ile sipariş ver
      </a>

      {added && (
        <p className="form-success" role="status">
          Ürün sepete eklendi. <Link href="/sepet">Sepete git</Link> ve tüm ürünleri tek mesajla gönder.
        </p>
      )}

      <a
        className="text-link ask-link"
        href={whatsappUrl(questionMessage(product))}
        target="_blank"
        rel="noopener noreferrer"
      >
        Bu ürün hakkında soru sor
      </a>
    </div>
  );
}
