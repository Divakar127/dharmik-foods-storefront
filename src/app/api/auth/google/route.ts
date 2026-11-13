import { NextResponse } from "next/server";
import { apiBase, cookieOptions } from "../../../../lib/shop-server";
export const runtime = "nodejs";
export async function GET(request: Request) {
  try {
    const upstream = await fetch(`${apiBase}/api/v1/auth/google/start`, { method: "POST", cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!upstream.ok) return NextResponse.redirect(new URL("/account?error=configuration", request.url));
    const { url, state } = await upstream.json();
    const response = NextResponse.redirect(url);
    response.headers.set("Cache-Control", "no-store");
    response.cookies.set("df_oauth_state", state, { ...cookieOptions, maxAge: 600 });
    return response;
  } catch { return NextResponse.redirect(new URL("/account?error=service", request.url)); }
}
