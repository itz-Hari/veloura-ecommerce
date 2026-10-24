import { ArrowUpRight } from 'lucide-react'
import products, { CATEGORIES, CATEGORY_DETAILS } from '../data/products'
import { useUI } from '../context/UIContext'
import Reveal from './Reveal'
import SmartImage from './SmartImage'
import './CategorySection.css'

export default function CategorySection() {
  const { navigate } = useUI()

  return (
    <Reveal as="section" className="section container" aria-labelledby="category-title">
      <div className="category__head">
        <div>
          <span className="eyebrow">Shop by category</span>
          <h2 id="category-title" className="section-title">Find your corner of Veloura</h2>
        </div>
        <button type="button" className="link-arrow" onClick={() => navigate('shop')}>
          View all products
        </button>
      </div>

      <div className="category__grid">
        {CATEGORIES.map((category) => {
          const count = products.filter((product) => product.category === category).length
          return (
            <button
              key={category}
              type="button"
              className="category-card"
              onClick={() => navigate('shop', { category })}
            >
              <SmartImage src={CATEGORY_DETAILS[category].image} alt="" />
              <span className="category-card__overlay" />
              <span className="category-card__text">
                <small>{count} products</small>
                <strong>{category}</strong>
                <em>{CATEGORY_DETAILS[category].blurb}</em>
              </span>
              <span className="category-card__arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </button>
          )
        })}
      </div>
    </Reveal>
  )
}
