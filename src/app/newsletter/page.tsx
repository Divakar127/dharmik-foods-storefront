"use client";
import { useState } from "react";
import { Header, Footer } from "../../components/shell";
import { shopRequest } from "../../components/commerce";
export default function NewsletterPreferences() {
  const [message, setMessage] = useState(""), [busy, setBusy] = useState(false);
  async function unsubscribe() { setBusy(true); try { const token = new URLSearchParams(window.location.search).get("token"); if (!token) throw new Error("Open your private unsubscribe link to update your preference."); const result = await shopRequest<{message:string}>("newsletter/unsubscribe", { method: "POST", body: JSON.stringify({ token }) }); setMessage(result.message); } catch(e) { setMessage((e as Error).message); } finally { setBusy(false); } }
  return <><Header/><main id="main-content" className="container commerce-page"><div className="page-heading"><p className="eyebrow">NEWSLETTER PREFERENCES</p><h1>Your inbox. Your choice.</h1><p>Use your private preference link to stop receiving future newsletters.</p></div><button className="button" disabled={busy} onClick={unsubscribe}>{busy ? "Updating…" : "Unsubscribe"}</button>{message && <p role="status">{message}</p>}</main><Footer/></>;
}
