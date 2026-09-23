// Ürün yorumları. Siteden gönderilen yorumlar WhatsApp ile onaya gelir;
// onaylanan yorumu buraya ekleyin, ürün sayfasında yıldızlarıyla görünür.
// Google ve Ticaret Bakanlığı kuralları gereği yalnızca gerçek müşteri yorumlarını ekleyin.
//
// Örnek kayıt:
// {
//   productSlug: "bej-aslan-nakisli-1-yas-kisa-salopet-takim",
//   author: "Ayşe K.",
//   city: "Adana",
//   rating: 5,
//   date: "2026-09-20",
//   comment: "Nakışlar çok temiz, oğlumun doğum gününde herkes sordu.",
// },

export type Review = {
  productSlug: string;
  author: string;
  city?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  date: string;
  comment: string;
};

export const reviews: Review[] = [];

export function getReviews(slug: string) {
  return reviews
    .filter((r) => r.productSlug === slug)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getRatingSummary(slug: string) {
  const list = getReviews(slug);
  if (list.length === 0) return { count: 0, average: 0 };
  const average = list.reduce((s, r) => s + r.rating, 0) / list.length;
  return { count: list.length, average: Math.round(average * 10) / 10 };
}
