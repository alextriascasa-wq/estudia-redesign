import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = [
  "/panel",
  "/plan",
  "/tarjetas",
  "/documentos",
  "/examenes",
  "/ajustes",
];

const AUTH_PAGES = ["/entrar", "/registro", "/recuperar", "/reset"];

function isProtected(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

function isAuthPage(pathname: string): boolean {
  return AUTH_PAGES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session if expired.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname, searchParams } = request.nextUrl;

  // Block protected routes when logged out.
  if (!user && isProtected(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/entrar";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Send logged-in users away from auth pages (except reset flow).
  if (user && isAuthPage(pathname) && pathname !== "/reset") {
    const url = request.nextUrl.clone();
    url.pathname = searchParams.get("next") ?? "/panel";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return response;
}
