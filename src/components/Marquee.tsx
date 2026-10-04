import Link from "next/link";
import { fill, isOn } from "@/lib/site";
import type { Site } from "@/lib/types";
import { resolveLink } from "@/lib/whatsapp";

// Arama kutusunun altındaki kayan kampanya yazısı. Metin, hız ve renkler panelden gelir.
export function Marquee({ site }: { site: Site }) {
  if (!isOn(site, "marquee_active")) return null;
  const items = (site.raw.marquee_text ?? "")
    .split("\n")
    .map((l) => fill(l.trim(), site))
    .filter(Boolean);
  if (items.length === 0) return null;

  // Hız 1-10: yazı uzadıkça süre de uzar, böylece her uzunlukta aynı hızda kayar.
  const speed = Math.min(10, Math.max(1, Number(site.raw.marquee_speed) || 4));
  const length = items.join(" ✦ ").length;
  const duration = Math.max(6, Math.round((length * 0.9) / speed));

  const track = (hidden: boolean) => (
    <ul className="marquee-group" aria-hidden={hidden || undefined}>
      {items.map((text, i) => (
        <li key={i}>
          {text}
          <span className="marquee-sep" aria-hidden>
            ✦
          </span>
        </li>
      ))}
    </ul>
  );

  const style = {
    "--marquee-duration": `${duration}s`,
    "--marquee-bg": site.raw.marquee_bg || "#f3dcd4",
    "--marquee-color": site.raw.marquee_color || "#5a3825",
  } as React.CSSProperties;

  const inner = (
    <div className="marquee-track">
      {track(false)}
      {track(true)}
    </div>
  );

  const link = site.raw.marquee_link?.trim();
  if (!link) {
    return (
      <div className="marquee" style={style} aria-label="Kampanyalar">
        {inner}
      </div>
    );
  }
  const { href, external } = resolveLink(site, link);
  return external ? (
    <a className="marquee" style={style} href={href} target="_blank" rel="noopener noreferrer">
      {inner}
    </a>
  ) : (
    <Link className="marquee" style={style} href={href}>
      {inner}
    </Link>
  );
}
