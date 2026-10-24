import { useMemo, useState } from 'react'
import { SearchX, SlidersHorizontal, X } from 'lucide-react'
import products, { CATEGORIES } from '../data/products'
import { formatPrice } from '../config'
import { useUI } from '../context/UIContext'
import ProductCard from '../components/ProductCard'
import './ShopPage.css'

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

const PRICE_OPTIONS = [
  { value: 0, label: 'Any price' },
  { value: 2500, label: `Under ${formatPrice(2500)}` },
  { value: 5000, label: `Under ${formatPrice(5000)}` },
  { value: 10000, label: `Under ${formatPrice(10000)}` },
]

// Pure function: applies search, filters and sorting to the catalogue.
function applyFilters(list, { category, query, maxPrice, onSale, sort }) {
  const term = query.trim().toLowerCase()

  const filtered = list.filter((product) => {
    if (category !== 'All' && product.category !== category) return false
    if (maxPrice && product.price > maxPrice) return false
    if (onSale && !(product.originalPrice && product.originalPrice > product.price)) return false
    if (term && !`${product.name} ${product.category} ${product.description}`.toLowerCase().includes(term)) return false
    return true
  })

  // Copy before sorting so the original catalogue order (= "featured") is untouched.
  const sorted = [...filtered]
  if (sort === 'newest') sorted.sort((a, b) => b.addedOn.localeCompare(a.addedOn))
  if (sort === 'price-asc') sorted.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price)
  return sorted
}

// The page is re-mounted (see App.jsx key) whenever route params change,
// so initial state can safely be read from the params.
export default function ShopPage() {
  const { route } = useUI()
  const { params } = route
  const [category, setCategory] = useState(params.category || 'All')
  const [query, setQuery] = useState(params.query || '')
  const [maxPrice, setMaxPrice] = useState(params.maxPrice || 0)
  const [onSale, setOnSale] = useState(Boolean(params.onSale))
  const [sort, setSort] = useState(params.sort || 'featured')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const results = useMemo(
    () => applyFilters(products, { category, query, maxPrice, onSale, sort }),
    [category, query, maxPrice, onSale, sort],
  )

  const hasFilters = category !== 'All' || query || maxPrice || onSale || sort !== 'featured'

  const reset = () => {
    setCategory('All')
    setQuery('')
    setMaxPrice(0)
    setOnSale(false)
    setSort('featured')
  }

  const title = category === 'All' ? 'All products' : category

  return (
    <main id="main" className="page shop">
      <div className="container">
        <header className="page-header">
          <span className="eyebrow">{category === 'All' ? 'The full collection' : 'Category'}</span>
          <h1 className="section-title">{title}</h1>
          {query && <p>Showing results for &ldquo;{query}&rdquo;</p>}
        </header>

        <div className="shop__toolbar">
          <button type="button" className="btn btn-outline btn-sm shop__filter-toggle" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen} aria-controls="shop-filters">
            <SlidersHorizontal size={16} aria-hidden="true" /> Filters
          </button>
          <p className="shop__count" role="status">
            {results.length} {results.length === 1 ? 'product' : 'products'}
          </p>
          <div className="shop__sort">
            <label htmlFor="shop-sort">Sort by</label>
            <select id="shop-sort" className="input" value={sort} onChange={(event) => setSort(event.target.value)}>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="shop__layout">
          <aside id="shop-filters" className={`shop__filters ${filtersOpen ? 'is-open' : ''}`} aria-label="Product filters">
            <div className="field">
              <label htmlFor="shop-query">Search</label>
              <input id="shop-query" className="input" type="search" placeholder="Name or category" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>

            <fieldset>
              <legend>Category</legend>
              {['All', ...CATEGORIES].map((name) => (
                <label key={name} className="shop__radio">
                  <input type="radio" name="category" value={name} checked={category === name} onChange={() => setCategory(name)} />
                  <span>{name}</span>
                </label>
              ))}
            </fieldset>

            <div className="field">
              <label htmlFor="shop-price">Price</label>
              <select id="shop-price" className="input" value={maxPrice} onChange={(event) => setMaxPrice(Number(event.target.value))}>
                {PRICE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <label className="shop__radio">
              <input type="checkbox" checked={onSale} onChange={(event) => setOnSale(event.target.checked)} />
              <span>On sale only</span>
            </label>

            <button type="button" className="btn btn-outline btn-sm" onClick={reset} disabled={!hasFilters}>
              <X size={15} aria-hidden="true" /> Reset filters
            </button>
          </aside>

          <section aria-label="Products">
            {results.length > 0 ? (
              <div className="product-grid shop__grid">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <SearchX size={44} aria-hidden="true" />
                <h2>No products found</h2>
                <p>Nothing matches your current search and filters. Try a different word or clear the filters.</p>
                <button type="button" className="btn btn-glass" onClick={reset}>Reset all filters</button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}
