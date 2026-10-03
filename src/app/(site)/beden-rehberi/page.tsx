import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { RichText } from "@/components/RichText";
import { getContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { fill, t } from "@/lib/site";

export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("beden-rehberi");
}

export default async function SizeGuidePage() {
  const { site, pages, sizes } = await getContent();
  const page = pages.find((p) => p.slug === "beden-rehberi");
  return (
    <div className="container prose">
      <Breadcrumbs items={[{ name: "Beden Rehberi", href: "/beden-rehberi" }]} />
      <h1>{page ? fill(page.title, site) : "Beden Rehberi"}</h1>
      {page?.lead && <p className="lead">{fill(page.lead, site)}</p>}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">{t(site, "txt_size_col")}</th>
              <th scope="col">{t(site, "txt_height_col")}</th>
              <th scope="col">{t(site, "txt_weight_col")}</th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((s) => (
              <tr key={s.id}>
                <th scope="row">{s.label}</th>
                <td>{s.height}</td>
                <td>{s.weight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {page && <RichText html={page.content} site={site} />}
    </div>
  );
}
