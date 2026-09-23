import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { formatPrice } from "@/data/products";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular - Nasıl Sipariş Verilir?",
  description: `${site.name}'den WhatsApp ile nasıl sipariş verilir, nakış, beden, kargo ve ödeme hakkında sıkça sorulan sorular.`,
  alternates: { canonical: "/sikca-sorulan-sorular" },
};

const faqs = [
  {
    q: "Nasıl sipariş verebilirim?",
    a: "Ürün sayfasında yaş / beden seçip nakış bilgisini yazdıktan sonra \"WhatsApp ile sipariş ver\" butonuna basın. Sipariş bilgileriniz hazır bir mesaj olarak WhatsApp'ta açılır, göndermeniz yeterli. Birden fazla ürün için ürünleri sepete ekleyip sepetten tek mesajla gönderebilirsiniz.",
  },
  {
    q: "İsim nakışı ücretli mi?",
    a: "Hayır. İsim ve tarih nakışı ürün fiyatına dahildir. Yazımı siparişten önce WhatsApp üzerinden sizinle teyit ederiz.",
  },
  {
    q: "Hangi yaş ve bedenler var?",
    a: "0-3 ay, 3-6 ay, 6-9 ay, 9-12 ay ve 12-18 ay bebek bedenlerinin yanında 2 yaştan 10 yaşa kadar çocuk bedenleri hazırlıyoruz. Her ürünün mevcut bedenleri ürün sayfasında gösterilir.",
  },
  {
    q: "Sipariş ne kadar sürede elime ulaşır?",
    a: "Nakış onayından sonra siparişler genellikle 3-7 iş günü içinde kargoya verilir. Kargo süresi bulunduğunuz ile göre 1-3 iş günüdür.",
  },
  {
    q: "Kargo ücreti ne kadar?",
    a: `${formatPrice(site.freeShippingLimit)} ve üzeri siparişlerde kargo ücretsizdir. Altındaki siparişlerde kargo ücreti sipariş sırasında bildirilir.`,
  },
  {
    q: "Ödemeyi nasıl yapıyorum?",
    a: "Siparişiniz WhatsApp'ta onaylandıktan sonra ödeme bilgileri size iletilir.",
  },
  {
    q: "Özel renk ya da tema isteyebilir miyim?",
    a: "Evet. Doğum günü teması, renk ya da nakış deseni için isteklerinizi WhatsApp'tan yazın, size özel bir takım hazırlayalım.",
  },
  {
    q: "İade ve değişim yapabilir miyim?",
    a: "Kişiye özel nakış işlenen ürünlerde üretim hatası dışında iade ve değişim yapılamaz. Nakışsız ürünlerde 14 gün içinde beden değişimi yapılabilir.",
  },
];

export default function FaqPage() {
  return (
    <div className="container prose">
      <Breadcrumbs items={[{ name: "Sıkça Sorulan Sorular", href: "/sikca-sorulan-sorular" }]} />
      <h1>Sıkça Sorulan Sorular</h1>
      <p className="lead">Aradığınız cevabı bulamazsanız WhatsApp&apos;tan ({site.phoneDisplay}) bize yazın.</p>
      <div className="faq">
        {faqs.map((f, i) => (
          <details key={f.q} open={i === 0}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />
    </div>
  );
}
