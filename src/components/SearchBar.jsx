import { useEffect, useMemo, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import products from '../data/products'
import { formatPrice } from '../config'
import { useUI } from '../context/UIContext'
import SmartImage from './SmartImage'
import './SearchBar.css'

// Search input with live suggestions. Enter opens the full results in the shop.
export default function SearchBar({ onNavigate }) {
  const { navigate } = useUI()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  // Suggestions are derived from the query - no extra state needed.
  const suggestions = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return []
    return products
      .filter((product) => `${product.name} ${product.category}`.toLowerCase().includes(term))
      .slice(0, 5)
  }, [query])

  // Close the suggestion list when clicking outside of the search box.
  useEffect(() => {
    const handleClick = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const finish = () => {
    setOpen(false)
    if (onNavigate) onNavigate()
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const term = query.trim()
    if (!term) return
    navigate('shop', { query: term })
    finish()
  }

  const openProduct = (id) => {
    navigate('product', { id })
    setQuery('')
    finish()
  }

  const showList = open && query.trim().length > 0

  return (
    <div className="search" ref={wrapperRef}>
      <form className="search__form" role="search" onSubmit={handleSubmit}>
        <label htmlFor="site-search" className="visually-hidden">
          Search products
        </label>
        <Search size={18} aria-hidden="true" className="search__icon" />
        <input
          id="site-search"
          className="search__input"
          type="search"
          placeholder="Search linen, leather, candles..."
          autoComplete="off"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Escape') setOpen(false)
          }}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showList}
          aria-controls="search-suggestions"
        />
        {query && (
          <button
            type="button"
            className="search__clear"
            onClick={() => {
              setQuery('')
              setOpen(false)
            }}
            aria-label="Clear search"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </form>

      {showList && (
        <div className="search__panel" id="search-suggestions">
          {suggestions.length > 0 ? (
            <>
              <ul>
                {suggestions.map((product) => (
                  <li key={product.id}>
                    <button type="button" className="search__item" onClick={() => openProduct(product.id)}>
                      <span className="search__thumb">
                        <SmartImage src={product.image} alt="" />
                      </span>
                      <span className="search__meta">
                        <strong>{product.name}</strong>
                        <small>{product.category}</small>
                      </span>
                      <span className="search__price">{formatPrice(product.price)}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <button type="button" className="search__all" onClick={handleSubmit}>
                See all results for &ldquo;{query.trim()}&rdquo;
              </button>
            </>
          ) : (
            <p className="search__none">No matches for &ldquo;{query.trim()}&rdquo;. Try &ldquo;linen&rdquo; or &ldquo;home&rdquo;.</p>
          )}
        </div>
      )}
    </div>
  )
}
