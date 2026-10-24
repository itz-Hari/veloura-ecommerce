import { useEffect } from 'react'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { ToastProvider } from './context/ToastContext'
import { UIProvider, useUI } from './context/UIContext'
import Header from './components/Header'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import AuthModal from './components/AuthModal'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import WishlistPage from './pages/WishlistPage'
import CartPage from './pages/CartPage'
import StoryPage from './pages/StoryPage'
import JournalPage from './pages/JournalPage'
import ContactPage from './pages/ContactPage'

const PAGES = {
  home: HomePage,
  shop: ShopPage,
  product: ProductDetailsPage,
  wishlist: WishlistPage,
  cart: CartPage,
  story: StoryPage,
  journal: JournalPage,
  contact: ContactPage,
}

const TITLES = {
  home: 'VELOURA - Modern Lifestyle Essentials',
  shop: 'Shop - VELOURA',
  product: 'Product - VELOURA',
  wishlist: 'Wishlist - VELOURA',
  cart: 'Your Bag - VELOURA',
  story: 'Our Story - VELOURA',
  journal: 'Journal - VELOURA',
  contact: 'Contact - VELOURA',
}

// Chooses which page to show. The auth modal only renders when the user asks for it.
function Shell() {
  const { route, auth } = useUI()
  const Page = PAGES[route.page] || HomePage

  useEffect(() => {
    document.title = TITLES[route.page] || TITLES.home
  }, [route.page])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Header />
      {/* The key re-mounts a page when its params change (e.g. a new search or filter). */}
      <Page key={`${route.page}-${JSON.stringify(route.params)}`} />
      <Footer />
      <CartDrawer />
      {auth.open && <AuthModal />}
    </>
  )
}

export default function App() {
  return (
    <ToastProvider>
      <UIProvider>
        <WishlistProvider>
          <CartProvider>
            <Shell />
          </CartProvider>
        </WishlistProvider>
      </UIProvider>
    </ToastProvider>
  )
}
