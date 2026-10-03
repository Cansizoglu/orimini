// Ayar değerlerinden Site nesnesi üretir ve metinlerdeki kısa kodları doldurur.
// Hem sunucu hem tarayıcı tarafında kullanılabilir.
import { settingDefaults } from "./settings-schema";
import type { Category, Product, Site, Size } from "./types";

const DEFAULT_URL = "https://orimini.vercel.app";

export function buildSite(values: Record<string, string>): Site {
  const raw = { ...settingDefaults };
  for (const [k, v] of Object.entries(values)) if (v !== null && v !== undefined) raw[k] = v;
  const url = (process.env.NEXT_PUBLIC_SITE_URL || raw.site_url || DEFAULT_URL).trim().replace(/\/$/, "");
  return {
    name: raw.site_name,
    slogan: raw.slogan,
    tagline: raw.tagline,
    description: raw.site_description,
    keywords: raw.keywords
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean),
    url,
    themeColor: raw.theme_color || "#F7F1E8",
    logo: raw.logo_url || settingDefaults.logo_url,
    footerLogo: raw.footer_logo_url || raw.logo_url || settingDefaults.logo_url,
    schemaLogo: raw.schema_logo_url || settingDefaults.schema_logo_url,
    favicon: raw.favicon_url,
    ogImage: raw.og_image,
    phoneDisplay: raw.phone_display,
    phoneE164: raw.phone_e164,
    whatsappNumber: raw.whatsapp_number.replace(/\D/g, ""),
    email: raw.email,
    city: raw.city,
    region: raw.region,
    country: "TR",
    address: raw.address,
    workingHours: raw.working_hours,
    instagram: raw.instagram,
    facebook: raw.facebook,
    tiktok: raw.tiktok,
    mapsEmbed: raw.google_maps_embed,
    freeShippingLimit: Number(raw.free_shipping_limit) || 0,
    legal: {
      title: raw.legal_title,
      address: raw.legal_address,
      taxInfo: raw.legal_tax_info,
      email: raw.legal_email,
      kep: raw.legal_kep,
      updatedAt: raw.legal_updated_at,
    },
    raw,
  };
}

export function isOn(site: Site, key: string) {
  return site.raw[key] === "true";
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const blank = "………………";

function sellerInfoHtml(site: Site) {
  const l = site.legal;
  const rows = [
    ["Unvan", l.title],
    ["Adres", l.address],
    ["Telefon / WhatsApp", site.phoneDisplay],
    ["E-posta", l.email || blank],
    ["Vergi dairesi / no", l.taxInfo || blank],
    ...(l.kep ? [["KEP adresi", l.kep]] : []),
  ];
  return `<ul>${rows.map(([k, v]) => `<li><strong>${k}:</strong> ${escapeHtml(v)}</li>`).join("")}</ul>`;
}

// Kısa kodlar: admin panelinde metinlere yazılır, sitede gerçek değerle değişir.
export const shortcodes: { code: string; label: string }[] = [
  { code: "{site_adi}", label: "Site adı" },
  { code: "{site_url}", label: "Site adresi" },
  { code: "{telefon}", label: "Telefon" },
  { code: "{sehir}", label: "Şehir" },
  { code: "{adres}", label: "Adres" },
  { code: "{eposta}", label: "E-posta" },
  { code: "{calisma_saatleri}", label: "Çalışma saatleri" },
  { code: "{kargo_limit}", label: "Ücretsiz kargo limiti (₺)" },
  { code: "{satici_unvan}", label: "Satıcı unvanı" },
  { code: "{satici_adres}", label: "Satıcı adresi" },
  { code: "{kvkk_iletisim}", label: "KVKK başvuru kanalı" },
  { code: "{satici_bilgileri}", label: "Satıcı bilgi listesi (HTML)" },
];

export function fill(text: string | null | undefined, site: Site, { html = false } = {}) {
  if (!text) return "";
  const values: Record<string, string> = {
    site_adi: site.name,
    site_url: site.url,
    telefon: site.phoneDisplay,
    sehir: site.city,
    adres: site.address,
    eposta: site.email || site.legal.email || blank,
    calisma_saatleri: site.workingHours,
    kargo_limit: formatPrice(site.freeShippingLimit),
    satici_unvan: site.legal.title,
    satici_adres: site.legal.address,
    kvkk_iletisim: site.legal.email || `${site.phoneDisplay} numaralı WhatsApp hattı`,
  };
  return text.replace(/\{([a-z_]+)\}/g, (match, key: string) => {
    if (key === "satici_bilgileri") return html ? sellerInfoHtml(site) : match;
    const v = values[key];
    if (v === undefined) return match;
    return html ? escapeHtml(v) : v;
  });
}

// Site metni: ayardan okur, kısa kodları ve {n}, {q} gibi değişkenleri doldurur.
export function t(site: Site, key: string, vars: Record<string, string | number> = {}) {
  let text = fill(site.raw[key] ?? settingDefaults[key] ?? "", site);
  for (const [k, v] of Object.entries(vars)) text = text.split(`{${k}}`).join(String(v));
  return text;
}

export function stripHtml(html: string) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// "a | b | c" satırlarını parçalar.
export function splitLine(line: string) {
  return line.split("|").map((p) => p.trim());
}

export function absoluteUrl(site: Site, src: string) {
  return src.startsWith("http") ? src : `${site.url}${src.startsWith("/") ? "" : "/"}${src}`;
}

// Katalog yardımcıları (bedenler/kategoriler parametre olarak gelir)
export function sizeLabel(sizes: Size[], id: string) {
  return sizes.find((s) => s.id === id)?.label ?? id;
}

export function sizeRange(sizes: Size[], product: Product) {
  const labels = sizes.filter((s) => product.sizes.includes(s.id)).map((s) => s.label);
  return labels.length > 1 ? `${labels[0]} – ${labels[labels.length - 1]}` : (labels[0] ?? "");
}

export function findCategory(categories: Category[], slug: string) {
  return categories.find((c) => c.slug === slug);
}
