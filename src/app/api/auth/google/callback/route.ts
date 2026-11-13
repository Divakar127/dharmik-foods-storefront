import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { apiBase, cartCookie, cookieOptions, sessionCookie } from "../../../../../lib/shop-server";
export const runtime = "nodejs";
export async function GET(request: Request) {
  const url = new URL(request.url), jar = await cookies();
  const state = url.searchParams.get("state"), code = url.searchParams.get("code");
  const failure = () => {
    const response = NextResponse.redirect(new URL("/account?error=signin", request.url));
    response.cookies.set("df_oauth_state", "", { ...cookieOptions, maxAge: 0 });
    response.headers.set("Cache-Control", "no-store"); return response;
  };
  if (!state || !code || url.searchParams.has("error") || state !== jar.get("df_oauth_state")?.value) return failure();
  try {
    const upstream = await fetch(`${apiBase}/api/v1/auth/google/callback`, { method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ state, code, guest_token: jar.get(cartCookie)?.value || "" }), cache: "no-store", signal: AbortSignal.timeout(25000) });
    if (!upstream.ok) return failure();
    const { token } = await upstream.json();
    const response = NextResponse.redirect(new URL("/account?welcome=1", request.url));
    response.cookies.set(sessionCookie, token, { ...cookieOptions, maxAge: 7 * 86400 });
    response.cookies.set("df_oauth_state", "", { ...cookieOptions, maxAge: 0 });
    response.cookies.set(cartCookie, "", { ...cookieOptions, maxAge: 0 });
    response.headers.set("Cache-Control", "no-store"); return response;
  } catch { return failure(); }
}
