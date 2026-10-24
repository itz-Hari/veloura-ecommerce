import { Leaf, Hand, Recycle } from 'lucide-react'
import { IMAGES } from '../data/products'
import { useUI } from '../context/UIContext'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import './StoryPage.css'

const VALUES = [
  { icon: Leaf, title: 'Natural first', text: 'Linen, cotton, wool and leather - materials that age beautifully.' },
  { icon: Hand, title: 'Made with care', text: 'Small-batch pieces finished by skilled makers, never rushed.' },
  { icon: Recycle, title: 'Made to last', text: 'Timeless shapes you will reach for for years, not just a season.' },
]

export default function StoryPage() {
  const { navigate } = useUI()

  return (
    <main id="main" className="page story">
      <section className="container story__intro">
        <div>
          <span className="eyebrow">Our story</span>
          <h1>Luxury, but make it livable.</h1>
          <p>
            Veloura began with a simple idea: the things we wear and live with every day should feel
            as good as they look. We bring together fashion, accessories and home essentials in one
            calm, considered edit.
          </p>
          <p className="story__note">
            Veloura is a fictional brand created for this demo storefront; the story and values here
            are illustrative.
          </p>
          <button type="button" className="btn btn-glass" onClick={() => navigate('shop')}>Browse the collection</button>
        </div>
        <div className="story__image">
          <SmartImage src={IMAGES.story} alt="Neatly arranged neutral clothing in a bright studio" eager />
        </div>
      </section>

      <Reveal as="section" className="container section" aria-label="Our values">
        <h2 className="section-title story__values-title">What we believe</h2>
        <div className="story__values">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <article key={title} className="story__value">
              <Icon size={28} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </Reveal>
    </main>
  )
}
