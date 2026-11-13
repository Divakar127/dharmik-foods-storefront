import { Header, Footer } from "../../components/shell";
import { SavedProducts } from "../../components/saved-products";
export const metadata = { title: "Saved foods | Dharmik Foods" };
export default function SavedPage() { return <><Header/><main id="main-content" className="container saved-page"><nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Saved foods</span></nav><div className="section-heading"><div><p className="eyebrow">YOUR DHARMIK FOODS LIST</p><h1>Saved for another day.</h1><p>Keep your favourite foods together. Your list is stored in this browser.</p></div><a className="text-link" href="/#catalog">Continue browsing →</a></div><SavedProducts/></main><Footer/></>; }
