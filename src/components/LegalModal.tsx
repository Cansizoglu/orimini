"use client";

import { useEffect, useRef, useState } from "react";
import { useCatalog } from "@/lib/catalog";
import { t } from "@/lib/site";
import { CloseIcon } from "./icons";

export type LegalSlug = "mesafeli-satis-sozlesmesi" | "on-bilgilendirme-formu" | "kvkk-aydinlatma-metni" | "cerez-politikasi";

const cache = new Map<string, string>();

export function LegalModal({ slug, onClose }: { slug: LegalSlug | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { legalTitles, site } = useCatalog();
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (slug && !dialog.open) dialog.showModal();
    if (!slug && dialog.open) dialog.close();
  }, [slug]);

  useEffect(() => {
    if (!slug) return;
    const cached = cache.get(slug);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHtml(cached ?? null);
    if (cached) return;
    let cancelled = false;
    fetch(`/api/sayfa/${slug}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { html: string }) => {
        cache.set(slug, data.html);
        if (!cancelled) setHtml(data.html);
      })
      .catch(() => {
        if (!cancelled) setHtml(`<p>${t(site, "txt_modal_error")} <a href="/${slug}" target="_blank">${t(site, "txt_modal_open_page")}</a></p>`);
      });
    return () => {
      cancelled = true;
    };
  }, [slug, site]);

  return (
    <dialog
      ref={ref}
      className="modal"
      aria-labelledby="modal-baslik"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {slug && (
        <div className="modal-inner">
          <div className="modal-head">
            <h2 id="modal-baslik">{legalTitles[slug] ?? ""}</h2>
            <button type="button" className="icon-button" aria-label="Kapat" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="modal-body prose legal" aria-busy={html === null}>
            {html === null ? <p>{t(site, "txt_loading")}</p> : <div dangerouslySetInnerHTML={{ __html: html }} />}
          </div>
          <div className="modal-foot">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              {t(site, "txt_modal_close")}
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
