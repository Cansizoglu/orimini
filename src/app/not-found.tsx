import Link from "next/link";
import { SiteShell } from "@/components/SiteShell";
import { getSite } from "@/lib/content";
import { t } from "@/lib/site";

export default async function NotFound() {
  const site = await getSite();
  return (
    <SiteShell>
      <div className="container section">
        <div className="cta-box">
          <p className="eyebrow">404</p>
          <h1>{t(site, "txt_404_title")}</h1>
          <p>{t(site, "txt_404_text")}</p>
          <Link href="/urunler" className="btn btn-primary">
            {t(site, "txt_404_button")}
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}
