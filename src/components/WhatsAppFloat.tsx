"use client";

import { useSite } from "@/lib/catalog";
import { questionMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFloat() {
  const site = useSite();
  return (
    <a
      href={whatsappUrl(site, questionMessage(site))}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile bize yazın"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
