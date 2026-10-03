// supabase/seed.sql dosyasını src/data altındaki kurulum verisinden üretir.
// Çalıştırma: npx tsx scripts/generate-seed.ts
import { writeFileSync } from "node:fs";
import { seed } from "../src/data/seed";

const order = ["site_settings", "sizes", "categories", "products", "home_sections", "pages", "faqs", "menu_items"];
const conflict: Record<string, string> = {
  site_settings: "key",
  sizes: "slug",
  categories: "slug",
  products: "slug",
  home_sections: "section_key",
  pages: "slug",
};

const textArrays = new Set(["set_contents", "care", "sizes", "badges"]);

function literal(key: string, value: unknown): string {
  if (value === null || value === undefined) return "null";
  if (typeof value === "boolean") return value ? "true" : "false";
  if (typeof value === "number") return String(value);
  if (Array.isArray(value) && textArrays.has(key)) {
    if (value.length === 0) return "'{}'::text[]";
    return `array[${value.map((v) => literal("", String(v))).join(", ")}]::text[]`;
  }
  if (typeof value === "object") return `${literal("", JSON.stringify(value))}::jsonb`;
  return `'${String(value).replace(/'/g, "''")}'`;
}

let sql = `-- =============================================
-- ORIMINI - İLK İÇERİK (schema.sql'den sonra çalıştırın)
-- Bu dosya scripts/generate-seed.ts ile src/data altındaki içerikten üretilir.
-- Var olan kayıtlara dokunmaz (on conflict do nothing), tekrar çalıştırmak güvenlidir.
-- =============================================
`;

for (const table of order) {
  const rows = seed[table];
  if (!rows?.length) continue;
  const columns = [...new Set(rows.flatMap((r) => Object.keys(r)))];
  sql += `\n-- ${table}\n`;
  if (!conflict[table]) {
    // Benzersiz anahtarı olmayan tablolar sadece boşsa doldurulur.
    sql += `insert into ${table} (${columns.join(", ")})\nselect * from (values\n`;
    sql += rows.map((r) => `  (${columns.map((c) => literal(c, r[c])).join(", ")})`).join(",\n");
    sql += `\n) as v(${columns.join(", ")})\nwhere not exists (select 1 from ${table});\n`;
  } else {
    sql += `insert into ${table} (${columns.join(", ")}) values\n`;
    sql += rows.map((r) => `  (${columns.map((c) => literal(c, r[c])).join(", ")})`).join(",\n");
    sql += `\non conflict (${conflict[table]}) do nothing;\n`;
  }
}

writeFileSync(new URL("../supabase/seed.sql", import.meta.url), sql);
console.log("supabase/seed.sql yazıldı");
