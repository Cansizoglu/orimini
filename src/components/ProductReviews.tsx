"use client";

import { useState } from "react";
import { useSite } from "@/lib/catalog";
import { createClient } from "@/lib/supabase/client";
import { hasSupabase } from "@/lib/supabase/config";
import { t } from "@/lib/site";
import type { Review } from "@/lib/types";
import { whatsappUrl } from "@/lib/whatsapp";
import { StarIcon, WhatsAppIcon } from "./icons";
import { Stars } from "./Stars";

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
  const labels = ["", ...t(site, "txt_review_rating_labels").split("|").map((l) => l.trim())];
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
      t(site, "wa_review"),
      "",
      `${t(site, "wa_lbl_product")}: ${productName} (${productCode})`,
      `${t(site, "wa_lbl_rating")}: ${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)`,
      `${t(site, "wa_lbl_name")}: ${name.trim()}`,
      `${t(site, "wa_lbl_comment")}: ${comment.trim()}`,
    ].join("\n");
    window.open(whatsappUrl(site, text), "_blank", "noopener,noreferrer");
  };

  // Yorum admin paneline onay bekleyen olarak düşer; veritabanı yoksa WhatsApp ile gönderilir.
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return setError(t(site, "txt_review_error_rating"));
    if (name.trim().length < 2 || comment.trim().length < 5) return setError(t(site, "txt_review_error_text"));
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
      setError(t(site, "txt_review_error_send"));
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
        <h2 id="yorumlar">{t(site, "txt_reviews_title")}</h2>
      </div>
      <div className="reviews-layout">
        <div className="reviews-summary">
          <p className="reviews-score">{reviews.length ? average.toLocaleString("tr-TR") : "–"}</p>
          <Stars value={average} size={22} />
          <p className="field-hint">{reviews.length} {t(site, "txt_reviews_count")}</p>
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
            <p className="reviews-empty">{t(site, "txt_reviews_empty")}</p>
          )}

          <form className="review-form" onSubmit={submit} noValidate>
            <h3>{t(site, "txt_review_form_title")}</h3>
            <fieldset className="star-picker">
              <legend>{t(site, "txt_review_rating")}</legend>
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
              <label htmlFor="yorum-ad">{t(site, "txt_review_name")}</label>
              <input id="yorum-ad" value={name} maxLength={40} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="yorum-sehir">{t(site, "txt_review_city")}</label>
              <input id="yorum-sehir" value={city} maxLength={40} onChange={(e) => setCity(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="yorum-metin">{t(site, "txt_review_comment")}</label>
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
                {t(site, "txt_review_success")}
              </p>
            )}
            <button type="submit" className="btn btn-outline" disabled={sending}>
              {!hasSupabase && <WhatsAppIcon size={18} />} {sending ? t(site, "txt_review_sending") : t(site, "txt_review_submit")}
            </button>
            <p className="field-hint">{t(site, "reviews_note")}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
