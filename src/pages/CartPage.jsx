import { ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import CartItem from '../components/CartItem'
import CartSummary from '../components/CartSummary'
import './CartPage.css'

export default function CartPage() {
  const { lines, itemCount, clearCart } = useCart()
  const { navigate } = useUI()

  return (
    <main id="main" className="page container cart-page">
      <header className="page-header">
        <span className="eyebrow">Shopping bag</span>
        <h1 className="section-title">Your bag</h1>
      </header>

      {lines.length === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={44} aria-hidden="true" />
          <h2>Your bag is empty</h2>
          <p>Browse the collection and add your favourites - they&apos;ll be saved on this device.</p>
          <button type="button" className="btn btn-glass" onClick={() => navigate('shop')}>Continue shopping</button>
        </div>
      ) : (
        <div className="cart-page__layout">
          <section aria-label="Items in your bag">
            <div className="cart-page__head">
              <p>{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
              <button type="button" className="cart-page__clear" onClick={clearCart}>Empty bag</button>
            </div>
            <ul>
              {lines.map((line) => (
                <CartItem key={line.key} line={line} />
              ))}
            </ul>
            <button type="button" className="link-arrow cart-page__continue" onClick={() => navigate('shop')}>
              Continue shopping
            </button>
          </section>

          <aside className="cart-page__summary" aria-label="Order summary">
            <h2>Order summary</h2>
            <CartSummary />
          </aside>
        </div>
      )}
    </main>
  )
}
