import { useEffect, useRef } from 'react'
import { ArrowRight, Sparkles } from 'lucide-react'
import products, { CATEGORIES, IMAGES } from '../data/products'
import { FREE_SHIPPING_THRESHOLD, formatPrice } from '../config'
import { useUI } from '../context/UIContext'
import SmartImage from './SmartImage'
import './Hero.css'

export default function Hero() {
  const { navigate } = useUI()
  const heroRef = useRef(null)

  // Parallax-like depth: the scroll position is written to a CSS variable
  // (--scroll) and each image layer moves by a different amount in Hero.css.
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    let frame = 0
    const update = () => {
      frame = 0
      heroRef.current?.style.setProperty('--scroll', String(Math.min(window.scrollY, 700)))
    }
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section className="hero" ref={heroRef} aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <span className="eyebrow">Autumn / Winter Collection</span>
          <h1 id="hero-title">
            Considered pieces for a <em>quieter</em> kind of luxury.
          </h1>
          <p>
            Soft linen, supple leather and handmade home objects - modern essentials chosen to last
            beyond the season.
          </p>
          <div className="hero__actions">
            <button type="button" className="btn btn-glass" onClick={() => navigate('shop')}>
              Shop the collection <ArrowRight size={18} aria-hidden="true" />
            </button>
            <button type="button" className="link-arrow" onClick={() => navigate('story')}>
              Our story <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
          <ul className="hero__stats">
            <li><strong>{products.length}</strong> demo pieces</li>
            <li><strong>{CATEGORIES.length}</strong> categories</li>
            <li><strong>Free</strong> shipping over {formatPrice(FREE_SHIPPING_THRESHOLD)}</li>
          </ul>
        </div>

        {/* Layered imagery: blobs (z1) -> main photo (z2) -> second photo (z3) -> badge (z4) */}
        <div className="hero__visual" aria-hidden="false">
          <span className="hero__blob hero__blob--sage" aria-hidden="true" />
          <span className="hero__blob hero__blob--clay" aria-hidden="true" />
          <div className="hero__photo hero__photo--main">
            <SmartImage src={IMAGES.hero} alt="Model wearing neutral layered Veloura clothing" eager />
          </div>
          <div className="hero__photo hero__photo--second">
            <SmartImage src={IMAGES.heroSecondary} alt="Folded autumn knitwear on a rail" eager />
          </div>
          <div className="hero__badge">
            <Sparkles size={18} aria-hidden="true" />
            <span>
              <strong>New season</strong>
              <small>Just arrived</small>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
