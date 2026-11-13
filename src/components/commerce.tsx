"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Cart, Customer } from "../shared/commerce";
import { Icon } from "./icons";

export async function shopRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`/api/shop/${path}`, { ...init, headers: { "Content-Type": "application/json", ...init?.headers }, cache: "no-store" });
  const body = response.status === 204 ? null : await response.json();
  if (!response.ok) {
    const detail = body?.detail;
    throw new Error(typeof detail === "string" ? detail : Array.isArray(detail) ? detail.map((e: { msg: string }) => e.msg).join(". ") : "Unable to complete this request.");
  }
  return body as T;
}
type State = { user: Customer | null; cart: Cart | null; loading: boolean; error: string; refresh: () => Promise<void>; change: (id: number, quantity: number) => Promise<void>; busy: boolean };
const Context = createContext<State | null>(null);
export function CommerceProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Customer | null>(null), [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true), [error, setError] = useState(""), [busy, setBusy] = useState(false);
  const locking = useRef(false);
  const refresh = useCallback(async () => {
    setError("");
    try {
      const me = await fetch("/api/shop/auth/me", { cache: "no-store" });
      if (!me.ok && me.status !== 401) throw new Error("Your account could not be loaded. Please try again.");
      setUser(me.ok ? await me.json() : null);
      setCart(await shopRequest<Cart>("cart"));
    } catch(e) { setError((e as Error).message); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    void refresh();
    const focus = () => { if (!locking.current) void refresh(); };
    window.addEventListener("focus", focus);
    const channel = new BroadcastChannel("df-shop");
    channel.onmessage = focus;
    return () => { channel.close(); window.removeEventListener("focus", focus); };
  }, [refresh]);
  async function change(id: number, quantity: number) {
    if (!cart || locking.current) throw new Error("Please wait for your cart to finish updating.");
    locking.current = true; setBusy(true);
    try {
      const next = await shopRequest<Cart>("cart/items", { method: "PUT", body: JSON.stringify({ product_id: id, quantity, version: cart.version }) });
      setCart(next); setError("");
      const channel = new BroadcastChannel("df-shop"); channel.postMessage("changed"); channel.close();
    } catch(e) { await refresh(); throw e; }
    finally { locking.current = false; setBusy(false); }
  }
  return <Context.Provider value={{ user, cart, loading, error, refresh, change, busy }}>{children}</Context.Provider>;
}
export function useCommerce() { const state = useContext(Context); if (!state) throw new Error("CommerceProvider required"); return state; }
export function ShopLinks() {
  const { user, cart } = useCommerce();
  return <div className="shop-links"><a href="/account" className="shop-link" aria-label={user ? "My account" : "Sign in"} title={user ? "My account" : "Sign in"}><Icon name="user" size={22}/><span>{user ? "Account" : "Sign in"}</span></a><a href="/cart" className="shop-link cart-link" aria-label={`Cart, ${cart?.item_count || 0} items`} title="Cart"><span className="cart-icon"><Icon name="cart" size={22}/><b>{cart?.item_count || 0}</b></span><span>Cart</span></a></div>;
}
export function AddToCart({ id, available, detailed = false, compact = false, name = "product" }: { id: number; available: boolean; detailed?: boolean; compact?: boolean; name?: string }) {
  const { cart, loading, busy, change, error } = useCommerce();
  const [notice, setNotice] = useState(""); const [failed, setFailed] = useState(false);
  const current = cart?.items.find(i => i.product_id === id)?.quantity || 0;
  async function add() {
    setNotice(""); setFailed(false);
    try { await change(id, current + 1); setNotice("Added to cart"); }
    catch(e) { setFailed(true); setNotice((e as Error).message); }
  }
  const label = !available ? `${name} is unavailable` : busy ? `Updating ${name}` : `Add ${name} to cart${current ? `, ${current} already in cart` : ""}`;
  return <div className={`add-cart-wrap${detailed ? " detailed" : ""}${compact ? " compact" : ""}`}><button className="add-cart-button" aria-label={compact ? label : undefined} title={compact ? label : undefined} aria-busy={busy} onClick={add} disabled={!available || loading || busy || !cart || current >= 99}><Icon name="cart" size={compact ? 19 : 17}/>{!compact && <>{!available ? "Unavailable" : busy ? "Updating…" : "Add to cart"}</>}{current > 0 && <span className={compact ? "card-cart-count" : undefined} aria-hidden={compact || undefined}>{compact ? current : `(${current})`}</span>}</button>{(notice || (error && !cart)) && <p role={failed || error ? "alert" : "status"} className={failed || error ? "cart-feedback failed" : "cart-feedback"}>{notice || error}{notice === "Added to cart" && <> · <a href="/cart">View cart</a></>}</p>}</div>;
}
