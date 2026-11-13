import { imageFor, money, type Product } from "../shared/catalog";
import { AddToCart } from "./commerce";
import { SaveButton } from "./saved";
export function ProductCard({ product }: { product: Product }) {
  return <article className={`product-card reference-product-card${product.available ? "" : " unavailable"}`}>
    <SaveButton id={product.id} name={product.name}/>
    <a className="product-link" href={`/products/${product.id}`} target="_blank" rel="noopener noreferrer" aria-label={`${product.name}, opens in a new tab`}>
      <div className="product-image"><img src={imageFor(product)} alt={product.name} loading="lazy" width={600} height={600}/>{!product.available && <span className="unavailable-label">Currently unavailable</span>}</div>
      <div className="product-info"><span className="product-category-label">{product.category}</span><h3>{product.name}<span className="product-pack">{product.pack_size}</span></h3><p className="product-excerpt">{product.description}</p><p className="product-sku">SKU: {product.sku}</p></div>
    </a><div className="card-purchase-row"><div className="card-price"><strong>{money(product.price)}</strong><span className={`product-stock${product.available ? "" : " stock-out"}`}><span/>{product.available ? (product.stock < 10 ? `Only ${product.stock} left` : "In stock") : "Unavailable"}</span></div><AddToCart id={product.id} available={product.available} compact name={product.name}/></div>
  </article>;
}
