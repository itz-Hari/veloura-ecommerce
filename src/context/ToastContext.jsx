import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import Toast from '../components/Toast'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const showToast = useCallback((message, type = 'success') => {
    window.clearTimeout(timerRef.current)
    // A fresh id restarts the entrance animation even for repeated messages.
    setToast({ id: Date.now(), message, type })
    timerRef.current = window.setTimeout(() => setToast(null), 3200)
  }, [])

  const dismiss = useCallback(() => {
    window.clearTimeout(timerRef.current)
    setToast(null)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast toast={toast} onDismiss={dismiss} />
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used inside <ToastProvider>')
  return context
}
