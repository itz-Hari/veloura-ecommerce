import { useEffect, useState } from 'react'
import { Heart, Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { CATEGORIES } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import { useUI } from '../context/UIContext'
import AnnouncementBar from './AnnouncementBar'
import Logo from './Logo'
import SearchBar from './SearchBar'
import './Header.css'

const NAV_LINKS = [
  { label: 'Home', page: 'home' },
  { label: 'Shop', page: 'shop' },
  { label: 'Our Story', page: 'story' },
  { label: 'Journal', page: 'journal' },
  { label: 'Contact', page: 'contact' },
]

export default function Header() {
  const { route, navigate, openCart, openAuth } = useUI()
  const { itemCount } = useCart()
  const { count: wishlistCount } = useWishlist()
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)

  // Mobile menu: close with Escape and stop the page behind from scrolling.
  useEffect(() => {
    if (!menuOpen) return undefined
    const handleKey = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  // Any page change (including via the logo) closes the mobile overlays.
  useEffect(() => {
    setMenuOpen(false)
    setMobileSearch(false)
  }, [route])

  const go = (page, params) => {
    setMenuOpen(false)
    setMobileSearch(false)
    navigate(page, params)
  }

  return (
    <>
      <AnnouncementBar />
      <header className="header">
        <div className="container header__inner">
          <button
            type="button"
            className="icon-btn header__menu-btn"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Menu size={22} aria-hidden="true" />
          </button>

          <Logo />

          <nav className="header__nav" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <div key={link.page} className={link.page === 'shop' ? 'nav-item nav-item--has-menu' : 'nav-item'}>
                <button
                  type="button"
                  className={`nav-link ${route.page === link.page ? 'is-active' : ''}`}
                  aria-current={route.page === link.page ? 'page' : undefined}
                  onClick={() => go(link.page)}
                >
                  {link.label}
                </button>
                {link.page === 'shop' && (
                  <div className="nav-dropdown">
                    {CATEGORIES.map((category) => (
                      <button key={category} type="button" onClick={() => go('shop', { category })}>
                        {category}
                      </button>
                    ))}
                    <button type="button" onClick={() => go('shop', { sort: 'newest' })}>
                      New arrivals
                    </button>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="header__search">
            <SearchBar />
          </div>

          <div className="header__actions">
            <button
              type="button"
              className="icon-btn header__search-btn"
              onClick={() => setMobileSearch((open) => !open)}
              aria-label="Toggle search"
              aria-expanded={mobileSearch}
            >
              <Search size={21} aria-hidden="true" />
            </button>
            <button type="button" className="icon-btn" onClick={() => openAuth('login')} aria-label="Account - sign in or create account">
              <User size={21} aria-hidden="true" />
            </button>
            <button type="button" className="icon-btn" onClick={() => go('wishlist')} aria-label={`Wishlist, ${wishlistCount} items`}>
              <Heart size={21} aria-hidden="true" />
              {wishlistCount > 0 && <span className="badge">{wishlistCount}</span>}
            </button>
            <button type="button" className="icon-btn" onClick={openCart} aria-label={`Shopping bag, ${itemCount} items`}>
              <ShoppingBag size={21} aria-hidden="true" />
              {itemCount > 0 && <span className="badge badge--clay">{itemCount}</span>}
            </button>
          </div>
        </div>

        {mobileSearch && (
          <div className="header__mobile-search container">
            <SearchBar onNavigate={() => setMobileSearch(false)} />
          </div>
        )}
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="mobile-menu__backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" tabIndex={-1} />
          <div className="mobile-menu__panel">
            <div className="mobile-menu__top">
              <Logo />
              <button type="button" className="icon-btn" onClick={() => setMenuOpen(false)} aria-label="Close menu" autoFocus>
                <X size={22} aria-hidden="true" />
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              {NAV_LINKS.map((link) => (
                <button key={link.page} type="button" className="mobile-menu__link" onClick={() => go(link.page)}>
                  {link.label}
                </button>
              ))}
              <p className="mobile-menu__heading">Shop by category</p>
              {CATEGORIES.map((category) => (
                <button key={category} type="button" className="mobile-menu__sub" onClick={() => go('shop', { category })}>
                  {category}
                </button>
              ))}
              <button type="button" className="mobile-menu__sub" onClick={() => go('wishlist')}>
                Wishlist ({wishlistCount})
              </button>
            </nav>
            <button
              type="button"
              className="btn btn-glass btn-block"
              onClick={() => {
                setMenuOpen(false)
                openAuth('login')
              }}
            >
              <User size={18} aria-hidden="true" /> Sign in / Create account
            </button>
          </div>
        </div>
      )}
    </>
  )
}
