"use client";

import { useState } from "react";
import { useSite } from "@/lib/catalog";
import { createClient } from "@/lib/supabase/client";
import { hasSupabase } from "@/lib/supabase/config";
import type { Review } from "@/lib/types";
import { whatsappUrl } from "@/lib/whatsapp";
import { StarIcon, WhatsAppIcon } from "./icons";
import { Stars } from "./Stars";

const labels = ["", "Hiç beğenmedim", "Beğenmedim", "Fena değil", "Beğendim", "Çok beğendim"];

export function ProductReviews({
  productSlug,
  productName,
  productCode,
  reviews,
  average,
}: {
  productSlug: string;
  productName: string;
  productCode: string;
  reviews: Review[];
  average: number;
}) {
  const site = useSite();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [city, setCity] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState<string | null>(null);

  const counts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  const sendViaWhatsApp = () => {
    const text = [
      `Merhaba ${site.name}, ürün yorumu göndermek istiyorum:`,
      "",
      `Ürün: ${productName} (${productCode})`,
      `Puan: ${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)`,
      `Ad: ${name.trim()}`,
      `Yorum: ${comment.trim()}`,
    ].join("\n");
    window.open(whatsappUrl(site, text), "_blank", "noopener,noreferrer");
  };

  // Yorum admin paneline onay bekleyen olarak düşer; veritabanı yoksa WhatsApp ile gönderilir.
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return setError("Lütfen yıldız seçerek puan verin.");
    if (name.trim().length < 2 || comment.trim().length < 5) return setError("Lütfen adınızı ve yorumunuzu yazın.");
    setError(null);
    if (!hasSupabase) return sendViaWhatsApp();
    setSending(true);
    const { error: insertError } = await createClient()
      .from("reviews")
      .insert({
        product_slug: productSlug,
        author: name.trim(),
        city: city.trim() || null,
        rating,
        comment: comment.trim(),
        is_approved: false,
      });
    setSending(false);
    if (insertError) {
      setError("Yorum gönderilemedi, lütfen WhatsApp ile iletin.");
      sendViaWhatsApp();
      return;
    }
    setSent(true);
    setRating(0);
    setName("");
    setCity("");
    setComment("");
  };

  return (
    <section className="reviews" aria-labelledby="yorumlar">
      <div className="section-head">
        <h2 id="yorumlar">Ürün yorumları</h2>
      </div>
      <div className="reviews-layout">
        <div className="reviews-summary">
          <p className="reviews-score">{reviews.length ? average.toLocaleString("tr-TR") : "–"}</p>
          <Stars value={average} size={22} />
          <p className="field-hint">{reviews.length} değerlendirme</p>
          <ul className="reviews-bars">
            {counts.map(({ star, count }) => (
              <li key={star}>
                <span>{star}</span>
                <StarIcon size={13} />
                <span className="bar">
                  <span style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : 0 }} />
                </span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {reviews.length > 0 ? (
            <ul className="review-list">
              {reviews.map((r) => (
                <li key={`${r.author}-${r.date}`} className="review">
                  <div className="review-head">
                    <Stars value={r.rating} size={15} />
                    <strong>{r.author}</strong>
                    {r.city && <span>{r.city}</span>}
                    <time dateTime={r.date}>{new Date(r.date).toLocaleDateString("tr-TR")}</time>
                  </div>
                  <p>{r.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="reviews-empty">Bu ürün için henüz yorum yok. İlk yorumu siz yazın!</p>
          )}

          <form className="review-form" onSubmit={submit} noValidate>
            <h3>Yorum yazın</h3>
            <fieldset className="star-picker">
              <legend>Puanınız</legend>
              <div onMouseLeave={() => setHover(0)}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <label key={i} onMouseEnter={() => setHover(i)}>
                    <input
                      type="radio"
                      name="puan"
                      value={i}
                      checked={rating === i}
                      onChange={() => setRating(i)}
                      aria-label={`${i} yıldız`}
                    />
                    <StarIcon size={30} fill={(hover || rating) >= i ? 1 : 0} />
                  </label>
                ))}
                <span className="star-label">{labels[hover || rating]}</span>
              </div>
            </fieldset>
            <div className="field">
              <label htmlFor="yorum-ad">Adınız</label>
              <input id="yorum-ad" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="yorum-sehir">Şehir (isteğe bağlı)</label>
              <input id="yorum-sehir" value={city} maxLength={40} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="yorum-metin">Yorumunuz</label>
              <textarea
                id="yorum-metin"
                rows={3}
                maxLength={600}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </div>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            {sent && (
              <p className="form-success" role="status">
                Teşekkürler! Yorumunuz bize ulaştı, onaylandıktan sonra burada yayınlanacak.
              </p>
            )}
            <button type="submit" className="btn btn-outline" disabled={sending}>
              {!hasSupabase && <WhatsAppIcon size={18} />} {sending ? "Gönderiliyor…" : "Yorumu gönder"}
            </button>
            <p className="field-hint">{site.raw.reviews_note}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
