import { ArrowRight } from 'lucide-react'
import { IMAGES } from '../data/products'
import { formatPrice } from '../config'
import { useUI } from '../context/UIContext'
import Reveal from './Reveal'
import SmartImage from './SmartImage'
import './Editorial.css'

// Discovery tiles map to real shop filters (see ShopPage).
const DISCOVER = [
  { title: `Gifts under ${formatPrice(2500)}`, note: 'Thoughtful, easy to wrap', params: { maxPrice: 2500 }, tone: 'sage' },
  { title: 'The Sale Edit', note: 'Reduced favourites', params: { onSale: true }, tone: 'clay' },
  { title: 'Just Landed', note: 'Newest arrivals first', params: { sort: 'newest' }, tone: 'blue' },
]

export default function Editorial() {
  const { navigate } = useUI()

  return (
    <>
      <Reveal as="section" className="editorial container section" aria-labelledby="editorial-title">
        <div className="editorial__image">
          <SmartImage src={IMAGES.editorial} alt="Sunlit Veloura boutique with clothing rails" />
          <span className="editorial__frame" aria-hidden="true" />
        </div>
        <div className="editorial__copy">
          <span className="eyebrow">The Autumn Edit</span>
          <h2 id="editorial-title" className="section-title">Layer up, slow down.</h2>
          <p>
            Our autumn edit pairs textured knits and structured coats with warm ceramics and soft
            throws - an easy palette of ivory, sage and clay that works from wardrobe to living room.
          </p>
          <button type="button" className="btn btn-glass" onClick={() => navigate('shop', { sort: 'newest' })}>
            Explore the edit <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </Reveal>

      <Reveal as="section" className="container discover" aria-label="Discover more">
        {DISCOVER.map((item) => (
          <button
            key={item.title}
            type="button"
            className={`discover__tile discover__tile--${item.tone}`}
            onClick={() => navigate('shop', item.params)}
          >
            <span>
              <strong>{item.title}</strong>
              <small>{item.note}</small>
            </span>
            <ArrowRight size={22} aria-hidden="true" />
          </button>
        ))}
      </Reveal>
    </>
  )
}
