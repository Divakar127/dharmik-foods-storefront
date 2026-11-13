import type { CSSProperties } from "react";
type Name = "search" | "heart" | "arrow" | "check" | "grain" | "seed" | "bottle" | "jar" | "shield" | "leaf" | "close" | "filter" | "cart" | "user" | "location" | "grid" | "pot" | "plus";
const paths: Record<Name, React.ReactNode> = {
  location: <><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/></>,
  pot: <><path d="M5 9h14l-1 9a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3L5 9ZM3 9h18M8 5h8M12 3v2M2 12h3m14 0h3"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  cart: <><path d="M2 3h3l3 12h11l3-9H6M9 15l-1 3h12"/><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/></>,
  user: <><circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4.5 4.5"/></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  grain: <><path d="M6 21 18 3M10 15C2 13 4 8 4 8s7 0 6 7Zm4-6C7 7 9 3 9 3s6 0 5 6Zm-4 6c1-6 7-5 7-5s1 6-7 5Z"/></>,
  seed: <><path d="M13 3C4 3 1 11 7 16c4 3 11-2 11-8 0-3-2-5-5-5Z"/><path d="m6 19 10-12M14 20c5 2 9-4 7-9"/></>,
  bottle: <><path d="M9 3h6v4l3 4v9H6v-9l3-4V3Zm0 0V1h6v2M6 13h12"/></>,
  jar: <><path d="M6 7h12v13H6zM5 3h14v4H5zM9 12h6v4H9z"/></>,
  shield: <><path d="m12 2 8 4v6c0 5-8 10-8 10s-8-5-8-10V6l8-4Z"/><path d="m8 12 3 3 5-6"/></>,
  leaf: <><path d="M20 3C8 2 2 8 5 15c3 7 15 2 15-12ZM4 21 15 9"/></>,
  close: <path d="m6 6 12 12M6 18 18 6"/>,
  filter: <><path d="M4 6h16M7 12h10M10 18h4"/><circle cx="9" cy="6" r="2"/><circle cx="15" cy="12" r="2"/></>,
};
export function Icon({ name, size = 20, style }: { name: Name; size?: number; style?: CSSProperties }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name]}</svg>;
}
export function BrandMark() { return <svg className="brand-mark" width="40" height="44" viewBox="0 0 40 44" fill="none" aria-hidden="true"><path d="M22 1C26 13 36 17 36 28a16 16 0 0 1-32 0C4 18 10 14 14 9c-1 8 2 10 4 10 5-2 6-10 4-18Z" fill="currentColor"/><path d="M20 25c-5 4-7 7-5 11 2 4 9 3 10-1 1-4-3-6-5-10Z" fill="white"/></svg>; }
