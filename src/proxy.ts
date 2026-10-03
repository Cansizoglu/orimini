import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL, hasSupabase } from "@/lib/supabase/config";

// /admin sayfalarını korur: oturum yoksa giriş sayfasına yönlendirir, oturumu yeniler.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  if (!hasSupabase) return response;

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;
  const isLogin = pathname.startsWith("/admin/giris");

  if (!user && !isLogin) return NextResponse.redirect(new URL("/admin/giris", request.url));
  if (user && isLogin) return NextResponse.redirect(new URL("/admin", request.url));
  return response;
}

export const config = {
  matcher: ["/admin/:path*"],
};
