// Supabase bağlantı bilgileri. Anon (publishable) anahtar herkese açık olacak şekilde tasarlanmıştır;
// veriyi RLS kuralları korur (okuma herkese, yazma sadece admin_users). Vercel'de ortam değişkeni
// tanımlanırsa o kullanılır.
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ldsjtlczbwzjwolgygti.supabase.co";
export const SUPABASE_ANON_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxkc2p0bGN6Ynd6andvbGd5Z3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2OTI1NDIsImV4cCI6MjEwNjI2ODU0Mn0.nLoeqAEcRdBX4z8W4W2cEmRdBg9vO644ZEMMkp_unCo";

export const hasSupabase = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
