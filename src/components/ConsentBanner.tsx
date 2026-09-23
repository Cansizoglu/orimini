"use client";

import { useEffect, useState } from "react";
import type { LegalSlug } from "@/content/legal";
import { LegalModal } from "./LegalModal";

const KEY = "orimini-onay";

export function ConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState<LegalSlug | null>(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.localStorage.getItem(KEY) === "1";
    } catch {
      seen = false;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!seen) setVisible(true);
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      // depolama kapalıysa sadece bu oturumda gizle
    }
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="consent-banner" role="dialog" aria-live="polite" aria-label="KVKK ve çerez bilgilendirmesi">
          <p>
            Sitemizde yalnızca sepet ve favorilerinizi hatırlamak için tarayıcı depolaması kullanıyoruz. Kişisel
            verileriniz{" "}
            <button type="button" className="inline-link" onClick={() => setOpen("kvkk-aydinlatma-metni")}>
              KVKK Aydınlatma Metni
            </button>{" "}
            ve{" "}
            <button type="button" className="inline-link" onClick={() => setOpen("cerez-politikasi")}>
              Çerez Politikası
            </button>{" "}
            kapsamında korunur.
          </p>
          <button type="button" className="btn btn-primary btn-small" onClick={accept}>
            Anladım
          </button>
        </div>
      )}
      <LegalModal slug={open} onClose={() => setOpen(null)} />
    </>
  );
}
