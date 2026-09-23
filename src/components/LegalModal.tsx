"use client";

import { useEffect, useRef } from "react";
import { legalDocs, type LegalSlug } from "@/content/legal";
import { CloseIcon } from "./icons";

export function LegalModal({ slug, onClose }: { slug: LegalSlug | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (slug && !dialog.open) dialog.showModal();
    if (!slug && dialog.open) dialog.close();
  }, [slug]);

  const doc = slug ? legalDocs[slug] : null;

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
      {doc && (
        <div className="modal-inner">
          <div className="modal-head">
            <h2 id="modal-baslik">{doc.title}</h2>
            <button type="button" className="icon-button" aria-label="Kapat" onClick={onClose}>
              <CloseIcon />
            </button>
          </div>
          <div className="modal-body prose legal">
            <doc.Body />
          </div>
          <div className="modal-foot">
            <button type="button" className="btn btn-primary" onClick={onClose}>
              Okudum, kapat
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
