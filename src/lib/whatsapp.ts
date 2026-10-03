import { findCategory, fill, formatPrice, sizeLabel, t } from "./site";
import type { Category, Product, Site, Size } from "./types";

export type OrderLine = {
  product: Product;
  size: string;
  quantity: number;
  personalization?: string;
  note?: string;
};

type Catalog = { categories: Category[]; sizes: Size[] };

export function whatsappUrl(site: Site, text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

// Admin panelinde buton linki olarak "whatsapp" ya da "whatsapp:Mesaj" yazılabilir.
export function resolveLink(site: Site, link: string) {
  const value = link.trim();
  if (value === "whatsapp") return { href: whatsappUrl(site, questionMessage(site)), external: true };
  if (value.startsWith("whatsapp:")) return { href: whatsappUrl(site, fill(value.slice(9), site)), external: true };
  if (value.startsWith("tel:")) return { href: value, external: false };
  const external = /^https?:\/\//.test(value);
  return { href: value || "/", external };
}

function describeLine(site: Site, catalog: Catalog, line: OrderLine, index?: number) {
  const { product, size, quantity, personalization, note } = line;
  const prefix = index === undefined ? "" : `${index + 1}) `;
  const rows = [
    `${prefix}${t(site, "wa_lbl_product")}: ${product.name}`,
    `${t(site, "wa_lbl_code")}: ${product.code}`,
    `${t(site, "wa_lbl_category")}: ${findCategory(catalog.categories, product.category)?.name ?? product.category}`,
    `${t(site, "wa_lbl_size")}: ${sizeLabel(catalog.sizes, size)}`,
    `${t(site, "wa_lbl_qty")}: ${quantity}`,
  ];
  if (personalization?.trim()) rows.push(`${t(site, "wa_lbl_embroidery")}: ${personalization.trim()}`);
  if (note?.trim()) rows.push(`${t(site, "wa_lbl_note")}: ${note.trim()}`);
  rows.push(`${t(site, "wa_lbl_price")}: ${formatPrice(product.price * quantity)}`);
  rows.push(`${t(site, "wa_lbl_link")}: ${site.url}/urun/${product.slug}?beden=${size}`);
  return rows.join("\n");
}

export function singleOrderMessage(site: Site, catalog: Catalog, line: OrderLine) {
  return [t(site, "wa_single_order"), "", describeLine(site, catalog, line)].join("\n");
}

export function cartOrderMessage(
  site: Site,
  catalog: Catalog,
  lines: OrderLine[],
  customer: { name?: string; city?: string; note?: string } = {},
) {
  const total = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
  const parts = [
    t(site, "wa_cart_order"),
    "",
    ...lines.map((l, i) => describeLine(site, catalog, l, i) + "\n"),
    `${t(site, "wa_lbl_total")}: ${formatPrice(total)}`,
  ];
  if (customer.name?.trim()) parts.push(`${t(site, "wa_lbl_name")}: ${customer.name.trim()}`);
  if (customer.city?.trim()) parts.push(`${t(site, "wa_lbl_city")}: ${customer.city.trim()}`);
  if (customer.note?.trim()) parts.push(`${t(site, "wa_lbl_order_note")}: ${customer.note.trim()}`);
  return parts.join("\n");
}

export function questionMessage(site: Site, product?: Product) {
  return product
    ? t(site, "wa_product_question", { urun: product.name, kod: product.code })
    : t(site, "wa_question");
}
