import { cookies } from "next/headers";
export const apiBase = process.env.API_URL || "http://localhost:8000";
export const sessionCookie = "df_customer_session";
export const cartCookie = "df_guest_cart";
export const cookieOptions = { httpOnly: true, sameSite: "lax" as const, secure: process.env.NODE_ENV === "production", path: "/" };
export async function shopHeaders() {
  const jar = await cookies();
  const token = jar.get(sessionCookie)?.value;
  return { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), "X-Cart-Token": jar.get(cartCookie)?.value || "" };
}
