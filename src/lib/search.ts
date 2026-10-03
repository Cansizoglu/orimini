import { stripHtml } from "./site";
import type { Category, Product, Size } from "./types";

// Türkçe karakter ve büyük/küçük harf farkını yok sayan sadeleştirme.
export function normalize(text: string) {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

export type SearchIndex = { product: Product; title: string; text: string }[];

export function buildIndex(products: Product[], categories: Category[], sizes: Size[]): SearchIndex {
  return products.map((p) => {
    const category = categories.find((c) => c.slug === p.category);
    const sizeLabels = sizes.filter((s) => p.sizes.includes(s.id)).map((s) => s.label);
    return {
      product: p,
      title: normalize(p.name),
      text: normalize(
        [
          p.name,
          p.code,
          p.color,
          category?.name,
          p.shortDescription,
          stripHtml(p.description),
          ...p.setContents,
          p.fabric,
          ...sizeLabels,
        ].join(" "),
      ),
    };
  });
}

export function searchProducts(index: SearchIndex, query: string, limit?: number): Product[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];
  const scored = index
    .filter((entry) => terms.every((t) => entry.text.includes(t)))
    .map((entry) => ({
      product: entry.product,
      score: terms.reduce((s, t) => s + (entry.title.includes(t) ? 2 : 1), 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map((e) => e.product);
  return limit ? scored.slice(0, limit) : scored;
}
