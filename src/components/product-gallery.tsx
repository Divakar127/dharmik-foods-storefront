"use client";
import { useState } from "react";
export function ProductGallery({ name, cover, images = [], credit, source }: { name: string; cover: string; images?: string[]; credit?: string; source?: string }) {
  const all = [...new Set([cover, ...images].filter(Boolean))];
  const [selected, setSelected] = useState(0);
  return <div className="product-gallery"><figure className="detail-image"><img src={all[selected]} alt={`${name}${selected ? `, view ${selected + 1}` : ""}`}/>{all[selected]?.startsWith("/campaigns/") ? <figcaption>AI-generated illustrative campaign image. Not a verified supplier photograph.</figcaption> : selected === 0 && credit ? <figcaption>{credit} {source && <a href={source} target="_blank" rel="noopener noreferrer">Source & license ↗</a>}</figcaption> : null}</figure>{all.length > 1 && <div className="gallery-thumbnails" aria-label="Product images">{all.map((src,i) => <button key={src} aria-label={`View image ${i+1} of ${name}`} aria-pressed={selected === i} onClick={() => setSelected(i)}><img src={src} alt="" loading="lazy"/></button>)}</div>}</div>;
}
