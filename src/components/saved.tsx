"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Icon } from "./icons";
const storageKey = "dharmic-foods-saved-v1";
type SavedState = { ids: number[]; ready: boolean; toggle: (id: number) => void };
const SavedContext = createContext<SavedState>({ ids: [], ready: false, toggle: () => {} });
export function SavedProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<number[]>([]);
  const [ready, setReady] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    function read() {
      try { const value: unknown = JSON.parse(localStorage.getItem(storageKey) || localStorage.getItem("thermic-foods-saved-v1") || "[]"); setIds(Array.isArray(value) ? [...new Set(value.filter((id): id is number => typeof id === "number" && Number.isSafeInteger(id) && id > 0))].slice(0, 100) : []); }
      catch { setIds([]); }
    }
    read(); setReady(true);
    const sync = (e: StorageEvent) => { if (e.key === storageKey || e.key === null) read(); };
    window.addEventListener("storage", sync); return () => window.removeEventListener("storage", sync);
  }, []);
  function toggle(id: number) {
    if (!ready) return;
    const removing = ids.includes(id);
    if (!removing && ids.length >= 100) { setNotice("Your list has 100 foods. Remove one to save another."); return; }
    const next = removing ? ids.filter(value => value !== id) : [...ids, id];
    setIds(next);
    try { localStorage.setItem(storageKey, JSON.stringify(next)); setNotice(removing ? "Food removed from your saved list." : "Food saved. Find it in Saved foods."); }
    catch { setNotice("Your list is saved for this visit. Browser storage is unavailable."); }
  }
  return <SavedContext.Provider value={{ ids, ready, toggle }}>{children}<div className="save-notification" role="status" aria-live="polite">{notice && <><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => setNotice("")}><Icon name="close" size={16}/></button></>}</div></SavedContext.Provider>;
}
export const useSaved = () => useContext(SavedContext);
export function SaveButton({ id, name, detailed = false }: { id: number; name: string; detailed?: boolean }) {
  const { ids, ready, toggle } = useSaved(); const saved = ids.includes(id);
  return <button type="button" className={`${detailed ? "save-detail" : "save-button"}${saved ? " is-saved" : ""}`} disabled={!ready} aria-label={`${saved ? "Unsave" : "Save"} ${name}`} aria-pressed={saved} onClick={() => toggle(id)}><Icon name="heart" size={19}/>{detailed && (saved ? "Saved to your list" : "Save for later")}</button>;
}
export function SavedLink() { const { ids } = useSaved(); return <a href="/saved" className="saved-link" aria-label={`Wishlist, ${ids.length} saved items`} title="Wishlist"><span className="saved-link-icon"><Icon name="heart" size={22}/>{ids.length > 0 && <span className="saved-count">{ids.length}</span>}</span><span>Wishlist</span></a>; }
