// Site ayarlarının tek kaynağı: varsayılan değerler (veritabanı boşken site bunlarla açılır)
// ve admin panelindeki "Site Ayarları" formu bu listeden üretilir.

export type SettingField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "image" | "number" | "checkbox" | "color";
  hint?: string;
  default: string;
  wide?: boolean;
};

export type SettingGroup = { title: string; description?: string; fields: SettingField[] };

export const settingGroups: SettingGroup[] = [
  {
    title: "🏷️ Marka ve genel bilgiler",
    fields: [
      { key: "site_name", label: "Site adı", default: "Orimini" },
      { key: "slogan", label: "Slogan (İngilizce üst yazı)", default: "Custom-made for little ones" },
      { key: "tagline", label: "Kısa tanım", default: "Kişiye özel nakışlı bebek ve çocuk kıyafetleri", wide: true },
      {
        key: "site_description",
        label: "Site açıklaması (Google'da görünen varsayılan açıklama)",
        type: "textarea",
        wide: true,
        default:
          "Orimini, Adana'da el emeğiyle hazırlanan kişiye özel nakışlı salopet takımlar, kız çocuk elbiseleri ve yenidoğan setleri sunar. 0-3 aydan 10 yaşa kadar beden seçenekleri, WhatsApp ile kolay sipariş.",
      },
      {
        key: "keywords",
        label: "Anahtar kelimeler (virgülle ayırın)",
        type: "textarea",
        wide: true,
        default:
          "kişiye özel bebek kıyafeti, isim nakışlı salopet takım, kısa salopet takım, uzun salopet takım, kız çocuk elbise, doğum günü kıyafeti, bebek papyonlu takım, Adana bebek giyim",
      },
      {
        key: "site_url",
        label: "Site adresi (alan adı)",
        hint: "Boş bırakılırsa https://orimini.vercel.app kullanılır. Örn: https://www.orimini.com",
        default: "",
      },
      { key: "theme_color", label: "Tarayıcı tema rengi", type: "color", default: "#F7F1E8" },
    ],
  },
  {
    title: "🖼️ Logo ve görseller",
    fields: [
      { key: "logo_url", label: "Header logosu", type: "image", default: "/images/orimini-logo-yazi.webp" },
      { key: "footer_logo_url", label: "Footer logosu (boşsa header logosu)", type: "image", default: "" },
      {
        key: "schema_logo_url",
        label: "Kare logo / monogram (Google için)",
        type: "image",
        default: "/images/orimini-monogram.png",
      },
      { key: "favicon_url", label: "Favicon (boşsa varsayılan ikon)", type: "image", default: "" },
      {
        key: "og_image",
        label: "Paylaşım görseli (WhatsApp, Facebook önizlemesi)",
        type: "image",
        default: "",
        hint: "Boşsa varsayılan Orimini paylaşım görseli kullanılır.",
      },
    ],
  },
  {
    title: "📞 İletişim bilgileri",
    fields: [
      { key: "phone_display", label: "Telefon (görünen)", default: "0506 273 59 29" },
      { key: "phone_e164", label: "Telefon (arama linki, +90...)", default: "+905062735929" },
      { key: "whatsapp_number", label: "WhatsApp numarası (90 ile başlayan)", default: "905062735929" },
      { key: "email", label: "E-posta", default: "" },
      { key: "city", label: "Şehir", default: "Adana" },
      { key: "region", label: "Bölge / il", default: "Adana" },
      { key: "address", label: "Adres", default: "Adana, Türkiye", wide: true },
      { key: "working_hours", label: "Çalışma saatleri", default: "Pazartesi - Cumartesi, 09:00 - 19:00" },
      { key: "instagram", label: "Instagram adresi (tam link)", default: "" },
      { key: "facebook", label: "Facebook adresi (tam link)", default: "" },
      { key: "tiktok", label: "TikTok adresi (tam link)", default: "" },
      {
        key: "google_maps_embed",
        label: "Google Maps embed linki (iletişim sayfasında harita)",
        type: "textarea",
        wide: true,
        default: "",
        hint: "Google Maps > Paylaş > Harita yerleştir kısmındaki src=\"...\" adresini yapıştırın.",
      },
    ],
  },
  {
    title: "📢 Üst duyuru bandı",
    fields: [
      { key: "announcement_active", label: "Duyuru bandı açık", type: "checkbox", default: "true" },
      {
        key: "announcement_text",
        label: "Duyuru yazısı",
        wide: true,
        default: "Adana'dan tüm Türkiye'ye kargo · İsim nakışı ücretsiz",
      },
      {
        key: "announcement_show_whatsapp",
        label: "Duyurunun sonunda WhatsApp numarası görünsün",
        type: "checkbox",
        default: "true",
      },
    ],
  },
  {
    title: "🛍️ Sipariş, kargo ve ürün sayfası",
    description: "Metinlerde {kargo_limit}, {sehir}, {telefon}, {site_adi} gibi kısa kodlar kullanabilirsiniz.",
    fields: [
      { key: "free_shipping_limit", label: "Ücretsiz kargo limiti (TL)", type: "number", default: "2500" },
      {
        key: "price_note",
        label: "Fiyatın altındaki not",
        type: "textarea",
        wide: true,
        default: "{kargo_limit} ve üzeri siparişlerde kargo ücretsiz. Ödeme ve teslimat WhatsApp üzerinden netleştirilir.",
      },
      {
        key: "product_trust_items",
        label: "Ürün sayfası güven maddeleri (her satır: ikon | yazı)",
        type: "textarea",
        wide: true,
        hint: "İkonlar: nakis, kalp, kargo, kalkan, whatsapp, cetvel",
        default: "nakis | Ücretsiz isim nakışı\nkalp | El emeği dikim\nkargo | Türkiye geneli kargo\nkalkan | Nakış onayı sonrası üretim",
      },
      {
        key: "product_shipping_text",
        label: "Ürün sayfası \"Kargo, teslimat ve iade\" metni (HTML)",
        type: "textarea",
        wide: true,
        default:
          '<p>Siparişler nakış onayından sonra hazırlanır ve genellikle 3-7 iş günü içinde kargoya verilir. {sehir} içi elden teslim için bizimle iletişime geçebilirsiniz.</p><p>Kişiye özel nakış işlenen ürünlerde, üretim hatası dışında iade ve değişim yapılamaz. Ayrıntılar için <a href="/kargo-ve-iade">Kargo ve İade</a> sayfasına bakın.</p>',
      },
      { key: "personalization_label", label: "Varsayılan nakış alanı başlığı", default: "Nakış yapılacak isim / tarih" },
      {
        key: "personalization_placeholder",
        label: "Varsayılan nakış örneği",
        default: "Örn: Muhammed Eren - 28.08.2025",
      },
      {
        key: "personalization_note",
        label: "Varsayılan nakış notu",
        type: "textarea",
        wide: true,
        default:
          "İsim ve tarih nakışı ücretsizdir. Yazım kontrolü için siparişten sonra WhatsApp üzerinden teyit alınır.",
      },
      {
        key: "order_note_placeholder",
        label: "Sipariş notu örneği",
        default: "Örn: Teslim tarihi, renk tercihi, özel istekler",
      },
      {
        key: "cart_whatsapp_hint",
        label: "Sepet sayfasındaki WhatsApp açıklaması",
        type: "textarea",
        wide: true,
        default:
          "Mesajınız {telefon} numaralı WhatsApp hattımıza hazır olarak açılır. Ödeme ve teslimat bilgilerini oradan netleştiriyoruz.",
      },
      {
        key: "reviews_note",
        label: "Yorum formu altındaki not",
        type: "textarea",
        wide: true,
        default: "Yorumunuz bize ulaşır, onaylandıktan sonra burada yayınlanır.",
      },
    ],
  },
  {
    title: "📌 Footer",
    fields: [
      {
        key: "footer_about_text",
        label: "Footer tanıtım yazısı",
        type: "textarea",
        wide: true,
        default: "Kişiye özel nakışlı bebek ve çocuk kıyafetleri. Her parça, küçükler için sevgiyle ve özenle hazırlanır.",
      },
      { key: "footer_whatsapp_button", label: "Footer WhatsApp butonu yazısı", default: "WhatsApp'tan yazın" },
      {
        key: "footer_bottom_text",
        label: "En alt yazı (© yıl ve site adından sonra)",
        wide: true,
        default: "{sehir} · Siparişler WhatsApp üzerinden alınır.",
      },
    ],
  },
  {
    title: "🍪 Çerez / KVKK bildirimi",
    fields: [
      { key: "consent_active", label: "Bildirim açık", type: "checkbox", default: "true" },
      {
        key: "consent_text",
        label: "Bildirim yazısı",
        type: "textarea",
        wide: true,
        hint: "{kvkk} ve {cerez} kısa kodları tıklanabilir linke dönüşür.",
        default:
          "Sitemizde yalnızca sepet ve favorilerinizi hatırlamak için tarayıcı depolaması kullanıyoruz. Kişisel verileriniz {kvkk} ve {cerez} kapsamında korunur.",
      },
    ],
  },
  {
    title: "⚖️ Satıcı bilgileri (sözleşme ve KVKK metinlerinde kullanılır)",
    fields: [
      { key: "legal_title", label: "Resmi unvan", default: "Orimini" },
      { key: "legal_address", label: "Açık adres", default: "Adana, Türkiye", wide: true },
      { key: "legal_tax_info", label: "Vergi dairesi / no", default: "" },
      { key: "legal_email", label: "Yasal e-posta", default: "" },
      { key: "legal_kep", label: "KEP adresi", default: "" },
      { key: "legal_updated_at", label: "Sözleşmelerin son güncelleme tarihi", default: "23.09.2026" },
    ],
  },
  {
    title: "🔍 Arama motoru doğrulama kodları",
    description: "Sadece content değerini girin (meta etiketinin tamamını değil).",
    fields: [
      { key: "google_verification", label: "Google Search Console", default: "" },
      { key: "yandex_verification", label: "Yandex", default: "" },
      { key: "bing_verification", label: "Bing (msvalidate.01)", default: "" },
    ],
  },
];

export const settingDefaults: Record<string, string> = Object.fromEntries(
  settingGroups.flatMap((g) => g.fields.map((f) => [f.key, f.default])),
);
