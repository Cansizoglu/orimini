import { NextResponse } from "next/server";
import { getContent } from "@/lib/content";
import { fill } from "@/lib/site";

// Sözleşme pencereleri (sipariş onayı, çerez bildirimi) metni buradan çeker.
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { site, pages } = await getContent();
  const page = pages.find((p) => p.slug === slug);
  if (!page) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json({ title: page.title, html: fill(page.content, site, { html: true }) });
}
