// Sitenin tüm içeriğini Supabase'den okuyan katman.
// Veriler önbelleğe alınır ("content" etiketi); admin panelinde kayıt yapılınca
// /api/revalidate bu etiketi temizler ve site anında güncellenir.
// Supabase bağlı değilse ya da hata verirse src/data altındaki kurulum verisi kullanılır.
import { unstable_cache } from "next/cache";
import { cache } from "react";
import { seed, type Row } from "@/data/seed";
import { buildSite } from "./site";
import { hasSupabase } from "./supabase/config";
import { createPublicClient } from "./supabase/public";
import type { Banner, Category, Faq, HomeSection, MenuLink, Page, Product, Review, Site, Size } from "./types";

export const CONTENT_TAG = "content";

type Table =
  | "site_settings"
  | "sizes"
  | "categories"
  | "products"
  | "home_sections"
  | "pages"
  | "faqs"
  | "menu_items"
  | "banners"
  | "reviews";

const ordered: Partial<Record<Table, string>> = {
  sizes: "sort_order",
  categories: "sort_order",
  products: "sort_order",
  home_sections: "sort_order",
  pages: "sort_order",
  faqs: "sort_order",
  menu_items: "sort_order",
  banners: "sort_order",
  reviews: "review_date",
};

async function fetchTable(table: Table): Promise<Row[]> {
  if (!hasSupabase) return seed[table] ?? [];
  try {
    const supabase = createPublicClient();
    let q = supabase.from(table).select("*");
    const order = ordered[table];
    if (order) q = q.order(order, { ascending: table !== "reviews" });
    const { data, error } = await q;
    if (error) throw error;
    return (data as Row[]) ?? [];
  } catch (err) {
    console.error(`[content] ${table} okunamadı, kurulum verisi kullanılıyor:`, err);
    return seed[table] ?? [];
  }
}

const loadAll = unstable_cache(
  async () => {
    const tables: Table[] = [
      "site_settings",
      "sizes",
      "categories",
      "products",
      "home_sections",
      "pages",
      "faqs",
      "menu_items",
      "banners",
      "reviews",
    ];
    const results = await Promise.all(tables.map(fetchTable));
    return Object.fromEntries(tables.map((t, i) => [t, results[i]])) as Record<Table, Row[]>;
  },
  ["orimini-content-v2"],
  // Veri yapısı değiştiğinde anahtar sürümünü artırın, eski önbellek kullanılmasın.
  { tags: [CONTENT_TAG], revalidate: 3600 },
);

const str = (v: unknown) => (v === null || v === undefined ? "" : String(v));
const arr = (v: unknown) => (Array.isArray(v) ? v.map(str).filter(Boolean) : []);
const active = (r: Row) => r.is_active !== false;

