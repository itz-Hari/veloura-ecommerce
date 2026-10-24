import { useState } from 'react'
import { Lock, Truck } from 'lucide-react'
import { FREE_SHIPPING_THRESHOLD, formatPrice } from '../config'
import { useCart } from '../context/CartContext'
import { useUI } from '../context/UIContext'
import './CartSummary.css'

// Totals + demo checkout. No payment provider is connected, and the UI says so.
export default function CartSummary() {
  const { subtotal, shipping, total, amountToFreeShipping } = useCart()
  const { openAuth } = useUI()
  const [showNotice, setShowNotice] = useState(false)

  return (
    <div className="cart-summary">
      {amountToFreeShipping > 0 ? (
        <p className="cart-summary__shipping">
          <Truck size={16} aria-hidden="true" /> Add {formatPrice(amountToFreeShipping)} more for free shipping
        </p>
      ) : (
        <p className="cart-summary__shipping is-free">
          <Truck size={16} aria-hidden="true" /> You qualify for free shipping (over {formatPrice(FREE_SHIPPING_THRESHOLD)})
        </p>
      )}

      <dl>
        <div><dt>Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
        <div><dt>Shipping</dt><dd>{shipping === 0 ? 'Free' : formatPrice(shipping)}</dd></div>
        <div><dt>Taxes</dt><dd>Calculated at checkout</dd></div>
        <div className="cart-summary__total"><dt>Estimated total</dt><dd>{formatPrice(total)}</dd></div>
      </dl>

      <button type="button" className="btn btn-glass btn-block" onClick={() => setShowNotice(true)} aria-expanded={showNotice}>
        <Lock size={17} aria-hidden="true" /> Demo checkout
      </button>

      {showNotice && (
        <div className="form-note is-info cart-summary__notice" role="status">
          <p>
            <strong>Checkout is not available in this demo.</strong> No payment provider or backend is
            connected, so no order can be placed and nothing is charged. A real store would ask you to
            sign in or continue as a guest here.
          </p>
          <button type="button" className="btn btn-outline btn-sm" onClick={() => openAuth('login', 'A real checkout would ask you to sign in here. This demo has no account service connected.')}>
            Preview sign-in
          </button>
        </div>
      )}
    </div>
  )
}
