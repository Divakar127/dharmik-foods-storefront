import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { apiBase, cartCookie, cookieOptions, sessionCookie, shopHeaders } from "../../../../lib/shop-server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
async function proxy(request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  if (request.method !== "GET" && request.headers.get("origin") !== new URL(request.url).origin) {
    return NextResponse.json({ detail: "Invalid request origin" }, { status: 403 });
  }
  const route = (await params).path.join("/");
  const allowed: Record<string, string[]> = { "delivery/check": ["GET"], "search/suggestions": ["GET"], "newsletter/subscribe": ["POST"], "newsletter/unsubscribe": ["POST"], "auth/config": ["GET"], "auth/me": ["GET", "PATCH"], "auth/logout": ["POST"], cart: ["GET"], "cart/items": ["PUT"], orders: ["GET", "POST"] };
  if (!(allowed[route] || (/^orders\/[a-f0-9]{32}$/.test(route) ? ["GET"] : [])).includes(request.method)) {
    return NextResponse.json({ detail: "Not found" }, { status: 404 });
  }
  const headers = await shopHeaders();
  let newCart = "";
  if (!headers["X-Cart-Token"] && route.startsWith("cart")) {
    newCart = randomBytes(32).toString("base64url"); headers["X-Cart-Token"] = newCart;
  }
  try {
    const text = request.method === "GET" ? undefined : await request.text();
    if (text && text.length > 16384) return NextResponse.json({ detail: "Request too large" }, { status: 413 });
    const upstream = await fetch(`${apiBase}/api/v1/${route}${new URL(request.url).search}`, { method: request.method, headers, body: text || undefined, cache: "no-store", signal: AbortSignal.timeout(20000) });
    const response = new NextResponse(upstream.status === 204 ? null : await upstream.text(), { status: upstream.status,
      headers: { "Content-Type": "application/json", "Cache-Control": "private, no-store" } });
    if (newCart) response.cookies.set(cartCookie, newCart, { ...cookieOptions, maxAge: 30 * 86400 });
    if (upstream.status === 401 || (route === "auth/logout" && upstream.ok)) response.cookies.set(sessionCookie, "", { ...cookieOptions, maxAge: 0 });
    if (route === "auth/logout" && upstream.ok) response.cookies.set(cartCookie, "", { ...cookieOptions, maxAge: 0 });
    return response;
  } catch { return NextResponse.json({ detail: "The shop service is unavailable. Please try again shortly." }, { status: 502 }); }
}
export { proxy as GET, proxy as PUT, proxy as POST, proxy as PATCH };
