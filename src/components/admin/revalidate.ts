// Kayıttan sonra sitenin önbelleğini temizler; değişiklik sitede hemen görünür.
export async function revalidateSite() {
  try {
    await fetch("/api/revalidate", { method: "POST" });
  } catch {
    // Ağ hatasında site en geç bir saat içinde kendiliğinden yenilenir.
  }
}

export function slugify(text: string) {
  return text
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
