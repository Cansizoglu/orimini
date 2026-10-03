import { findCategory, fill, formatPrice, sizeLabel } from "./site";
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
    `${prefix}Ürün: ${product.name}`,
    `Ürün kodu: ${product.code}`,
    `Kategori: ${findCategory(catalog.categories, product.category)?.name ?? product.category}`,
    `Yaş / Beden: ${sizeLabel(catalog.sizes, size)}`,
    `Adet: ${quantity}`,
  ];
  if (personalization?.trim()) rows.push(`Nakış (isim/tarih): ${personalization.trim()}`);
  if (note?.trim()) rows.push(`Not: ${note.trim()}`);
  rows.push(`Fiyat: ${formatPrice(product.price * quantity)}`);
  rows.push(`Link: ${site.url}/urun/${product.slug}?beden=${size}`);
  return rows.join("\n");
}

export function singleOrderMessage(site: Site, catalog: Catalog, line: OrderLine) {
  return [`Merhaba ${site.name}, bu ürünü sipariş vermek istiyorum:`, "", describeLine(site, catalog, line)].join("\n");
}

export function cartOrderMessage(
  site: Site,
  catalog: Catalog,
  lines: OrderLine[],
  customer: { name?: string; city?: string; note?: string } = {},
) {
  const total = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
  const parts = [
    `Merhaba ${site.name}, aşağıdaki ürünleri sipariş vermek istiyorum:`,
    "",
    ...lines.map((l, i) => describeLine(site, catalog, l, i) + "\n"),
    `Toplam: ${formatPrice(total)}`,
  ];
  if (customer.name?.trim()) parts.push(`Ad Soyad: ${customer.name.trim()}`);
  if (customer.city?.trim()) parts.push(`İl / İlçe: ${customer.city.trim()}`);
  if (customer.note?.trim()) parts.push(`Sipariş notu: ${customer.note.trim()}`);
  return parts.join("\n");
}

export function questionMessage(site: Site, product?: Product) {
  return product
    ? `Merhaba ${site.name}, "${product.name}" (${product.code}) hakkında bilgi almak istiyorum.`
    : `Merhaba ${site.name}, ürünleriniz hakkında bilgi almak istiyorum.`;
}
