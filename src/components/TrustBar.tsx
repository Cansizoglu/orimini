import { site } from "@/data/site";
import { formatPrice } from "@/data/products";
import { HeartIcon, NeedleIcon, TruckIcon, WhatsAppIcon } from "./icons";

const items = [
  { icon: NeedleIcon, title: "Ücretsiz isim nakışı", text: "İsim ve tarih nakışı fiyata dahil" },
  { icon: HeartIcon, title: "El emeği, özenli dikim", text: `${site.city} atölyemizde hazırlanır` },
  { icon: TruckIcon, title: "Türkiye'ye kargo", text: `${formatPrice(site.freeShippingLimit)} üzeri ücretsiz` },
  { icon: WhatsAppIcon, title: "WhatsApp ile sipariş", text: "Hızlı yanıt, kolay teyit" },
];

export function TrustBar() {
  return (
    <ul className="trust-bar">
      {items.map(({ icon: Icon, title, text }) => (
        <li key={title}>
          <span className="trust-icon">
            <Icon size={26} />
          </span>
          <span>
            <strong>{title}</strong>
            <small>{text}</small>
          </span>
        </li>
      ))}
    </ul>
  );
}
