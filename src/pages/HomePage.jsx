import { RefreshCcw, ShieldCheck, Truck } from 'lucide-react'
import products from '../data/products'
import { FREE_SHIPPING_THRESHOLD, formatPrice } from '../config'
import Hero from '../components/Hero'
import CategorySection from '../components/CategorySection'
import FeaturedProducts from '../components/FeaturedProducts'
import Editorial from '../components/Editorial'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import './HomePage.css'

// Trending = products flagged "featured"; new arrivals = newest by date.
const trending = products.filter((product) => product.featured).slice(0, 4)
const newArrivals = [...products].sort((a, b) => b.addedOn.localeCompare(a.addedOn)).slice(0, 4)

export default function HomePage() {
  return (
    <main id="main" className="page home">
      <Hero />

      <ul className="container home__perks" aria-label="Store promises">
        <li><Truck size={22} aria-hidden="true" /> Free shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}</li>
        <li><RefreshCcw size={22} aria-hidden="true" /> Easy 30-day returns (demo policy)</li>
        <li><ShieldCheck size={22} aria-hidden="true" /> Thoughtfully made, honestly priced</li>
      </ul>

      <CategorySection />

      <FeaturedProducts
        eyebrow="Trending now"
        title="Bestsellers & favourites"
        intro="The pieces our demo shoppers reach for first. Ratings are sample data."
        products={trending}
        ctaLabel="Shop all products"
      />

      <FeaturedProducts
        tinted
        eyebrow="New arrivals"
        title="Fresh from the studio"
        intro="Just landed this season - layered, textured and made to mix."
        products={newArrivals}
        ctaLabel="See what's new"
        ctaParams={{ sort: 'newest' }}
      />

      <Editorial />
      <Testimonials />
      <Newsletter />
    </main>
  )
}
