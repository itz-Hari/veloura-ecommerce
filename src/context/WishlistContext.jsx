import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import products from '../data/products'
import { loadJSON, saveJSON } from '../utils/storage'

const STORAGE_KEY = 'veloura-wishlist-v1'
const WishlistContext = createContext(null)

// Keep only ids that still exist in the catalogue (and drop duplicates).
function readSavedWishlist() {
  const saved = loadJSON(STORAGE_KEY, [])
  if (!Array.isArray(saved)) return []
  const validIds = saved.filter((id) => products.some((product) => product.id === id))
  return [...new Set(validIds)]
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(readSavedWishlist)

  useEffect(() => {
    saveJSON(STORAGE_KEY, ids)
  }, [ids])

  const toggle = useCallback((productId) => {
    setIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    )
  }, [])

  const remove = useCallback((productId) => {
    setIds((current) => current.filter((id) => id !== productId))
  }, [])

  const clear = useCallback(() => setIds([]), [])

  const value = useMemo(
    () => ({
      ids,
      items: ids.map((id) => products.find((product) => product.id === id)).filter(Boolean),
      count: ids.length,
      has: (productId) => ids.includes(productId),
      toggle,
      remove,
      clear,
    }),
    [ids, toggle, remove, clear],
  )

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used inside <WishlistProvider>')
  return context
}
