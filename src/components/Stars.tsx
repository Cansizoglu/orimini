import { StarIcon } from "./icons";

export function Stars({ value, size = 16, label }: { value: number; size?: number; label?: string }) {
  return (
    <span className="stars" role="img" aria-label={label ?? `5 üzerinden ${value.toLocaleString("tr-TR")} puan`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} size={size} fill={Math.max(0, Math.min(1, value - (i - 1)))} />
      ))}
    </span>
  );
}
