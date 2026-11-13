import { DeliveryPicker } from "./delivery-picker";
import { CategoryNav } from "./category-nav";
import { ThemeToggle } from "../shared/theme";
import { BrandMark, Icon } from "./icons";
import { SearchBox } from "./search-box";
import { ShopLinks } from "./commerce";
import { SavedLink } from "./saved";
export function Header({ search = "" }: { search?: string }) {
  return <><a className="skip-link" href="#main-content">Skip to content</a><div className="utility-bar"><div className="container"><span>Good food. Informed choices.</span><a href="/about">Our story <Icon name="arrow" size={13}/></a></div></div><header className="site-header"><div className="container header-main"><div className="brand-location"><a href="/" className="brand" aria-label="Dharmik Foods home"><BrandMark/><span>DHARMIK<small>FOODS</small></span></a><DeliveryPicker/></div><SearchBox initial={search}/><div className="header-actions"><SavedLink/><ShopLinks/><ThemeToggle/></div></div><CategoryNav/></header></>;
}
export function Footer() {
 return <footer className="site-footer"><div className="container footer-topline"><span>Traditional foods for your everyday kitchen</span><a href="/about">About Dharmik Foods ↗</a></div><div className="container footer-grid"><div className="footer-intro"><a href="/" className="brand footer-brand"><BrandMark/><span>DHARMIK<small>FOODS</small></span></a><p>Traditional grains, pantry staples and clay cookware for the meals you make every day.</p></div><nav aria-label="Footer shopping"><h3>Your pantry</h3><a href="/#catalog">Shop all products</a><a href="/sugar-smart">Diabetes-Friendly Picks</a><a href="/?category=Pottery#catalog">Clay cookware & pottery</a><a href="/saved">Saved foods</a></nav><nav aria-label="Footer account"><h3>Your account</h3><a href="/account">Sign in & account</a><a href="/cart">Your cart</a><a href="/account">Order summaries</a><a href="/privacy">Your information</a></nav><nav aria-label="Footer company"><h3>Dharmik Foods</h3><a href="/about">About Us</a><a href="/#newsletter">Notes from the pantry</a><a href="/image-credits">Image credits</a><p>Read our story and find out how we make traditional ingredients part of today’s kitchen.</p></nav></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Dharmik Foods.</span><span>Dietary collections are browsing guides. Sample supplier details require verification before sale.</span></div></footer>;
}
