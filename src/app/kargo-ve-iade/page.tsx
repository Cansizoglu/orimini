import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { formatPrice } from "@/data/products";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Kargo ve İade Koşulları",
  description: `${site.name} kargo, teslimat, değişim ve iade koşulları. ${formatPrice(site.freeShippingLimit)} üzeri ücretsiz kargo.`,
  alternates: { canonical: "/kargo-ve-iade" },
};

export default function ShippingPage() {
  return (
    <div className="container prose">
      <Breadcrumbs items={[{ name: "Kargo ve İade", href: "/kargo-ve-iade" }]} />
      <h1>Kargo ve İade</h1>

      <h2>Hazırlık süresi</h2>
      <p>
        Ürünlerimiz sipariş üzerine, kişiye özel olarak hazırlanır. Nakış yazımını WhatsApp&apos;tan onayladıktan
        sonra siparişiniz genellikle 3-7 iş günü içinde kargoya verilir. Yoğun dönemlerde (bayram, yılbaşı) bu süre
        uzayabilir; sipariş sırasında size net tarih bildiririz.
      </p>

      <h2>Kargo</h2>
      <ul>
        <li>{site.city} merkezli atölyemizden Türkiye&apos;nin her yerine gönderim yapıyoruz.</li>
        <li>{formatPrice(site.freeShippingLimit)} ve üzeri siparişlerde kargo ücretsizdir.</li>
        <li>Kargo takip numaranız WhatsApp üzerinden paylaşılır.</li>
        <li>{site.city} içi siparişlerde elden teslim seçeneği için bize yazabilirsiniz.</li>
      </ul>

      <h2>Ödeme</h2>
      <p>
        Siparişiniz WhatsApp üzerinden onaylandıktan sonra ödeme bilgileri (havale / EFT vb.) tarafınıza iletilir.
      </p>

      <h2>Değişim ve iade</h2>
      <ul>
        <li>
          İsim, tarih gibi kişiye özel nakış işlenen ürünler, kişiye özel üretildiği için üretim hatası dışında iade
          ve değişime kabul edilmez.
        </li>
        <li>
          Nakışsız ürünlerde, teslimattan itibaren 14 gün içinde, kullanılmamış ve etiketi sökülmemiş olması şartıyla
          beden değişimi yapılabilir.
        </li>
        <li>Üretim hatası olan ürünlerde kargo ücreti tarafımıza aittir; ürün yenilenir ya da ücret iade edilir.</li>
      </ul>
      <p>Değişim ve iade talepleriniz için WhatsApp hattımızdan ({site.phoneDisplay}) bize ulaşın.</p>
    </div>
  );
}
