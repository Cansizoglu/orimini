// Sitede kullanılan içerik tipleri. Veritabanı satırları src/lib/content.ts içinde bu tiplere çevrilir.

export type Size = {
  id: string;
  label: string;
  group: string;
  height: string;
  weight: string;
};

export type Category = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  image: string;
  tint: string;
};

export type ProductImage = { src: string; alt: string };

export type Product = {
  slug: string;
  code: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  images: ProductImage[];
  color: string;
  shortDescription: string;
  // HTML
  description: string;
  setContents: string[];
  fabric: string;
  care: string[];
  sizes: string[];
  personalization?: { label: string; placeholder: string; note: string };
  badges: string[];
  featured: boolean;
  seo: { title: string; description: string };
};

export type Review = {
  productSlug: string;
  author: string;
  city?: string;
  rating: number;
  date: string;
  comment: string;
};

export type HomeSection = {
  key: string;
  eyebrow: string;
  title: string;
  content: string;
  image: string;
  imageAlt: string;
  buttonText: string;
  buttonLink: string;
  button2Text: string;
  button2Link: string;
  items: string[];
  active: boolean;
};

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  bgColor: string;
};

export type Page = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  lead: string;
  content: string;
  image: string;
  imageAlt: string;
  buttonText: string;
  buttonLink: string;
  seoTitle: string;
  seoDescription: string;
  system: boolean;
  updatedAt?: string;
};

export type Faq = { question: string; answer: string };

export type MenuLink = { href: string; label: string };

export type Site = {
  name: string;
  slogan: string;
  tagline: string;
  description: string;
  keywords: string[];
  url: string;
  themeColor: string;
  logo: string;
  footerLogo: string;
  schemaLogo: string;
  favicon: string;
  ogImage: string;
  phoneDisplay: string;
  phoneE164: string;
  whatsappNumber: string;
  email: string;
  city: string;
  region: string;
  country: string;
  address: string;
  workingHours: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  mapsEmbed: string;
  freeShippingLimit: number;
  legal: { title: string; address: string; taxInfo: string; email: string; kep: string; updatedAt: string };
  // Ham ayar değerleri (kısa kod doldurma ve diğer metinler için)
  raw: Record<string, string>;
};
