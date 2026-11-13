"use client";
import { useState, type FormEvent } from "react";
import { shopRequest } from "./commerce";
export function Newsletter() {
  const [busy, setBusy] = useState(false), [message, setMessage] = useState(""), [error, setError] = useState(""), [token, setToken] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); const form = e.currentTarget, data = new FormData(form); setBusy(true); setError("");
    try { const result = await shopRequest<{ message: string; unsubscribe_token?: string }>("newsletter/subscribe", { method: "POST", body: JSON.stringify({ email: data.get("email"), consent: data.get("consent") === "on", website: data.get("website") || "" }) }); setMessage(result.message); setToken(result.unsubscribe_token || ""); form.reset(); } catch(e) { setError((e as Error).message); } finally { setBusy(false); }
  }
  return <section className="newsletter-section" aria-labelledby="newsletter-title"><div><p className="eyebrow">NOTES FROM THE PANTRY</p><h2 id="newsletter-title">Traditional food, in your inbox</h2><p>Sign up for food stories, ingredient inspiration and updates from Dharmik Foods.</p></div><div><form onSubmit={submit}><label htmlFor="newsletter-email">Your email address</label><div className="newsletter-input"><input id="newsletter-email" name="email" type="email" autoComplete="email" required maxLength={254} placeholder="you@example.com"/><button disabled={busy}>{busy ? "Saving…" : "Subscribe →"}</button></div><label className="newsletter-consent"><input type="checkbox" name="consent" required/>I’d like to receive the newsletter. I can unsubscribe at any time.</label><div className="newsletter-trap" aria-hidden="true"><label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div></form>{error && <p role="alert" className="newsletter-feedback">{error}</p>}{message && <p role="status" className="newsletter-feedback">{message} {token && <a href={`/newsletter?token=${encodeURIComponent(token)}`}>Save your unsubscribe link ↗</a>}</p>}<p className="newsletter-privacy"><a href="/privacy">How we use your information</a></p></div></section>;
}
