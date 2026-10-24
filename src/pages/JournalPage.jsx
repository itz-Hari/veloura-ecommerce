import { useState } from 'react'
import { IMAGES } from '../data/products'
import SmartImage from '../components/SmartImage'
import './JournalPage.css'

// Short demo articles, kept inline because they are only used on this page.
const ARTICLES = [
  {
    id: 'layering',
    category: 'Style',
    title: 'The art of autumn layering',
    date: 'October 2026',
    image: IMAGES.story,
    excerpt: 'Start light, add texture, finish with structure.',
    body: 'Begin with a breathable linen shirt, add a fine merino pullover for warmth and finish with a long wool coat. Keep the palette tonal - ivory, sage and clay - so every piece mixes with the next.',
  },
  {
    id: 'home-calm',
    category: 'Home',
    title: 'Five small ways to calm a room',
    date: 'September 2026',
    image: IMAGES.editorial,
    excerpt: 'Soft light, natural texture and fewer things.',
    body: 'Swap harsh bulbs for warm ones, drape a woven throw over a chair, group objects in odd numbers and give a ceramic vase room to breathe. Light a candle in the evening and let the room settle.',
  },
  {
    id: 'leather-care',
    category: 'Care',
    title: 'How to care for leather',
    date: 'August 2026',
    image: IMAGES.hero,
    excerpt: 'A little maintenance goes a long way.',
    body: 'Wipe with a soft dry cloth, keep leather away from direct heat and let it rest between wears. A light conditioner twice a year helps vegetable-tanned leather develop a rich, even patina.',
  },
]

export default function JournalPage() {
  const [openId, setOpenId] = useState(null)

  return (
    <main id="main" className="page container journal">
      <header className="page-header">
        <span className="eyebrow">The Journal</span>
        <h1 className="section-title">Stories, style &amp; slow living</h1>
        <p>Short reads on getting dressed, making a home and caring for what you own. Demo articles.</p>
      </header>

      <div className="journal__grid">
        {ARTICLES.map((article) => {
          const expanded = openId === article.id
          return (
            <article key={article.id} className="journal-card">
              <div className="journal-card__image">
                <SmartImage src={article.image} alt={article.title} />
              </div>
              <p className="journal-card__meta">{article.category} &middot; {article.date}</p>
              <h2>{article.title}</h2>
              <p>{article.excerpt}</p>
              {expanded && <p className="journal-card__body" id={`article-${article.id}`}>{article.body}</p>}
              <button
                type="button"
                className="link-arrow"
                onClick={() => setOpenId(expanded ? null : article.id)}
                aria-expanded={expanded}
                aria-controls={`article-${article.id}`}
              >
                {expanded ? 'Show less' : 'Read more'}
              </button>
            </article>
          )
        })}
      </div>
    </main>
  )
}
