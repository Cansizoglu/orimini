import { site } from "@/data/site";
import { formatPrice, getCategory, sizeLabel, type Product } from "@/data/products";

export type OrderLine = {
  product: Product;
  size: string;
  quantity: number;
  personalization?: string;
  note?: string;
};

export function whatsappUrl(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function describeLine(line: OrderLine, index?: number) {
  const { product, size, quantity, personalization, note } = line;
  const prefix = index === undefined ? "" : `${index + 1}) `;
  const rows = [
    `${prefix}Ürün: ${product.name}`,
    `Ürün kodu: ${product.code}`,
    `Kategori: ${getCategory(product.category)?.name ?? product.category}`,
    `Yaş / Beden: ${sizeLabel(size)}`,
    `Adet: ${quantity}`,
  ];
  if (personalization?.trim()) rows.push(`Nakış (isim/tarih): ${personalization.trim()}`);
  if (note?.trim()) rows.push(`Not: ${note.trim()}`);
  rows.push(`Fiyat: ${formatPrice(product.price * quantity)}`);
  rows.push(`Link: ${site.url}/urun/${product.slug}?beden=${size}`);
  return rows.join("\n");
}

export function singleOrderMessage(line: OrderLine) {
  return [`Merhaba ${site.name}, bu ürünü sipariş vermek istiyorum:`, "", describeLine(line)].join("\n");
}

export function cartOrderMessage(
  lines: OrderLine[],
  customer: { name?: string; city?: string; note?: string } = {},
) {
  const total = lines.reduce((sum, l) => sum + l.product.price * l.quantity, 0);
  const parts = [
    `Merhaba ${site.name}, aşağıdaki ürünleri sipariş vermek istiyorum:`,
    "",
    ...lines.map((l, i) => describeLine(l, i) + "\n"),
    `Toplam: ${formatPrice(total)}`,
  ];
  if (customer.name?.trim()) parts.push(`Ad Soyad: ${customer.name.trim()}`);
  if (customer.city?.trim()) parts.push(`İl / İlçe: ${customer.city.trim()}`);
  if (customer.note?.trim()) parts.push(`Sipariş notu: ${customer.note.trim()}`);
  return parts.join("\n");
}

export function questionMessage(product?: Product) {
  return product
    ? `Merhaba ${site.name}, "${product.name}" (${product.code}) hakkında bilgi almak istiyorum.`
    : `Merhaba ${site.name}, ürünleriniz hakkında bilgi almak istiyorum.`;
}
