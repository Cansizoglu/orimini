"use client";

import { useState } from "react";
import type { LegalSlug } from "@/content/legal";
import { LegalModal } from "./LegalModal";

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
          {link("on-bilgilendirme-formu", "Ön Bilgilendirme Formu")}&apos;nu ve{" "}
          {link("mesafeli-satis-sozlesmesi", "Mesafeli Satış Sözleşmesi")}&apos;ni okudum, onaylıyorum.{" "}
          {link("kvkk-aydinlatma-metni", "KVKK Aydınlatma Metni")}&apos;ni okudum.
        </span>
      </label>
      {error && (
        <p className="form-error" role="alert">
          Siparişe devam etmek için sözleşmeyi onaylayın.
        </p>
      )}
      <LegalModal slug={open} onClose={() => setOpen(null)} />
    </div>
  );
}
