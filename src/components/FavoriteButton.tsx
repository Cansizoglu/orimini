"use client";

import { useFavorites } from "@/lib/favorites";
import { HeartIcon } from "./icons";

export function FavoriteButton({
  slug,
  name,
  variant = "overlay",
}: {
  slug: string;
  name: string;
  variant?: "overlay" | "inline";
}) {
  const { isFavorite, toggle, ready } = useFavorites();
  const active = ready && isFavorite(slug);
  return (
    <button
      type="button"
      className={`fav-button fav-${variant}${active ? " is-active" : ""}`}
      aria-pressed={active}
      aria-label={active ? `${name} favorilerden çıkar` : `${name} favorilere ekle`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
    >
      <HeartIcon size={variant === "overlay" ? 20 : 22} filled={active} />
      {variant === "inline" && <span>{active ? "Beğenildi" : "Beğen"}</span>}
    </button>
  );
}
