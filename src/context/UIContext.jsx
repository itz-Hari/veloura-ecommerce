import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

// UIContext holds "where the user is" and which overlays are open.
// Navigation is state-based (no router): route = { page, params }.
const UIContext = createContext(null)

const HOME_ROUTE = { page: 'home', params: {} }

export function UIProvider({ children }) {
  const [route, setRoute] = useState(HOME_ROUTE)
  const [cartOpen, setCartOpen] = useState(false)
  const [auth, setAuth] = useState({ open: false, mode: 'login', reason: '' })

  // Make the browser Back button work with state-based pages.
  useEffect(() => {
    window.history.replaceState(HOME_ROUTE, '')
    const handlePopState = (event) => {
      setRoute(event.state?.page ? event.state : HOME_ROUTE)
      setCartOpen(false)
      window.scrollTo({ top: 0 })
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  const navigate = useCallback((page, params = {}) => {
    const next = { page, params }
    window.history.pushState(next, '')
    setRoute(next)
    setCartOpen(false)
    window.scrollTo({ top: 0 })
  }, [])

  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  const openAuth = useCallback((mode = 'login', reason = '') => {
    setCartOpen(false)
    setAuth({ open: true, mode, reason })
  }, [])
  const closeAuth = useCallback(() => setAuth((current) => ({ ...current, open: false })), [])
  const setAuthMode = useCallback((mode) => setAuth((current) => ({ ...current, mode })), [])

  const value = useMemo(
    () => ({
      route,
      navigate,
      cartOpen,
      openCart,
      closeCart,
      auth,
      openAuth,
      closeAuth,
      setAuthMode,
    }),
    [route, navigate, cartOpen, openCart, closeCart, auth, openAuth, closeAuth, setAuthMode],
  )

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}

export function useUI() {
  const context = useContext(UIContext)
  if (!context) throw new Error('useUI must be used inside <UIProvider>')
  return context
}
