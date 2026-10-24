import { useEffect, useRef } from 'react'
import { ShoppingBag, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import CartItem from './CartItem'
import CartSummary from './CartSummary'
import './CartDrawer.css'

// Slide-in bag. Always mounted so the closing animation can play; it is
// hidden from assistive tech and the tab order while closed.
export default function CartDrawer() {
  const { cartOpen, closeCart, navigate } = useUI()
  const { lines, itemCount } = useCart()
  const closeRef = useRef(null)

  useEffect(() => {
    if (!cartOpen) return undefined
    const previouslyFocused = document.activeElement
    closeRef.current?.focus()

    const handleKey = (event) => {
      if (event.key === 'Escape') closeCart()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.() // return focus to whatever opened the drawer
    }
  }, [cartOpen, closeCart])

  return (
    <div className={`drawer ${cartOpen ? 'is-open' : ''}`} aria-hidden={!cartOpen}>
      <div className="drawer__backdrop" onClick={closeCart} />
      <aside className="drawer__panel" role="dialog" aria-modal="true" aria-label="Shopping bag" inert={!cartOpen ? '' : undefined}>
        <header className="drawer__header">
          <h2>Your bag <small>({itemCount})</small></h2>
          <button type="button" ref={closeRef} className="icon-btn" onClick={closeCart} aria-label="Close shopping bag">
            <X size={22} aria-hidden="true" />
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="drawer__empty">
            <ShoppingBag size={42} aria-hidden="true" />
            <h3>Your bag is empty</h3>
            <p>Add something lovely and it will wait for you here.</p>
            <button type="button" className="btn btn-glass" onClick={() => navigate('shop')}>
              Start shopping
            </button>
          </div>
        ) : (
          <>
            <ul className="drawer__items">
              {lines.map((line) => (
                <CartItem key={line.key} line={line} />
              ))}
            </ul>
            <footer className="drawer__footer">
              <CartSummary />
              <button type="button" className="link-arrow" onClick={() => navigate('cart')}>
                View full bag
              </button>
            </footer>
          </>
        )}
      </aside>
    </div>
  )
}
