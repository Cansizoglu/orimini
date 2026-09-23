// Site genelinde kullanılan sabit bilgiler. Alan adı belli olunca
// NEXT_PUBLIC_SITE_URL ortam değişkeni ile değiştirilebilir.
export const site = {
  name: "Orimini",
  slogan: "Custom-made for little ones",
  tagline: "Kişiye özel nakışlı bebek ve çocuk kıyafetleri",
  description:
    "Orimini, Adana'da el emeğiyle hazırlanan kişiye özel nakışlı salopet takımlar, kız çocuk elbiseleri ve yenidoğan setleri sunar. 0-3 aydan 10 yaşa kadar beden seçenekleri, WhatsApp ile kolay sipariş.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.orimini.com").replace(/\/$/, ""),
  phoneDisplay: "0506 273 59 29",
  phoneE164: "+905062735929",
  whatsappNumber: "905062735929",
  city: "Adana",
  region: "Adana",
  country: "TR",
  address: "Adana, Türkiye",
  // Instagram hesabı açılınca buraya tam adresi yazın; boşken sitede gösterilmez.
  instagram: "",
  workingHours: "Pazartesi - Cumartesi, 09:00 - 19:00",
  freeShippingLimit: 2500,
  keywords: [
    "kişiye özel bebek kıyafeti",
    "isim nakışlı salopet takım",
    "kısa salopet takım",
    "uzun salopet takım",
    "kız çocuk elbise",
    "doğum günü kıyafeti",
    "bebek papyonlu takım",
    "Adana bebek giyim",
  ],
} as const;

export const navLinks = [
  { href: "/kategori/kisa-salopet-takim", label: "Kısa Salopet Takım" },
  { href: "/kategori/uzun-salopet-takim", label: "Uzun Salopet Takım" },
  { href: "/kategori/kiz-elbise", label: "Kız Elbise" },
  { href: "/kategori/yenidogan-setleri", label: "Yenidoğan Setleri" },
  { href: "/urunler", label: "Tüm Ürünler" },
];

export const infoLinks = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/beden-rehberi", label: "Beden Rehberi" },
  { href: "/kargo-ve-iade", label: "Kargo ve İade" },
  { href: "/sikca-sorulan-sorular", label: "Sıkça Sorulan Sorular" },
  { href: "/iletisim", label: "İletişim" },
];
