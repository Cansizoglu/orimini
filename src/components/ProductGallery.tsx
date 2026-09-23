"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductImage } from "@/data/products";
import { SafeImage } from "./SafeImage";
import { CloseIcon } from "./icons";

const ZOOM = 2.2;

function Arrow({ dir, onClick, label }: { dir: "prev" | "next"; onClick: () => void; label: string }) {
  return (
    <button type="button" className={`gallery-arrow gallery-${dir}`} aria-label={label} onClick={onClick}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <path d={dir === "prev" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

// Parmakla sağa-sola kaydırmayı yakalar.
function useSwipe(onPrev: () => void, onNext: () => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  return {
    onTouchStart: (e: React.TouchEvent) => {
      start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (!start.current) return;
      const dx = e.changedTouches[0].clientX - start.current.x;
      const dy = e.changedTouches[0].clientY - start.current.y;
      start.current = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) (dx > 0 ? onPrev : onNext)();
    },
  };
}

export function ProductGallery({ images, name }: { images: ProductImage[]; name: string }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const [lightbox, setLightbox] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const count = images.length;
  const many = count > 1;

  const prev = useCallback(() => setActive((i) => (i - 1 + count) % count), [count]);
  const next = useCallback(() => setActive((i) => (i + 1) % count), [count]);
  const swipe = useSwipe(prev, next);
  const current = images[active] ?? images[0];

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (lightbox && !d.open) d.showModal();
    if (!lightbox && d.open) d.close();
  }, [lightbox]);

  useEffect(() => {
    if (!lightbox || !many) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, many, prev, next]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="gallery">
      <div className="gallery-stage">
        <div
          className={`gallery-main${zoom ? " is-zooming" : ""}`}
          onMouseMove={onMove}
          onMouseLeave={() => setZoom(null)}
          onClick={() => {
            setZoom(null);
            setLightbox(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setLightbox(true);
            }
            if (e.key === "ArrowLeft" && many) prev();
            if (e.key === "ArrowRight" && many) next();
          }}
          role="button"
          tabIndex={0}
          aria-label={`${current.alt}. Büyütmek için tıklayın.`}
          {...swipe}
        >
          <div
            className="gallery-zoom"
            style={
              zoom
                ? { transform: `scale(${ZOOM})`, transformOrigin: `${zoom.x}% ${zoom.y}%` }
                : undefined
            }
          >
            <SafeImage
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              priority={active === 0}
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
          <span className="gallery-hint" aria-hidden>
            Yakınlaştırmak için üzerine gelin, büyütmek için tıklayın
          </span>
        </div>
        {many && (
          <>
            <Arrow dir="prev" onClick={prev} label="Önceki görsel" />
            <Arrow dir="next" onClick={next} label="Sonraki görsel" />
            <span className="gallery-counter" aria-live="polite">
              {active + 1} / {count}
            </span>
          </>
        )}
      </div>

      {many && (
        <div className="gallery-thumbs" role="tablist" aria-label={`${name} görselleri`}>
          {images.map((img, i) => (
            <button
              key={`${img.src}-${i}`}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`${i + 1}. görsel`}
              className={i === active ? "is-active" : undefined}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
            >
              <SafeImage src={img.src} alt="" fill sizes="96px" />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={`${name} görselleri`}
        onClose={() => setLightbox(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setLightbox(false);
        }}
      >
        {lightbox && (
          <div className="lightbox-inner" {...swipe}>
            <button type="button" className="lightbox-close" aria-label="Kapat" onClick={() => setLightbox(false)}>
              <CloseIcon />
            </button>
            <div className="lightbox-image">
              <SafeImage key={current.src} src={current.src} alt={current.alt} fill sizes="100vw" />
            </div>
            {many && (
              <>
                <Arrow dir="prev" onClick={prev} label="Önceki görsel" />
                <Arrow dir="next" onClick={next} label="Sonraki görsel" />
                <div className="lightbox-dots">
                  {images.map((img, i) => (
                    <button
                      key={`${img.src}-${i}`}
                      type="button"
                      aria-label={`${i + 1}. görsel`}
                      aria-current={i === active}
                      onClick={() => setActive(i)}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </dialog>
    </div>
  );
}
