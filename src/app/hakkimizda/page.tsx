import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { WhatsAppIcon } from "@/components/icons";
import { site } from "@/data/site";
import { questionMessage, whatsappUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: `${site.name}, ${site.city}'da kişiye özel nakışlı bebek ve çocuk kıyafetleri hazırlayan bir butik atölyedir.`,
  alternates: { canonical: "/hakkimizda" },
};

export default function AboutPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ name: "Hakkımızda", href: "/hakkimizda" }]} />
      <div className="split" style={{ paddingBottom: 60 }}>
        <div className="prose" style={{ paddingBottom: 0 }}>
          <p className="eyebrow" lang="en">
            {site.slogan}
          </p>
          <h1>Küçükler için, sevgiyle ve özenle</h1>
          <p className="lead">
            {site.name}, {site.city}&apos;da bebek ve çocuklar için kişiye özel kıyafetler hazırlayan butik bir
            atölyedir.
          </p>
          <p>
            Her takımı tek tek kesiyor, dikiyor ve bebeğinizin adıyla, doğum tarihiyle ya da ilk yaşıyla nakışlıyoruz.
            Salopet takımlardan kız elbiselerine, hastane çıkışı setlerinden doğum günü kıyafetlerine kadar her
            parçada yumuşak, cilt dostu kumaşlar ve pastel tonlar kullanıyoruz.
          </p>
          <p>
            Amacımız, çocuğunuzun özel gününü fotoğraflarda ve anılarda bir ömür yaşatacak kıyafetler hazırlamak.
            Beden, renk ya da tema konusunda aklınızdakini bize yazmanız yeterli.
          </p>
          <a
            href={whatsappUrl(questionMessage())}
            className="btn btn-whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={20} /> Bize yazın
          </a>
        </div>
        <div className="split-media">
          <Image src="/images/orimini-logo.jpg" alt={`${site.name} logosu`} fill sizes="(max-width: 860px) 100vw, 50vw" />
        </div>
      </div>
    </div>
  );
}
