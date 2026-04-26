import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Supabase appends type=recovery for password-reset emails, type=signup for email confirm.
  const type = searchParams.get("type");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Password-reset flow → /reset to set new password.
      // All other flows (signup confirm, magic link) → /panel.
      const destination = type === "recovery" ? "/reset" : "/panel";
      return NextResponse.redirect(`${origin}${destination}`);
    }
  }

  // Error or missing code — send user back to login with error flag.
  return NextResponse.redirect(`${origin}/entrar?error=auth_callback_failed`);
}
