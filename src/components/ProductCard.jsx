import { Heart, Plus, Star } from 'lucide-react'
import { formatPrice } from '../config'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { useUI } from '../context/UIContext'
import SmartImage from './SmartImage'
import './ProductCard.css'

// Reusable product card. The image/name open the product page, while the
// wishlist and quick-add buttons are separate siblings so clicks never clash.
export default function ProductCard({ product }) {
  const { navigate } = useUI()
  const { addItem } = useCart()
  const { has, toggle } = useWishlist()
  const { showToast } = useToast()
  const saved = has(product.id)
  const onSale = product.originalPrice && product.originalPrice > product.price
  const discount = onSale ? Math.round((1 - product.price / product.originalPrice) * 100) : 0

  const open = () => navigate('product', { id: product.id })

  const handleQuickAdd = () => {
    addItem(product, { quantity: 1, color: product.colors[0].name })
    showToast(`${product.name} added to your bag.`)
  }

  const handleWishlist = () => {
    toggle(product.id)
    showToast(saved ? 'Removed from your wishlist.' : 'Saved to your wishlist.', 'info')
  }

  return (
    <article className="product-card">
      <div className="product-card__media">
        <button type="button" className="product-card__image-btn" onClick={open} aria-label={`View ${product.name}`}>
          <SmartImage src={product.image} alt={product.name} />
        </button>

        {product.tag && <span className="product-card__tag">{product.tag}</span>}

        <button
          type="button"
          className={`product-card__wish ${saved ? 'is-saved' : ''}`}
          onClick={handleWishlist}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`}
        >
          <Heart size={18} aria-hidden="true" fill={saved ? 'currentColor' : 'none'} />
        </button>

        <button type="button" className="product-card__quick" onClick={handleQuickAdd} aria-label={`Quick add ${product.name} to bag`}>
          <Plus size={16} aria-hidden="true" /> Quick add
        </button>
      </div>

      <div className="product-card__body">
        <p className="product-card__category">{product.category}</p>
        <h3 className="product-card__name">
          <button type="button" onClick={open}>
            {product.name}
          </button>
        </h3>
        <p className="product-card__rating" title="Sample rating - demo data">
          <Star size={14} fill="currentColor" aria-hidden="true" />
          <span>
            {product.rating.toFixed(1)} <small>(sample)</small>
          </span>
        </p>
        <p className="product-card__price">
          <strong>{formatPrice(product.price)}</strong>
          {onSale && (
            <>
              <s>{formatPrice(product.originalPrice)}</s>
              <span className="product-card__off">{discount}% off</span>
            </>
          )}
        </p>
      </div>
    </article>
  )
}
