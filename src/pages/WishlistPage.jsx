import { Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { formatPrice } from '../config'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useToast } from '../context/ToastContext'
import { useUI } from '../context/UIContext'
import SmartImage from '../components/SmartImage'
import './WishlistPage.css'

export default function WishlistPage() {
  const { items, remove, clear } = useWishlist()
  const { addItem } = useCart()
  const { showToast } = useToast()
  const { navigate } = useUI()

  const addToBag = (product) => {
    addItem(product, { quantity: 1, color: product.colors[0].name })
    showToast(`${product.name} added to your bag.`)
  }

  const addAll = () => {
    items.forEach((product) => addItem(product, { quantity: 1, color: product.colors[0].name }))
    showToast(`${items.length} saved items added to your bag.`)
  }

  return (
    <main id="main" className="page container wishlist">
      <header className="page-header">
        <span className="eyebrow">Saved for later</span>
        <h1 className="section-title">Your wishlist</h1>
        <p>Saved on this device only (browser storage) - there is no account sync in the demo.</p>
      </header>

      {items.length === 0 ? (
        <div className="empty-state">
          <Heart size={44} aria-hidden="true" />
          <h2>Your wishlist is empty</h2>
          <p>Tap the heart on any product to save it here for later.</p>
          <button type="button" className="btn btn-glass" onClick={() => navigate('shop')}>Continue shopping</button>
        </div>
      ) : (
        <>
          <div className="wishlist__actions">
            <p>{items.length} saved {items.length === 1 ? 'item' : 'items'}</p>
            <div>
              <button type="button" className="btn btn-glass btn-sm" onClick={addAll}>
                <ShoppingBag size={16} aria-hidden="true" /> Add all to bag
              </button>
              <button type="button" className="btn btn-outline btn-sm" onClick={clear}>Clear wishlist</button>
            </div>
          </div>

          <ul className="wishlist__list">
            {items.map((product) => (
              <li key={product.id} className="wishlist__item">
                <button type="button" className="wishlist__image" onClick={() => navigate('product', { id: product.id })} aria-label={`View ${product.name}`}>
                  <SmartImage src={product.image} alt={product.name} />
                </button>
                <div className="wishlist__info">
                  <p className="wishlist__cat">{product.category}</p>
                  <h2>
                    <button type="button" onClick={() => navigate('product', { id: product.id })}>{product.name}</button>
                  </h2>
                  <p className="wishlist__price">{formatPrice(product.price)}</p>
                  <div className="wishlist__buttons">
                    <button type="button" className="btn btn-glass btn-sm" onClick={() => addToBag(product)}>
                      <ShoppingBag size={15} aria-hidden="true" /> Add to bag
                    </button>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => remove(product.id)} aria-label={`Remove ${product.name} from wishlist`}>
                      <Trash2 size={15} aria-hidden="true" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  )
}
