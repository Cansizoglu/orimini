import { questionMessage, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl(questionMessage())}
      className="whatsapp-float"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile bize yazın"
    >
      <WhatsAppIcon size={30} />
    </a>
  );
}
