import { Star } from 'lucide-react'
import { IMAGES } from '../data/products'
import Reveal from './Reveal'
import SmartImage from './SmartImage'
import './Testimonials.css'

// SAMPLE content only - these are not real customers or verified reviews.
const SAMPLE_TESTIMONIALS = [
  {
    name: 'Sample Customer A',
    role: 'Illustrative review',
    quote: 'The linen shirt feels as soft as it looks, and it keeps its shape beautifully.',
  },
  {
    name: 'Sample Customer B',
    role: 'Illustrative review',
    quote: 'Packaging was lovely and the tote has quickly become my everyday bag.',
  },
  {
    name: 'Sample Customer C',
    role: 'Illustrative review',
    quote: 'Our living room finally feels finished - the throw and candle are perfect together.',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials" aria-labelledby="testimonials-title">
      <Reveal className="container section">
        <div className="testimonials__head">
          <span className="eyebrow">Kind words</span>
          <h2 id="testimonials-title" className="section-title">What shoppers might say</h2>
          <p className="testimonials__note">Sample content for this demo store - not real or verified customer reviews.</p>
        </div>
        <div className="testimonials__grid">
          {SAMPLE_TESTIMONIALS.map((item, index) => (
            <figure key={item.name} className="testimonial">
              <div className="testimonial__stars" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={16} fill="currentColor" />
                ))}
              </div>
              <blockquote>&ldquo;{item.quote}&rdquo;</blockquote>
              <figcaption>
                <span className="testimonial__avatar">
                  <SmartImage src={IMAGES.avatars[index]} alt="" />
                </span>
                <span>
                  <strong>{item.name}</strong>
                  <small>{item.role}</small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
