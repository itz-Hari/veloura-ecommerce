import { useUI } from '../context/UIContext'
import { useToast } from '../context/ToastContext'
import { CATEGORIES } from '../data/products'
import Logo from './Logo'
import './Footer.css'

const SUPPORT_LINKS = ['Shipping', 'Returns', 'Size guide', 'Order help']
const SOCIALS = ['Instagram', 'Pinterest', 'YouTube']

export default function Footer() {
  const { navigate } = useUI()
  const { showToast } = useToast()

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>Modern lifestyle, fashion, accessories and home essentials - designed to be lived in.</p>
          <ul className="footer__socials" aria-label="Social links">
            {SOCIALS.map((name) => (
              <li key={name}>
                <button type="button" onClick={() => showToast(`Demo store: the ${name} profile is not connected.`, 'info')}>
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Shop links">
          <h2>Shop</h2>
          <ul>
            {CATEGORIES.map((category) => (
              <li key={category}>
                <button type="button" onClick={() => navigate('shop', { category })}>
                  {category}
                </button>
              </li>
            ))}
            <li>
              <button type="button" onClick={() => navigate('shop', { sort: 'newest' })}>New arrivals</button>
            </li>
          </ul>
        </nav>

        <nav aria-label="Company links">
          <h2>Veloura</h2>
          <ul>
            <li><button type="button" onClick={() => navigate('story')}>Our Story</button></li>
            <li><button type="button" onClick={() => navigate('journal')}>Journal</button></li>
            <li><button type="button" onClick={() => navigate('wishlist')}>Wishlist</button></li>
            <li><button type="button" onClick={() => navigate('cart')}>Shopping bag</button></li>
          </ul>
        </nav>

        <nav aria-label="Customer support">
          <h2>Support</h2>
          <ul>
            {SUPPORT_LINKS.map((subject) => (
              <li key={subject}>
                <button type="button" onClick={() => navigate('contact', { subject })}>
                  {subject}
                </button>
              </li>
            ))}
            <li><button type="button" onClick={() => navigate('contact')}>Contact us</button></li>
          </ul>
        </nav>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {new Date().getFullYear()} VELOURA. A demo storefront - no real orders or payments.</p>
        <p>Product photos via Unsplash. Reviews and ratings are sample content.</p>
      </div>
    </footer>
  )
}
