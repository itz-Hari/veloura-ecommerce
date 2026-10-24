import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import products from '../data/products'
import { FLAT_SHIPPING_FEE, FREE_SHIPPING_THRESHOLD, MAX_QUANTITY } from '../config'
import { loadJSON, saveJSON } from '../utils/storage'

const STORAGE_KEY = 'veloura-cart-v1'
const CartContext = createContext(null)

// A cart line is identified by product + colour, so the same product in two
// colours becomes two lines, while adding the same colour twice just adds quantity.
const makeLineKey = (productId, color) => `${productId}__${color}`

const clampQuantity = (quantity, stock) =>
  Math.max(1, Math.min(Math.floor(quantity) || 1, MAX_QUANTITY, stock))

// Reads the saved cart defensively: anything malformed is dropped, never thrown.
function readSavedCart() {
  const saved = loadJSON(STORAGE_KEY, [])
  if (!Array.isArray(saved)) return []

  return saved.flatMap((line) => {
    const product = products.find((item) => item.id === line?.id)
    if (!product || typeof line.color !== 'string') return []
    return [
      {
        key: makeLineKey(product.id, line.color),
        id: product.id,
        color: line.color,
        quantity: clampQuantity(Number(line.quantity), product.stock),
      },
    ]
  })
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(readSavedCart)

  // Persist on every change (only ids, colours and quantities are stored).
  useEffect(() => {
    saveJSON(
      STORAGE_KEY,
      lines.map(({ id, color, quantity }) => ({ id, color, quantity })),
    )
  }, [lines])

  const addItem = useCallback((product, { quantity = 1, color } = {}) => {
    const chosenColor = color || product.colors[0].name
    const key = makeLineKey(product.id, chosenColor)

    setLines((current) => {
      const existing = current.find((line) => line.key === key)
      if (existing) {
        // Duplicate addition: increase quantity instead of adding a second line.
        return current.map((line) =>
          line.key === key
            ? { ...line, quantity: clampQuantity(line.quantity + quantity, product.stock) }
            : line,
        )
      }
      return [
        ...current,
        { key, id: product.id, color: chosenColor, quantity: clampQuantity(quantity, product.stock) },
      ]
    })
  }, [])

  const setQuantity = useCallback((key, quantity) => {
    setLines((current) =>
      current.map((line) => {
        if (line.key !== key) return line
        const product = products.find((item) => item.id === line.id)
        return { ...line, quantity: clampQuantity(quantity, product.stock) }
      }),
    )
  }, [])

  const removeItem = useCallback((key) => {
    setLines((current) => current.filter((line) => line.key !== key))
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  // Derived values: lines joined with product data, plus totals.
  const value = useMemo(() => {
    const detailedLines = lines.map((line) => {
      const product = products.find((item) => item.id === line.id)
      return { ...line, product, lineTotal: product.price * line.quantity }
    })
    const itemCount = detailedLines.reduce((sum, line) => sum + line.quantity, 0)
    const subtotal = detailedLines.reduce((sum, line) => sum + line.lineTotal, 0)
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING_FEE
    const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

    return {
      lines: detailedLines,
      itemCount,
      subtotal,
      shipping,
      total: subtotal + shipping,
      amountToFreeShipping,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
    }
  }, [lines, addItem, setQuantity, removeItem, clearCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}
