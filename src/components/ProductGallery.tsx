"use client";

import { useState } from "react";
import type { ProductImage } from "@/data/products";
import { SafeImage } from "./SafeImage";

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <div className="gallery">
      <div className="gallery-main">
        <SafeImage
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 50vw"
        />
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs" role="tablist" aria-label={`${name} görselleri`}>
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`${i + 1}. görsel`}
              className={i === active ? "is-active" : undefined}
              onClick={() => setActive(i)}
            >
              <SafeImage src={img.src} alt="" fill sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
