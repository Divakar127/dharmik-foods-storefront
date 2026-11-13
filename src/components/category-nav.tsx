"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { categories } from "../shared/catalog";
import { Icon } from "./icons";
export function CategoryNav(){
 const path=usePathname(),[category,setCategory]=useState("");
 useEffect(()=>{setCategory(new URLSearchParams(window.location.search).get("category")||"");},[path]);
 const health=path==='/sugar-smart';
 return <nav className="category-nav refreshed-category-nav" aria-label="Shop navigation"><div className="container"><a href="/#catalog" className={`all-categories${!health&&!category?' current':''}`} aria-current={!health&&!category&&path==='/'?'page':undefined}><Icon name="grid" size={18}/>All products</a>{categories.map((c,i)=><a href={`/?category=${encodeURIComponent(c)}#catalog`} key={c} className={category===c?'current':undefined} aria-current={category===c?'page':undefined}><Icon name={(['grain','seed','jar','bottle','pot'] as const)[i]} size={18}/>{c}</a>)}<a href="/sugar-smart" className={`nav-collections${health?' current':''}`} aria-current={health?'page':undefined}><Icon name="shield" size={18}/>Diabetes-Friendly Picks</a></div></nav>;
}
