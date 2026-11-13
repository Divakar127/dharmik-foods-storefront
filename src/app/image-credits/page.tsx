import photos from "../../shared/photo-manifest.json";
import { Header, Footer } from "../../components/shell";

export const metadata = { title: "Photography credits | Dharmik Foods" };

export default function Credits() {
  return <><Header/><main id="main-content" className="container credits-page">
    <nav className="breadcrumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Photography credits</span></nav>
    <h1>Food photography & campaign imagery.</h1><p className="muted">The sample food catalog uses representative ingredient photographs. These are not photographs of verified supplier packs. Images have been resized and converted to WebP; catalog card photographs fill their frames; full product galleries remain available.</p>
    <section className="campaign-credits"><h2>Five original campaign images</h2><p>The millet, nuts, infusion, pottery and traditional-kitchen campaign images were created with AI for Dharmik Foods. They are illustrative scenes, not photographs of our suppliers, team, facilities or certified products. The sample pottery listing uses the illustrative pottery campaign.</p><div>{["millets","nuts","tea","pottery","tradition"].map(name=><figure key={name}><img src={`/campaigns/${name}.webp`} alt={`Illustrative ${name} campaign`}/><figcaption>{name} · AI-generated campaign image</figcaption></figure>)}</div></section>
    <section className="campaign-credits"><h2>Six panoramic homepage campaigns</h2><p>These AI-generated illustrations were composed for the compact homepage banner. They do not depict verified supplier products or facilities.</p><div>{["everyday","millets","nuts","tea","pottery","tradition"].map(name=><figure key={name}><img src={`/campaigns/promo-v2/${name}.webp`} alt={`Wide illustrative ${name} campaign`}/><figcaption>{name} · AI-generated campaign image</figcaption></figure>)}</div></section>
    <div className="credits-grid">{photos.map(photo => <article key={photo.slug}><img src={photo.local_path} alt={photo.title}/><h2>{photo.title}</h2><p>{photo.artist || "See source for attribution"}</p><p>{photo.license}</p><a href={photo.source} target="_blank" rel="noopener noreferrer">Source & licensing details ↗</a>{photo.license_url && <a href={photo.license_url} target="_blank" rel="noopener noreferrer">License terms ↗</a>}</article>)}</div>
  </main><Footer/></>;
}
