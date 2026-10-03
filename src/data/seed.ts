// Kurulum verisini veritabanı satırı biçimine çevirir.
// - Supabase bağlı değilken site bu satırlarla çalışır (src/lib/content.ts).
// - scripts/generate-seed.mjs bu satırlardan supabase/seed.sql üretir.
import { settingDefaults } from "@/lib/settings-schema";
import { faqs, homeSections, menuItems, pages, sizeMeasurements } from "./pages";
import { categories, products, SIZES } from "./products";

export type Row = Record<string, unknown>;

const html = (paragraphs: string[]) => paragraphs.map((p) => `<p>${p}</p>`).join("\n");

export const seed: Record<string, Row[]> = {
  site_settings: Object.entries(settingDefaults).map(([key, value]) => ({ key, value })),

  sizes: SIZES.map((s, i) => ({
    slug: s.id,
    label: s.label,
    size_group: s.group,
    height: sizeMeasurements[s.id]?.[0] ?? "",
    weight: sizeMeasurements[s.id]?.[1] ?? "",
    is_active: true,
    sort_order: i + 1,
  })),

  categories: categories.map((c, i) => ({
    slug: c.slug,
    name: c.name,
    short_name: c.shortName,
    description: c.description,
    seo_title: c.seoTitle,
    seo_description: c.seoDescription,
    image_url: c.image,
    tint: c.tint,
    is_active: true,
    sort_order: i + 1,
  })),

  products: products.map((p, i) => ({
    slug: p.slug,
    code: p.code,
    name: p.name,
    category_slug: p.category,
    price: p.price,
    old_price: p.oldPrice ?? null,
    images: p.images,
    color: p.color,
    short_description: p.shortDescription,
    description: html(p.description),
    set_contents: p.setContents,
    fabric: p.fabric,
    care: p.care,
    sizes: p.sizes,
    personalization_enabled: Boolean(p.personalization),
    personalization_label: "",
    personalization_placeholder: "",
    personalization_note: "",
    badges: p.badges ?? [],
    is_featured: Boolean(p.featured),
    seo_title: p.seo.title,
    seo_description: p.seo.description,
    is_active: true,
    sort_order: i + 1,
  })),

  home_sections: homeSections.map((s, i) => ({ ...s, is_active: true, sort_order: i + 1 })),

  pages: pages.map((p, i) => ({ ...p, is_active: true, sort_order: i + 1 })),

  faqs: faqs.map((f, i) => ({ ...f, is_active: true, sort_order: i + 1 })),

  menu_items: menuItems.map((m, i) => ({ ...m, is_active: true, sort_order: i + 1 })),

  banners: [],
  reviews: [],
};
