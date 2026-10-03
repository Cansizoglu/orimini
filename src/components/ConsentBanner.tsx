"use client";

import { Fragment, useEffect, useState } from "react";
import { useSite } from "@/lib/catalog";
import { t } from "@/lib/site";
import { LegalModal, type LegalSlug } from "./LegalModal";

const KEY = "orimini-onay";

export function ConsentBanner() {
  const site = useSite();
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
            {site.raw.consent_text.split(/(\{kvkk\}|\{cerez\})/).map((part, i) =>
              part === "{kvkk}" ? (
                <button key={i} type="button" className="inline-link" onClick={() => setOpen("kvkk-aydinlatma-metni")}>
                  KVKK Aydınlatma Metni
                </button>
              ) : part === "{cerez}" ? (
                <button key={i} type="button" className="inline-link" onClick={() => setOpen("cerez-politikasi")}>
                  Çerez Politikası
                </button>
              ) : (
                <Fragment key={i}>{part}</Fragment>
              ),
            )}
          </p>
          <button type="button" className="btn btn-primary btn-small" onClick={accept}>
            {t(site, "txt_consent_accept")}
          </button>
        </div>
      )}
      <LegalModal slug={open} onClose={() => setOpen(null)} />
    </>
  );
}
