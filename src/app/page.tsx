import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { SafeImage } from "@/components/SafeImage";
import { TrustBar } from "@/components/TrustBar";
import { WhatsAppIcon } from "@/components/icons";
import { categories, products } from "@/data/products";
import { site } from "@/data/site";
import { questionMessage, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: { absolute: `${site.name} | Kişiye Özel Nakışlı Bebek ve Çocuk Kıyafetleri` },
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <p className="eyebrow" lang="en">
              {site.slogan}
            </p>
            <h1>Minikler için sevgiyle işlenen, kişiye özel kıyafetler</h1>
            <p className="lead">
              İsim ve tarih nakışlı salopet takımlar, pastel tonlarda kız elbiseleri ve yenidoğan setleri. Her
              parça {site.city}&apos;daki atölyemizde, bebeğinize özel hazırlanır.
            </p>
            <div className="hero-actions">
              <Link href="/urunler" className="btn btn-primary btn-large">
                Koleksiyonu keşfet
              </Link>
              <a
                href={whatsappUrl(questionMessage())}
                className="btn btn-whatsapp btn-large"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={22} /> WhatsApp&apos;tan sor
              </a>
            </div>
            <ul className="hero-points">
              <li>0-3 aydan 10 yaşa</li>
              <li>Ücretsiz isim nakışı</li>
              <li>Türkiye geneli kargo</li>
            </ul>
          </div>
          <div className="hero-media">
            <div className="hero-photo">
              <Image
                src="/images/urunler/bej-aslan-salopet.webp"
                alt="İsim ve doğum tarihi nakışlı bej aslan temalı 1 yaş salopet takımı"
                fill
                priority
                sizes="(max-width: 860px) 80vw, 420px"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="Neden Orimini">
        <div className="container">
          <TrustBar />
        </div>
      </section>

      <section className="section" aria-labelledby="kategoriler">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Kategoriler</p>
              <h2 id="kategoriler">Her özel güne bir takım</h2>
            </div>
            <Link href="/urunler" className="text-link">
              Tüm ürünler
            </Link>
          </div>
          <div className="category-grid">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/kategori/${c.slug}`}
                className="category-card"
                style={{ "--tint": c.tint } as React.CSSProperties}
              >
                <div className="category-card-media">
                  <SafeImage src={c.image} alt={c.name} fill sizes="(max-width: 900px) 50vw, 25vw" />
                </div>
                <div className="category-card-body">
                  <h3>{c.name}</h3>
                  <span>İncele →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section band" aria-labelledby="one-cikanlar">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Öne çıkanlar</p>
              <h2 id="one-cikanlar">En sevilen modeller</h2>
            </div>
            <Link href="/urunler" className="text-link">
              Hepsini gör
            </Link>
          </div>
          <div className="product-grid">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="kisiye-ozel">
        <div className="container split">
          <div className="split-media">
            <Image
              src="/images/urunler/kirmizi-sirk-salopet.webp"
              alt="Kollarına Yağız Ali ismi nakışlanmış kırmızı sirk temalı salopet takım"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="eyebrow">Kişiye özel</p>
            <h2 id="kisiye-ozel">Adı üzerinde, anısı bir ömür</h2>
            <p className="lead">
              Bebeğinizin adını, doğum tarihini ya da ilk yaşını seçtiğiniz takıma nakışla işliyoruz. Sirk,
              aslan, ayıcık gibi temalarla doğum günü ve fotoğraf çekimlerine özel tasarımlar hazırlıyoruz.
            </p>
            <ul className="check-list">
              <li>İsim ve tarih nakışı ücretsiz</li>
              <li>Nakış yazımı siparişten önce WhatsApp&apos;tan onaylanır</li>
              <li>Renk ve tema için özel istekleri dinliyoruz</li>
            </ul>
            <a
              href={whatsappUrl(`Merhaba ${site.name}, kişiye özel bir takım yaptırmak istiyorum.`)}
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={20} /> Özel tasarım iste
            </a>
          </div>
        </div>
      </section>

      <section className="section band-blush" aria-labelledby="nasil-siparis">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Kolay sipariş</p>
              <h2 id="nasil-siparis">WhatsApp ile 4 adımda sipariş</h2>
            </div>
            <Link href="/sikca-sorulan-sorular" className="text-link">
              Sıkça sorulan sorular
            </Link>
          </div>
          <ol className="steps">
            <li>
              <h3>Ürünü seçin</h3>
              <p>Beğendiğiniz modeli açın, yaş / beden seçin.</p>
            </li>
            <li>
              <h3>Nakışı yazın</h3>
              <p>İşlenecek isim veya tarihi ekleyin.</p>
            </li>
            <li>
              <h3>WhatsApp&apos;a gönderin</h3>
              <p>Sipariş bilgileriniz mesaja otomatik yazılır.</p>
            </li>
            <li>
              <h3>Onay ve kargo</h3>
              <p>Ödeme ve teslim bilgilerini netleştirip hazırlamaya başlarız.</p>
            </li>
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="cta-box">
            <p className="eyebrow">{site.city} merkezli atölye</p>
            <h2>Aklınızdaki takımı birlikte tasarlayalım</h2>
            <p>
              Beden, renk ya da nakış konusunda kararsız kaldıysanız bize yazın; size en uygun modeli birlikte
              seçelim.
            </p>
            <a
              href={whatsappUrl(questionMessage())}
              className="btn btn-whatsapp btn-large"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={22} /> {site.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
