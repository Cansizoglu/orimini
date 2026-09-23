import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClockIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { site } from "@/data/site";
import { questionMessage, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${site.name} iletişim bilgileri: WhatsApp ve telefon ${site.phoneDisplay}, ${site.city}. Sipariş ve özel tasarım talepleriniz için bize yazın.`,
  alternates: { canonical: "/iletisim" },
};

export default function ContactPage() {
  return (
    <div className="container prose" style={{ maxWidth: 960 }}>
      <Breadcrumbs items={[{ name: "İletişim", href: "/iletisim" }]} />
      <h1>İletişim</h1>
      <p className="lead">
        Siparişleriniz, özel tasarım talepleriniz ve beden sorularınız için bize WhatsApp&apos;tan ulaşabilirsiniz.
        Atölyemiz {site.city}&apos;dadır, tüm Türkiye&apos;ye kargo gönderiyoruz.
      </p>
      <div className="contact-cards">
        <a href={whatsappUrl(questionMessage())} target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon size={26} />
          <strong>WhatsApp</strong>
          <span>{site.phoneDisplay}</span>
        </a>
        <a href={`tel:${site.phoneE164}`}>
          <PhoneIcon size={26} />
          <strong>Telefon</strong>
          <span>{site.phoneDisplay}</span>
        </a>
        <div>
          <ClockIcon size={26} />
          <strong>Çalışma saatleri</strong>
          <span>{site.workingHours}</span>
        </div>
      </div>
      <h2>Konum</h2>
      <p>
        {site.address}. {site.city} içinden siparişlerde elden teslim seçeneği için WhatsApp üzerinden bilgi
        alabilirsiniz.
      </p>
    </div>
  );
}
