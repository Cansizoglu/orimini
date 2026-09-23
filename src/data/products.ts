// Örnek ürün verisi. Yönetim paneli / veritabanı eklenene kadar ürünler
// bu dosyadan okunur. Fiyatlar örnektir, gerçek fiyatlarla güncelleyin.

export type SizeId =
  | "0-3-ay"
  | "3-6-ay"
  | "6-9-ay"
  | "9-12-ay"
  | "12-18-ay"
  | "2-yas"
  | "3-yas"
  | "4-yas"
  | "5-yas"
  | "6-yas"
  | "7-yas"
  | "8-yas"
  | "9-yas"
  | "10-yas";

export const SIZES: { id: SizeId; label: string; group: "bebek" | "cocuk" }[] = [
  { id: "0-3-ay", label: "0-3 Ay", group: "bebek" },
  { id: "3-6-ay", label: "3-6 Ay", group: "bebek" },
  { id: "6-9-ay", label: "6-9 Ay", group: "bebek" },
  { id: "9-12-ay", label: "9-12 Ay", group: "bebek" },
  { id: "12-18-ay", label: "12-18 Ay", group: "bebek" },
  { id: "2-yas", label: "2 Yaş", group: "cocuk" },
  { id: "3-yas", label: "3 Yaş", group: "cocuk" },
  { id: "4-yas", label: "4 Yaş", group: "cocuk" },
  { id: "5-yas", label: "5 Yaş", group: "cocuk" },
  { id: "6-yas", label: "6 Yaş", group: "cocuk" },
  { id: "7-yas", label: "7 Yaş", group: "cocuk" },
  { id: "8-yas", label: "8 Yaş", group: "cocuk" },
  { id: "9-yas", label: "9 Yaş", group: "cocuk" },
  { id: "10-yas", label: "10 Yaş", group: "cocuk" },
];

const ALL_SIZES = SIZES.map((s) => s.id);
const sizesBetween = (from: SizeId, to: SizeId) =>
  ALL_SIZES.slice(ALL_SIZES.indexOf(from), ALL_SIZES.indexOf(to) + 1);

export function sizeLabel(id: string) {
  return SIZES.find((s) => s.id === id)?.label ?? id;
}

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

export const categories: Category[] = [
  {
    slug: "kisa-salopet-takim",
    name: "Kısa Salopet Takım",
    shortName: "Kısa Salopet",
    description:
      "Gömlek, kısa salopet ve papyondan oluşan, isim ve tarih nakışıyla kişiye özel hazırlanan takımlar. Doğum günü, bayram ve özel çekimler için ideal.",
    seoTitle: "Kısa Salopet Takım | İsim Nakışlı Bebek ve Çocuk Salopet",
    seoDescription:
      "İsim nakışlı kısa salopet takımlar: gömlek, salopet ve papyon bir arada. 0-3 aydan 6 yaşa kadar beden, WhatsApp ile kolay sipariş.",
    image: "/images/urunler/kirmizi-sirk-salopet.webp",
    tint: "#F3DCD4",
  },
  {
    slug: "uzun-salopet-takim",
    name: "Uzun Salopet Takım",
    shortName: "Uzun Salopet",
    description:
      "Serin günler ve şık davetler için uzun paça salopet takımlar. Yumuşak dokulu kumaşlar, ayarlanabilir askılar ve kişiye özel nakış seçeneği.",
    seoTitle: "Uzun Salopet Takım | Kişiye Özel Bebek ve Çocuk Takımları",
    seoDescription:
      "Uzun salopet takım modelleri: keten, kadife ve gabardin seçenekleri, isim nakışı ile kişiye özel. 0-3 aydan 8 yaşa kadar beden.",
    image:
      "https://images.unsplash.com/photo-1698939096910-5b9a8fec3425?auto=format&fit=crop&w=1200&q=80",
    tint: "#E4E9DC",
  },
  {
    slug: "kiz-elbise",
    name: "Kız Elbise",
    shortName: "Kız Elbise",
    description:
      "Tül, dantel ve pamuklu kumaşlardan, pastel tonlarda kız çocuk elbiseleri. İstenirse yaka ya da etek ucuna isim nakışı işlenir.",
    seoTitle: "Kız Çocuk Elbise | Pastel Tonlarda Özel Gün Elbiseleri",
    seoDescription:
      "Pastel renklerde kız bebek ve kız çocuk elbiseleri. Doğum günü, düğün ve özel günler için 6 aydan 10 yaşa kadar beden seçenekleri.",
    image:
      "https://images.unsplash.com/photo-1578897367107-2828e351c8a8?auto=format&fit=crop&w=1200&q=80",
    tint: "#EFE0EA",
  },
  {
    slug: "yenidogan-setleri",
    name: "Yenidoğan Setleri",
    shortName: "Yenidoğan",
    description:
      "Hastane çıkışı ve ilk fotoğraflar için %100 pamuklu, isim nakışlı yenidoğan setleri. Hassas ciltlere uygun, yumuşak dokular.",
    seoTitle: "Yenidoğan Setleri | İsim Nakışlı Hastane Çıkışı Setleri",
    seoDescription:
      "İsim nakışlı hastane çıkışı ve yenidoğan setleri. %100 pamuk, 0-3 aydan 12-18 aya kadar beden, WhatsApp ile sipariş.",
    image:
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=1200&q=80",
    tint: "#DDE7EE",
  },
];

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
  description: string[];
  setContents: string[];
  fabric: string;
  care: string[];
  sizes: SizeId[];
  personalization?: {
    label: string;
    placeholder: string;
    note: string;
  };
  badges?: string[];
  featured?: boolean;
  // Arama motorları için meta başlık (~60 karakter) ve açıklama (~155 karakter).
  seo: { title: string; description: string };
};

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const nameEmbroidery = {
  label: "Nakış yapılacak isim / tarih",
  placeholder: "Örn: Muhammed Eren - 28.08.2025",
  note: "İsim ve tarih nakışı ücretsizdir. Yazım kontrolü için siparişten sonra WhatsApp üzerinden teyit alınır.",
};

