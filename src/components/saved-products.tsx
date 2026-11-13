"use client";
import { useEffect, useState } from "react";
import type { Product } from "../shared/catalog";
import { useSaved } from "./saved";
import { ProductCard } from "./product-card";
import { Icon } from "./icons";
export function SavedProducts() {
  const { ids, ready, toggle } = useSaved();
  const [products, setProducts] = useState<Product[]>([]);
  const [missing, setMissing] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);
  useEffect(() => {
    if (!ready) return;
    const controller = new AbortController();
    setLoading(true); setError(false);
    Promise.allSettled(ids.map(async id => {
      const response = await fetch(`/api/products/${id}`, { signal: controller.signal, cache: "no-store" });
      if (response.status === 404) return { id, product: null };
      if (!response.ok) throw new Error("Catalog unavailable");
      return { id, product: await response.json() as Product };
    })).then(results => {
      if (controller.signal.aborted) return;
      const found: Product[] = []; const unavailable: number[] = [];
      for (const result of results) if (result.status === "fulfilled") result.value.product ? found.push(result.value.product) : unavailable.push(result.value.id);
      setProducts(found); setMissing(unavailable); setError(results.some(r => r.status === "rejected")); setLoading(false);
    });
    return () => controller.abort();
  }, [ids, ready, retry]);
  if (!ready || loading) return <p className="empty" role="status">Loading saved foods…</p>;
  if (ids.length === 0) return <div className="empty"><Icon name="heart" size={38}/><h3>Your favourites belong here</h3><p>Tap the heart on a product to save it for later.</p><a className="button" href="/#catalog">Explore all food</a></div>;
  return <>{error && <p role="alert" className="detail-notice">Some products could not be loaded. <button className="retry-button" onClick={() => setRetry(r => r + 1)}>Try again</button></p>}<div className="products saved-products">{products.map(p => <ProductCard key={p.id} product={p}/>)}{missing.map(id => <article key={id} className="saved-missing"><h3>Product no longer available</h3><p>This product has been removed from the public catalog.</p><button onClick={() => toggle(id)}>Remove from saved foods</button></article>)}</div></>;
}
