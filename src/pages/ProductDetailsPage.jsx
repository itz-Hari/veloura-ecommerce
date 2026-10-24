import { useState } from 'react'
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Star, Truck } from 'lucide-react'
import products from '../data/products'
import { FREE_SHIPPING_THRESHOLD, MAX_QUANTITY, formatPrice } from '../config'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { useUI } from '../context/UIContext'
import ProductCard from '../components/ProductCard'
import SmartImage from '../components/SmartImage'
import './ProductDetailsPage.css'

export default function ProductDetailsPage() {
  const { route, navigate, openCart } = useUI()
  const product = products.find((item) => item.id === route.params.id)

  if (!product) {
    return (
      <main id="main" className="page container section">
        <div className="empty-state">
          <h1>Product not found</h1>
          <p>We couldn&apos;t find that product. It may have been removed from the demo catalogue.</p>
          <button type="button" className="btn btn-glass" onClick={() => navigate('shop')}>Back to shop</button>
        </div>
      </main>
    )
  }

  // Keyed by product id so colour/quantity reset when moving to a related product.
  return <ProductDetails key={product.id} product={product} navigate={navigate} openCart={openCart} />
}

function ProductDetails({ product, navigate, openCart }) {
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const { showToast } = useToast()
  const [color, setColor] = useState(product.colors[0].name)
  const [quantity, setQuantity] = useState(1)

  const saved = has(product.id)
  const maxQuantity = Math.min(MAX_QUANTITY, product.stock)
  const onSale = product.originalPrice && product.originalPrice > product.price
  const stockLabel = product.stock <= 5 ? `Low stock - only ${product.stock} left (demo)` : 'In stock (demo)'
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)

  const handleAdd = () => {
    addItem(product, { quantity, color })
    showToast(`${quantity} x ${product.name} (${color}) added to your bag.`)
  }

  return (
    <main id="main" className="page product">
      <div className="container">
        <nav className="product__crumbs" aria-label="Breadcrumb">
          <button type="button" onClick={() => navigate('home')}>Home</button>
          <span aria-hidden="true">/</span>
          <button type="button" onClick={() => navigate('shop')}>Shop</button>
          <span aria-hidden="true">/</span>
          <button type="button" onClick={() => navigate('shop', { category: product.category })}>{product.category}</button>
        </nav>

        <div className="product__layout">
          <div className="product__image">
            <SmartImage src={product.image} alt={product.name} eager />
            {product.tag && <span className="product__tag">{product.tag}</span>}
          </div>

          <div className="product__info">
            <button type="button" className="link-arrow product__back" onClick={() => navigate('shop')}>
              <ArrowLeft size={16} aria-hidden="true" /> Back to shop
            </button>

            <p className="eyebrow">{product.category}</p>
            <h1>{product.name}</h1>

            <p className="product__rating" title="Sample rating - demo data">
              <Star size={16} fill="currentColor" aria-hidden="true" />
              {product.rating.toFixed(1)} &middot; {product.reviews} sample reviews
              <small>(demo data)</small>
            </p>

            <p className="product__price">
              <strong>{formatPrice(product.price)}</strong>
              {onSale && <s>{formatPrice(product.originalPrice)}</s>}
            </p>

            <p className="product__desc">{product.description}</p>

            <fieldset className="product__colors">
              <legend>Colour: <strong>{color}</strong></legend>
              <div>
                {product.colors.map((option) => (
                  <label key={option.name} className={`swatch ${color === option.name ? 'is-selected' : ''}`}>
                    <input type="radio" name="color" value={option.name} checked={color === option.name} onChange={() => setColor(option.name)} />
                    {/* The colour value is passed to CSS through a custom property */}
                    <span className="swatch__dot" aria-hidden="true" style={{ '--swatch': option.hex }} />
                    <span className="visually-hidden">{option.name}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="product__buy">
              <div className="qty" role="group" aria-label="Quantity">
                <button type="button" onClick={() => setQuantity((q) => Math.max(1, q - 1))} disabled={quantity <= 1} aria-label="Decrease quantity">
                  <Minus size={16} aria-hidden="true" />
                </button>
                <output aria-live="polite">{quantity}</output>
                <button type="button" onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))} disabled={quantity >= maxQuantity} aria-label="Increase quantity">
                  <Plus size={16} aria-hidden="true" />
                </button>
              </div>
              <button type="button" className="btn btn-glass product__add" onClick={handleAdd}>
                <ShoppingBag size={18} aria-hidden="true" /> Add to bag
              </button>
              <button
                type="button"
                className={`product__wish ${saved ? 'is-saved' : ''}`}
                onClick={() => {
                  toggle(product.id)
                  showToast(saved ? 'Removed from your wishlist.' : 'Saved to your wishlist.', 'info')
                }}
                aria-pressed={saved}
                aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart size={20} aria-hidden="true" fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className={`product__stock ${product.stock <= 5 ? 'is-low' : ''}`}>{stockLabel}</p>

            <ul className="product__notes">
              <li><Truck size={18} aria-hidden="true" /> Free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}; otherwise a flat fee applies.</li>
              <li><ShoppingBag size={18} aria-hidden="true" /> Demo store: checkout and payments are not connected.</li>
            </ul>

            <button type="button" className="link-arrow" onClick={openCart}>Open my bag</button>
          </div>
        </div>

        {related.length > 0 && (
          <section className="product__related" aria-labelledby="related-title">
            <h2 id="related-title" className="section-title">You may also like</h2>
            <div className="product-grid">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
