import Reveal from './Reveal'
import ProductCard from './ProductCard'
import { useUI } from '../context/UIContext'
import './FeaturedProducts.css'

// Reusable section: a heading plus a grid of ProductCards.
export default function FeaturedProducts({ eyebrow, title, intro, products, ctaLabel = 'View all', ctaParams = {}, tinted = false }) {
  const { navigate } = useUI()

  return (
    <section className={`featured ${tinted ? 'featured--tinted' : ''}`} aria-label={title}>
      <Reveal className="container section">
        <div className="featured__head">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-title">{title}</h2>
            {intro && <p>{intro}</p>}
          </div>
          <button type="button" className="link-arrow" onClick={() => navigate('shop', ctaParams)}>
            {ctaLabel}
          </button>
        </div>
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Reveal>
    </section>
  )
}