const standardCare = [
  "30°C'de ters çevrilerek yıkayın.",
  "Çamaşır suyu kullanmayın.",
  "Nakışlı bölgeleri tersinden, düşük ısıda ütüleyin.",
  "Kurutma makinesi yerine serin ve gölgede kurutun.",
];

export const products: Product[] = [
  {
    slug: "kirmizi-sirk-temali-kisa-salopet-takim",
    seo: {
      title: "Kırmızı Sirk Temalı İsim Nakışlı Kısa Salopet Takım",
      description:
        "Sirk çadırı nakışlı, yıldız işlemeli kırmızı kısa salopet, isim nakışlı gömlek ve papyon. Doğum günü için 6-9 ay – 4 yaş. WhatsApp ile sipariş.",
    },
    code: "ORM-1001",
    name: "Kırmızı Sirk Temalı Kısa Salopet Takım",
    category: "kisa-salopet-takim",
    price: 1850,
    images: [
      {
        src: "/images/urunler/kirmizi-sirk-salopet.webp",
        alt: "Kırmızı sirk çadırı nakışlı, yıldız işlemeli kısa salopet takım ve isim nakışlı beyaz gömlek",
      },
      { src: "/images/urunler/sirk-cadir-detay.webp", alt: "Salopet ön panosundaki sirk çadırı nakışı yakın çekim" },
      { src: "/images/urunler/sirk-isim-detay.webp", alt: "Gömlek koluna işlenmiş Yağız Ali isim nakışı" },
      { src: "/images/urunler/sirk-yildiz-detay.webp", alt: "Kırmızı salopet üzerindeki altın yıldız işlemeleri ve saten biye" },
    ],
    color: "Kırmızı / Beyaz",
    shortDescription:
      "Sirk çadırı nakışlı ön pano, altın yıldız işlemeli kırmızı salopet, kolu isim nakışlı beyaz gömlek ve papyon.",
    description: [
      "Doğum günü partileri ve sirk temalı kutlamalar için hazırladığımız bu takım, beyaz ön panodaki renkli sirk çadırı nakışı ve kırmızı salopetin üzerine serpiştirilmiş altın sarısı yıldızlarla göz dolduruyor.",
      "Gömleğin iki koluna ve yakasına bebeğinizin adı ve baş harfi işlenir. Altın düğmeler ve saten biyeler takımı tamamlar.",
    ],
    setContents: ["Kısa salopet", "Kısa kollu gömlek", "Papyon"],
    fabric: "Salopet: gabardin, gömlek: %100 pamuk poplin",
    care: standardCare,
    sizes: sizesBetween("6-9-ay", "4-yas"),
    personalization: nameEmbroidery,
    badges: ["Kişiye Özel", "Çok Satan"],
    featured: true,
  },
  {
    slug: "bej-aslan-nakisli-1-yas-kisa-salopet-takim",
    seo: {
      title: "1 Yaş Doğum Günü Kıyafeti - Aslan Nakışlı Salopet Takım",
      description:
        "Aslan ve 1 yaş nakışlı gömlek, askısında isim, belinde doğum tarihi işlenen bej salopet takım. İlk yaş günü için kişiye özel, WhatsApp ile sipariş.",
    },
    code: "ORM-1002",
    name: "Bej Aslan Nakışlı 1 Yaş Kısa Salopet Takım",
    category: "kisa-salopet-takim",
    price: 1750,
    images: [
      {
        src: "/images/urunler/bej-aslan-salopet.webp",
        alt: "Aslan ve 1 yaş nakışlı gömlek, askısında isim, belinde doğum tarihi işlenmiş bej kısa salopet takım",
      },
      { src: "/images/urunler/aslan-nakis-detay.webp", alt: "Gömlekteki taçlı aslan ve 1 yaş nakışı yakın çekim" },
      { src: "/images/urunler/aslan-isim-detay.webp", alt: "Salopet askısına işlenmiş Muhammed isim nakışı" },
      { src: "/images/urunler/aslan-tarih-detay.webp", alt: "Salopet beline işlenmiş 28.08.2025 doğum tarihi nakışı" },
    ],
    color: "Bej / Beyaz",
    shortDescription:
      "İlk yaş günü için aslan ve \"1\" nakışlı gömlek, askılarında isim, belinde doğum tarihi işlenen bej salopet.",
    description: [
      "Bebeğinizin ilk yaş gününe özel tasarladığımız bu takımda gömleğin önünde taçlı sevimli aslan ve \"1\" nakışı yer alır.",
      "Salopet askılarına bebeğinizin adı, bel kısmına ise doğum tarihi işlenir. Balon paçalı kesimi ve bej papyonuyla fotoğraf çekimleri için mükemmel.",
    ],
    setContents: ["Kısa salopet (balon paça)", "Kısa kollu gömlek", "Papyon"],
    fabric: "Salopet: gabardin, gömlek: %100 pamuk poplin",
    care: standardCare,
    sizes: sizesBetween("9-12-ay", "2-yas"),
    personalization: {
      label: "Askılara işlenecek isim ve bel tarihi",
      placeholder: "Örn: Muhammed Eren - 28.08.2025",
      note: nameEmbroidery.note,
    },
    badges: ["Kişiye Özel", "Yeni"],
    featured: true,
  },
  {
    slug: "pudra-pembe-kisa-salopet-takim",
    seo: {
      title: "Pudra Pembe Kız Bebek Kısa Salopet Takım",
      description:
        "Fırfır askılı pudra pembe kısa salopet ve pamuklu body. İsim nakışı ücretsiz, 3-6 ay – 3 yaş beden. Orimini'den WhatsApp ile kolay sipariş.",
    },
    code: "ORM-1003",
    name: "Pudra Pembe Kısa Salopet Takım",
    category: "kisa-salopet-takim",
    price: 1590,
    images: [
      { src: u("photo-1765980641678-f28f49092350"), alt: "Pudra pembe kısa salopet giyen çocuk" },
      { src: u("photo-1615175254861-f9f581d95996"), alt: "Pembe tonlarda kıyafetli kız çocuk" },
      { src: u("photo-1622290291720-ac961c43ee30"), alt: "Pembe ayıcık desenli bebek kıyafeti detayı" },
    ],
    color: "Pudra Pembe",
    shortDescription: "Yumuşak pudra tonunda, fırfır askılı kısa salopet ve beyaz body.",
    description: [
      "Pastel pudra pembesi kısa salopet, fırfırlı askıları ve önündeki küçük kalp nakışıyla bahar ve yaz günleri için tatlı bir seçim.",
      "Beyaz pamuklu body ile birlikte gönderilir, askılar düğmeyle ayarlanabilir.",
    ],
    setContents: ["Kısa salopet", "Kısa kollu body"],
    fabric: "Salopet: %100 pamuk keten görünümlü kumaş, body: %100 pamuk",
    care: standardCare,
    sizes: sizesBetween("3-6-ay", "3-yas"),
    personalization: nameEmbroidery,
    badges: ["Kişiye Özel"],
    featured: true,
  },
  {
    slug: "mint-yesili-kisa-salopet-takim",
    seo: {
      title: "Mint Yeşili Kısa Salopet Takım - Gömlek ve Papyonlu",
      description:
        "Mint yeşili kısa salopet, beyaz gömlek ve papyon. Bayram ve yaz düğünleri için isim nakışlı, 6-9 ay – 5 yaş beden seçenekleri.",
    },
    code: "ORM-1004",
    name: "Mint Yeşili Kısa Salopet Takım",
    category: "kisa-salopet-takim",
    price: 1590,
    images: [
      { src: u("photo-1774641374314-6aaaf7d45d90"), alt: "Salopet takım giyen iki küçük çocuk" },
      { src: u("photo-1774641374251-d2d965dbf542"), alt: "Salopet giyen çocuklar parkta" },
      { src: u("photo-1490481651871-ab68de25d43d"), alt: "Askıda çocuk kıyafetleri" },
    ],
    color: "Mint Yeşili",
    shortDescription: "Ferah mint tonunda kısa salopet, beyaz gömlek ve papyon.",
    description: [
      "Yaz düğünleri ve bayramlar için ferah bir alternatif. Mint yeşili salopet, beyaz gömlek ve aynı tonda papyon ile tamamlanır.",
    ],
    setContents: ["Kısa salopet", "Kısa kollu gömlek", "Papyon"],
    fabric: "Salopet: gabardin, gömlek: %100 pamuk poplin",
    care: standardCare,
    sizes: sizesBetween("6-9-ay", "5-yas"),
    personalization: nameEmbroidery,
  },
  {
    slug: "krem-keten-uzun-salopet-takim",
    seo: {
      title: "Krem Keten Uzun Salopet Takım - İsim Nakışlı",
      description:
        "Keten dokulu krem uzun salopet, uzun kollu gömlek ve kahve papyon. Kişiye özel isim nakışı ile 6-9 ay – 6 yaş. WhatsApp ile sipariş.",
    },
    code: "ORM-2001",
    name: "Krem Keten Uzun Salopet Takım",
    category: "uzun-salopet-takim",
    price: 1950,
    images: [
      { src: u("photo-1698939096910-5b9a8fec3425"), alt: "Krem uzun salopet giyen çocuk" },
      { src: u("photo-1632337948784-35863f872dc8"), alt: "Atölyede askı ve makas, dikim hazırlığı" },
      { src: u("photo-1490481651871-ab68de25d43d"), alt: "Ahşap askılarda çocuk kıyafetleri" },
    ],
    color: "Krem",
    shortDescription: "Doğal keten dokulu krem uzun salopet, uzun kollu gömlek ve kahve papyon.",
    description: [
      "Doğal keten dokusu ve krem tonuyla zamansız bir takım. Uzun kollu beyaz gömlek ve kahverengi papyon ile şık davetlerin vazgeçilmezi.",
      "Askılara veya ön panoya isim nakışı işlenebilir.",
    ],
    setContents: ["Uzun salopet", "Uzun kollu gömlek", "Papyon"],
    fabric: "Salopet: keten-pamuk karışımı, gömlek: %100 pamuk poplin",
    care: standardCare,
    sizes: sizesBetween("6-9-ay", "6-yas"),
    personalization: nameEmbroidery,
    badges: ["Kişiye Özel", "Çok Satan"],
    featured: true,
  },
  {
    slug: "kahve-kadife-uzun-salopet-takim",
    seo: {
      title: "Kahve Kadife Uzun Salopet Takım - Kışlık Çocuk Takımı",
      description:
        "Yumuşak kadife kahverengi uzun salopet, gömlek ve papyon. Sonbahar-kış davetleri için 9-12 ay – 8 yaş, isim nakışı ücretsiz.",
    },
    code: "ORM-2002",
    name: "Kahve Kadife Uzun Salopet Takım",
    category: "uzun-salopet-takim",
    price: 2150,
    oldPrice: 2390,
    images: [
      { src: u("photo-1541015492536-31d513c59861"), alt: "Uzun salopet giyen gülümseyen erkek çocuk" },
      { src: u("photo-1698939096910-5b9a8fec3425"), alt: "Uzun salopet giyen çocuk bahçede" },
      { src: u("photo-1632337948784-35863f872dc8"), alt: "Atölyede dikim hazırlığı" },
    ],
    color: "Kahverengi",
    shortDescription: "Sonbahar ve kış için yumuşak kadife uzun salopet, gömlek ve papyon.",
    description: [
      "İnce fitilli kadifeden dikilen uzun salopet, soğuk günlerde sıcak tutarken şıklıktan ödün vermez.",
      "Krem gömlek ve kahve papyonla birlikte gönderilir.",
    ],
    setContents: ["Uzun salopet", "Uzun kollu gömlek", "Papyon"],
    fabric: "Salopet: pamuklu kadife, gömlek: %100 pamuk poplin",
    care: standardCare,
    sizes: sizesBetween("9-12-ay", "8-yas"),
    personalization: nameEmbroidery,
    badges: ["İndirim"],
    featured: true,
  },
  {
    slug: "bebe-mavisi-uzun-salopet-takim",
    seo: {
      title: "Bebe Mavisi Uzun Salopet Takım - Mevlüt ve Sünnet",
      description:
        "Açık mavi uzun salopet, beyaz gömlek ve lacivert papyon. Mevlüt, sünnet ve aile davetleri için 0-3 ay – 4 yaş, baş harf nakışlı.",
    },
    code: "ORM-2003",
    name: "Bebe Mavisi Uzun Salopet Takım",
    category: "uzun-salopet-takim",
    price: 1890,
    images: [
      { src: u("photo-1774641374251-d2d965dbf542"), alt: "Uzun salopet giyen küçük çocuklar parkta" },
      { src: u("photo-1774641374314-6aaaf7d45d90"), alt: "Salopet giyen iki çocuk" },
      { src: u("photo-1622290319146-7b63df48a635"), alt: "Beyaz ve mavi bebek kıyafeti" },
    ],
    color: "Bebe Mavisi",
    shortDescription: "Açık mavi uzun salopet, beyaz gömlek ve lacivert papyon.",
    description: [
      "Pastel bebe mavisi tonunda uzun salopet, mevlüt, sünnet ve aile davetleri için hazırlandı. Ön panoya baş harf nakışı işlenebilir.",
    ],
    setContents: ["Uzun salopet", "Uzun kollu gömlek", "Papyon"],
    fabric: "Salopet: gabardin, gömlek: %100 pamuk poplin",
    care: standardCare,
    sizes: sizesBetween("0-3-ay", "4-yas"),
    personalization: nameEmbroidery,
  },
  {
    slug: "pudra-tul-etekli-kiz-elbise",
    seo: {
      title: "Pudra Tül Etekli Kız Çocuk Elbise - Doğum Günü",
      description:
        "Kat kat tül etekli, saten kuşaklı pudra kız elbise ve saç bandı. Doğum günü ve düğünler için 6-9 ay – 8 yaş. WhatsApp ile sipariş.",
    },
    code: "ORM-3001",
    name: "Pudra Tül Etekli Kız Elbise",
    category: "kiz-elbise",
    price: 1690,
    images: [
      { src: u("photo-1578897367107-2828e351c8a8"), alt: "Elbisesinin eteğini tutan gülümseyen kız çocuk" },
      { src: u("photo-1615175254861-f9f581d95996"), alt: "Pembe beyaz elbiseli kız çocuk sandalyede oturuyor" },
      { src: u("photo-1620774760711-caa4c94d683a"), alt: "Beyaz elbiseli kız çocuk" },
    ],
    color: "Pudra",
    shortDescription: "Kat kat tül etekli, saten kuşaklı pudra renkli özel gün elbisesi.",
    description: [
      "Kabarık tül eteği ve saten kuşağıyla doğum günleri ve düğünler için prenses gibi bir görünüm.",
      "Astarı %100 pamukludur, sırttan fermuarlıdır. Kuşak ucuna isim nakışı işlenebilir.",
    ],
    setContents: ["Elbise", "Saç bandı"],
    fabric: "Üst: saten, etek: çok katlı tül, astar: %100 pamuk",
    care: [
      "30°C'de hassas programda yıkayın.",
      "Tül bölgeyi ütülemeyin.",
      "Askıda kurutun.",
    ],
    sizes: sizesBetween("6-9-ay", "8-yas"),
    personalization: nameEmbroidery,
    badges: ["Çok Satan"],
    featured: true,
  },
  {
    slug: "krem-dantel-yakali-kiz-elbise",
    seo: {
      title: "Krem Dantel Yakalı Kız Elbise ve Çiçekli Saç Bandı",
      description:
        "Dantel yakalı, büzgülü krem pamuklu kız elbise ve çiçekli saç bandı. 6-9 ay – 10 yaş beden, isim nakışı seçeneğiyle.",
    },
    code: "ORM-3002",
    name: "Krem Dantel Yakalı Kız Elbise",
    category: "kiz-elbise",
    price: 1490,
    images: [
      { src: u("photo-1620774760711-caa4c94d683a"), alt: "Beyaz elbise ve çiçekli saç bandı takan kız çocuk" },
      { src: u("photo-1684244160171-97f5dac39204"), alt: "Askıda asılı beyaz kız elbisesi" },
      { src: u("photo-1562438995-20c8bc11d4a9"), alt: "Elbiseli kız çocuk çimenlikte" },
    ],
    color: "Krem",
    shortDescription: "Dantel yakalı, büzgülü krem elbise ve çiçekli saç bandı.",
    description: [
      "Nostaljik dantel yaka detayı ve büzgülü eteğiyle zarif bir günlük ve özel gün elbisesi.",
    ],
    setContents: ["Elbise", "Çiçekli saç bandı"],
    fabric: "%100 pamuk müslin, dantel yaka",
    care: standardCare,
    sizes: sizesBetween("6-9-ay", "10-yas"),
    personalization: nameEmbroidery,
    badges: ["Yeni"],
    featured: true,
  },
  {
    slug: "lila-cicek-nakisli-kiz-elbise",
    seo: {
      title: "Lila Çiçek Nakışlı Yazlık Kız Elbise",
      description:
        "Göğsü çiçek nakışlı, kolsuz lila pamuklu yazlık kız elbise. 2 – 10 yaş beden, isim eklenebilir. Orimini'den WhatsApp ile sipariş.",
    },
    code: "ORM-3003",
    name: "Lila Çiçek Nakışlı Kız Elbise",
    category: "kiz-elbise",
    price: 1550,
    images: [
      { src: u("photo-1599624427857-461fd60c23e5"), alt: "Çimenlikte duran açık renk elbiseli kız çocuk" },
      { src: u("photo-1562438995-20c8bc11d4a9"), alt: "Elbiseli kız çocuk bahçede" },
      { src: u("photo-1560506840-ec148e82a604"), alt: "Askıda renkli elbiseler" },
    ],
    color: "Lila",
    shortDescription: "Göğsü küçük çiçek nakışlı, kolsuz lila yazlık elbise.",
    description: [
      "Hafif ve nefes alan kumaşıyla yaz günleri için ideal. Göğüs kısmındaki çiçek nakışının yanına isim eklenebilir.",
    ],
    setContents: ["Elbise"],
    fabric: "%100 pamuk",
    care: standardCare,
    sizes: sizesBetween("2-yas", "10-yas"),
    personalization: nameEmbroidery,
  },
  {
    slug: "kirmizi-kadife-kiz-elbise",
    seo: {
      title: "Kırmızı Kadife Kız Elbise - Yılbaşı ve Kış Davetleri",
      description:
        "Uzun kollu, beyaz yakalı kırmızı kadife kız elbise. Yılbaşı ve kış kutlamaları için 12-18 ay – 10 yaş beden seçenekleri.",
    },
    code: "ORM-3004",
    name: "Kırmızı Kadife Kız Elbise",
    category: "kiz-elbise",
    price: 1790,
    images: [
      { src: u("photo-1578897366846-358bb1c2412a"), alt: "Kırmızı uzun kollu elbise giyen kız çocuk" },
      { src: u("photo-1560506840-ec148e82a604"), alt: "Askıda uzun kollu elbiseler" },
      { src: u("photo-1578897367107-2828e351c8a8"), alt: "Elbisesinin eteğini tutan kız çocuk" },
    ],
    color: "Kırmızı",
    shortDescription: "Yılbaşı ve kış davetleri için uzun kollu kırmızı kadife elbise.",
    description: [
      "Yumuşak kadifesi ve beyaz yaka detayıyla kış kutlamalarının yıldızı. Astarlıdır, sırttan düğmelidir.",
    ],
    setContents: ["Elbise"],
    fabric: "Pamuklu kadife, astar: %100 pamuk",
    care: standardCare,
    sizes: sizesBetween("12-18-ay", "10-yas"),
    personalization: nameEmbroidery,
  },
  {
    slug: "isim-nakisli-hastane-cikisi-seti",
    seo: {
      title: "İsim Nakışlı Hastane Çıkışı Seti - 4 Parça",
      description:
        "Tulum, şapka, eldiven ve isim-tarih nakışlı battaniyeden oluşan %100 pamuk hastane çıkışı seti. 0-3 ve 3-6 ay. WhatsApp ile sipariş.",
    },
    code: "ORM-4001",
    name: "İsim Nakışlı Hastane Çıkışı Seti",
    category: "yenidogan-setleri",
    price: 1250,
    images: [
      { src: u("photo-1522771930-78848d9293e8"), alt: "Beyaz örtü üzerinde oturan bebek" },
      { src: u("photo-1622290291720-ac961c43ee30"), alt: "Beyaz ve pembe ayıcık desenli bebek zıbınları" },
      { src: u("photo-1546015720-b8b30df5aa27"), alt: "Örgü şapkalı bebek ve peluş ayı" },
    ],
    color: "Krem / Beyaz",
    shortDescription: "Tulum, şapka, eldiven ve isim nakışlı battaniyeden oluşan 4 parça set.",
    description: [
      "Bebeğinizin ilk yolculuğu için hazırladığımız set, hassas ciltlere uygun %100 pamuktan dikilir.",
      "Battaniyenin köşesine bebeğinizin adı ve doğum tarihi işlenir.",
    ],
    setContents: ["Tulum", "Şapka", "Eldiven", "İsim nakışlı battaniye"],
    fabric: "%100 organik pamuk",
    care: standardCare,
    sizes: sizesBetween("0-3-ay", "3-6-ay"),
    personalization: nameEmbroidery,
    badges: ["Kişiye Özel"],
    featured: true,
  },
  {
    slug: "pastel-zibin-ve-body-seti",
    seo: {
      title: "Pastel Zıbın ve Body Seti - 3 Parça Pamuklu",
      description:
        "Pastel tonlarda 3 parça pamuklu zıbın ve body seti, baş harf nakışı eklenebilir. 0-3 ay – 12-18 ay beden. Orimini yenidoğan.",
    },
    code: "ORM-4002",
    name: "Pastel Zıbın ve Body Seti",
    category: "yenidogan-setleri",
    price: 890,
    images: [
      { src: u("photo-1569974641446-22542de88536"), alt: "Üç farklı renkte bebek zıbını" },
      { src: u("photo-1622290319146-7b63df48a635"), alt: "Beyaz ve mavi bebek tulumu" },
      { src: u("photo-1622290291720-ac961c43ee30"), alt: "Ayıcık desenli bebek zıbını" },
    ],
    color: "Karışık Pastel",
    shortDescription: "Pastel tonlarda 3 parça pamuklu zıbın ve body seti.",
    description: [
      "Günlük kullanım için yumuşak, çıtçıtlı ve kolay giydirilen 3 parçalık set. Göğüs kısmına baş harf nakışı eklenebilir.",
    ],
    setContents: ["3 adet body / zıbın"],
    fabric: "%100 pamuk",
    care: standardCare,
    sizes: sizesBetween("0-3-ay", "12-18-ay"),
    personalization: nameEmbroidery,
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.category === slug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  const same = products.filter((p) => p.category === product.category && p.slug !== product.slug);
  const others = products.filter((p) => p.category !== product.category);
  return [...same, ...others].slice(0, limit);
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(value);
}
