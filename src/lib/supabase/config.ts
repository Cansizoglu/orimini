// Supabase bağlantı bilgileri. Anon (publishable) anahtar herkese açık olacak şekilde tasarlanmıştır;
// veriyi RLS kuralları korur (okuma herkese, yazma sadece admin_users). Vercel'de ortam değişkeni
// tanımlanırsa o kullanılır.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
