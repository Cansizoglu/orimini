"use client";

import { Fragment, useState } from "react";
import { useCatalog } from "@/lib/catalog";
import { t } from "@/lib/site";
import { LegalModal, type LegalSlug } from "./LegalModal";

export function OrderConsent({
  checked,
  onChange,
  error,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  error?: boolean;
}) {
  const [open, setOpen] = useState<LegalSlug | null>(null);
  const { site, legalTitles } = useCatalog();
  const links: Record<string, LegalSlug> = {
    on_bilgi: "on-bilgilendirme-formu",
    mesafeli: "mesafeli-satis-sozlesmesi",
    kvkk: "kvkk-aydinlatma-metni",
  };
  // {on_bilgi}, {mesafeli}, {kvkk} yer tutucuları sözleşme linkine dönüşür.
  const parts = t(site, "txt_consent_sentence").split(/(\{(?:on_bilgi|mesafeli|kvkk)\})/);
  const link = (slug: LegalSlug, label: string) => (
    <button type="button" className="inline-link" onClick={() => setOpen(slug)}>
      {label}
    </button>
  );

  return (
    <div className={`consent${error ? " has-error" : ""}`}>
      <label>
        <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
        <span>
          {parts.map((part, i) => {
            const slug = links[part.slice(1, -1)];
            return <Fragment key={i}>{slug ? link(slug, legalTitles[slug] ?? slug) : part}</Fragment>;
          })}
        </span>
      </label>
      {error && (
        <p className="form-error" role="alert">
          {t(site, "txt_consent_error")}
        </p>
      )}
      <LegalModal slug={open} onClose={() => setOpen(null)} />
    </div>
  );
}
