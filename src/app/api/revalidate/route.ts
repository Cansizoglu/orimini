import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { CONTENT_TAG } from "@/lib/content";
import { createServerSupabaseClient } from "@/lib/supabase/server";

// Admin panelinde her kayıttan sonra çağrılır: önbelleği temizler, site anında güncellenir.
export async function POST() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  const { data: admin } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  if (!admin) return NextResponse.json({ ok: false }, { status: 403 });

  revalidateTag(CONTENT_TAG, { expire: 0 });
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
