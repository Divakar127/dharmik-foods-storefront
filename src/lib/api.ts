import type { Product, ProductPage } from "../shared/catalog";
export type { Product } from "../shared/catalog";
const base = process.env.API_URL ?? "http://localhost:8000";
export async function getProducts(query: URLSearchParams): Promise<ProductPage> {
  const response = await fetch(`${base}/api/v1/products?${query}`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
  if (!response.ok) throw new Error("Unable to load the catalog. Please try again shortly.");
  return response.json();
}
export async function getProduct(id: string): Promise<Product | null> {
  if (!/^\d+$/.test(id)) return null;
  const response = await fetch(`${base}/api/v1/products/${id}`, { cache: "no-store", signal: AbortSignal.timeout(5000) });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error("Unable to load this product. Please try again shortly.");
  return response.json();
}

export async function getAbout(): Promise<import("../shared/catalog").AboutContent> {
 const response = await fetch(`${base}/api/v1/pages/about-us`, { cache: "no-store", signal: AbortSignal.timeout(8000) });
 if (!response.ok) throw new Error("Unable to load our story. Please try again shortly.");
 return response.json();
}

export async function getHomepage(): Promise<import("../shared/experience").Homepage> {
 const response = await fetch(`${base}/api/v1/pages/homepage`, { cache: "no-store", signal: AbortSignal.timeout(8000) });
 if (!response.ok) throw new Error("Unable to load homepage preferences");
 return response.json();
}
