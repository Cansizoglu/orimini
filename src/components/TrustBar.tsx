import { fill, splitLine } from "@/lib/site";
import type { Site } from "@/lib/types";
import { iconFor } from "./icons";

const fallbackIcons = ["nakis", "kalp", "kargo", "whatsapp"] as const;

// Her madde "ikon | başlık | açıklama" ya da "başlık | açıklama" biçimindedir.
export function TrustBar({ items, site }: { items: string[]; site: Site }) {
  const rows = items.map((line, i) => {
    const parts = splitLine(fill(line, site));
    const [icon, title, text] = parts.length >= 3 ? parts : [fallbackIcons[i % 4], parts[0], parts[1] ?? ""];
    return { Icon: iconFor(icon, fallbackIcons[i % 4]), title, text };
  });
  return (
    <ul className="trust-bar">
      {rows.map(({ Icon, title, text }) => (
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
