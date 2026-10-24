import { FREE_SHIPPING_THRESHOLD, formatPrice } from '../config'
import { useUI } from '../context/UIContext'
import './AnnouncementBar.css'

export default function AnnouncementBar() {
  const { navigate } = useUI()

  return (
    <div className="announcement">
      <p>
        Free shipping on orders over {formatPrice(FREE_SHIPPING_THRESHOLD)} &middot; The Autumn
        Collection has landed
        <button type="button" onClick={() => navigate('shop', { sort: 'newest' })}>
          Shop new
        </button>
      </p>
    </div>
  )
}