export const getContent = cache(async () => {
  const raw = await loadAll();

  const site: Site = buildSite(Object.fromEntries(raw.site_settings.map((r) => [str(r.key), str(r.value)])));

  const sizes: Size[] = raw.sizes.filter(active).map((r) => ({
    id: str(r.slug),
    label: str(r.label),
    group: str(r.size_group),
    height: str(r.height),
    weight: str(r.weight),
  }));

  const categories: Category[] = raw.categories.filter(active).map((r) => ({
    slug: str(r.slug),
    name: str(r.name),
    shortName: str(r.short_name) || str(r.name),
    description: str(r.description),
    seoTitle: str(r.seo_title) || str(r.name),
    seoDescription: str(r.seo_description) || str(r.description),
    image: str(r.image_url),
    tint: str(r.tint) || "#F3DCD4",
  }));

  const sizeOrder = new Map(sizes.map((s, i) => [s.id, i]));
  const products: Product[] = raw.products.filter(active).map((r) => {
    const images = (Array.isArray(r.images) ? r.images : [])
      .map((i: { src?: string; alt?: string }) => ({ src: str(i?.src), alt: str(i?.alt) || str(r.name) }))
      .filter((i) => i.src);
    const oldPrice = Number(r.old_price) || undefined;
    return {
      slug: str(r.slug),
      code: str(r.code),
      name: str(r.name),
      category: str(r.category_slug),
      price: Number(r.price) || 0,
      oldPrice,
      images: images.length ? images : [{ src: site.logo, alt: str(r.name) }],
      color: str(r.color),
      shortDescription: str(r.short_description),
      description: str(r.description),
      setContents: arr(r.set_contents),
      fabric: str(r.fabric),
      care: arr(r.care),
      sizes: arr(r.sizes)
        .filter((s) => sizeOrder.has(s))
        .sort((a, b) => (sizeOrder.get(a) ?? 0) - (sizeOrder.get(b) ?? 0)),
      personalization:
        r.personalization_enabled === false
          ? undefined
          : {
              label: str(r.personalization_label) || site.raw.personalization_label,
              placeholder: str(r.personalization_placeholder) || site.raw.personalization_placeholder,
              note: str(r.personalization_note) || site.raw.personalization_note,
            },
      badges: arr(r.badges),
      featured: r.is_featured === true,
      seo: {
        title: str(r.seo_title) || str(r.name),
        description: str(r.seo_description) || str(r.short_description),
      },
    };
  });

  const reviews: Review[] = raw.reviews
    .filter((r) => r.is_approved === true)
    .map((r) => ({
      productSlug: str(r.product_slug),
      author: str(r.author),
      city: str(r.city) || undefined,
      rating: Math.max(1, Math.min(5, Number(r.rating) || 5)),
      date: str(r.review_date).slice(0, 10),
      comment: str(r.comment),
    }));

  const home: HomeSection[] = raw.home_sections.map((r) => ({
    key: str(r.section_key),
    eyebrow: str(r.eyebrow),
    title: str(r.title),
    content: str(r.content),
    image: str(r.image_url),
    imageAlt: str(r.image_alt),
    buttonText: str(r.button_text),
    buttonLink: str(r.button_link),
    button2Text: str(r.button2_text),
    button2Link: str(r.button2_link),
    items: str(r.items)
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean),
    active: active(r),
  }));

  const pages: Page[] = raw.pages.filter(active).map((r) => ({
    slug: str(r.slug),
    title: str(r.title),
    shortTitle: str(r.short_title) || str(r.title),
    eyebrow: str(r.eyebrow),
    lead: str(r.lead),
    content: str(r.content),
    image: str(r.image_url),
    imageAlt: str(r.image_alt),
    buttonText: str(r.button_text),
    buttonLink: str(r.button_link),
    seoTitle: str(r.seo_title),
    seoDescription: str(r.seo_description),
    system: r.is_system === true,
    updatedAt: str(r.updated_at) || undefined,
  }));

  const faqs: Faq[] = raw.faqs.filter(active).map((r) => ({ question: str(r.question), answer: str(r.answer) }));

  const menu = (location: string): MenuLink[] =>
    raw.menu_items
      .filter((r) => active(r) && str(r.location) === location)
      .map((r) => ({ href: str(r.href), label: str(r.label) }));

  const banners: Banner[] = raw.banners.filter(active).map((r) => ({
    id: str(r.id) || str(r.title),
    title: str(r.title),
    subtitle: str(r.subtitle),
    image: str(r.image_url),
    buttonText: str(r.button_text),
    buttonLink: str(r.button_link),
    bgColor: str(r.bg_color) || "#F3DCD4",
  }));

  return {
    site,
    sizes,
    categories,
    products,
    reviews,
    home,
    pages,
    faqs,
    banners,
    headerMenu: menu("header"),
    mobileMenu: menu("mobile"),
    footerMenu: menu("footer"),
  };
});

export type Content = Awaited<ReturnType<typeof getContent>>;

export async function getSite() {
  return (await getContent()).site;
}

export async function getPage(slug: string) {
  return (await getContent()).pages.find((p) => p.slug === slug);
}

export async function getProduct(slug: string) {
  return (await getContent()).products.find((p) => p.slug === slug);
}

export async function getCategory(slug: string) {
  return (await getContent()).categories.find((c) => c.slug === slug);
}

export function reviewsFor(content: Content, slug: string) {
  return content.reviews
    .filter((r) => r.productSlug === slug)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function ratingFor(content: Content, slug: string) {
  const list = reviewsFor(content, slug);
  if (list.length === 0) return { count: 0, average: 0 };
  const average = list.reduce((s, r) => s + r.rating, 0) / list.length;
  return { count: list.length, average: Math.round(average * 10) / 10 };
}

export function relatedProducts(content: Content, product: Product, limit = 4) {
  const same = content.products.filter((p) => p.category === product.category && p.slug !== product.slug);
  const others = content.products.filter((p) => p.category !== product.category);
  return [...same, ...others].slice(0, limit);
}
