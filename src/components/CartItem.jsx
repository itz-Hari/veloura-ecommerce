import { Minus, Plus, Trash2 } from 'lucide-react'
import { MAX_QUANTITY, formatPrice } from '../config'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import SmartImage from './SmartImage'
import './CartItem.css'

// One row in the bag. Used by both the slide-in drawer and the full cart page.
export default function CartItem({ line }) {
  const { setQuantity, removeItem } = useCart()
  const { navigate } = useUI()
  const { product, quantity, color, key } = line
  const maxQuantity = Math.min(MAX_QUANTITY, product.stock)

  return (
    <li className="cart-item">
      <button type="button" className="cart-item__image" onClick={() => navigate('product', { id: product.id })} aria-label={`View ${product.name}`}>
        <SmartImage src={product.image} alt={product.name} />
      </button>

      <div className="cart-item__info">
        <h3>{product.name}</h3>
        <p className="cart-item__meta">{product.category} &middot; {color}</p>
        <p className="cart-item__unit">{formatPrice(product.price)} each</p>

        <div className="cart-item__controls">
          <div className="qty" role="group" aria-label={`Quantity for ${product.name}`}>
            <button type="button" onClick={() => setQuantity(key, quantity - 1)} disabled={quantity <= 1} aria-label="Decrease quantity">
              <Minus size={15} aria-hidden="true" />
            </button>
            <output aria-live="polite">{quantity}</output>
            <button type="button" onClick={() => setQuantity(key, quantity + 1)} disabled={quantity >= maxQuantity} aria-label="Increase quantity">
              <Plus size={15} aria-hidden="true" />
            </button>
          </div>
          <button type="button" className="cart-item__remove" onClick={() => removeItem(key)} aria-label={`Remove ${product.name} from bag`}>
            <Trash2 size={16} aria-hidden="true" /> Remove
          </button>
        </div>
      </div>

      <strong className="cart-item__total">{formatPrice(line.lineTotal)}</strong>
    </li>
  )
}
