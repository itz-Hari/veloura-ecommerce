import { Check, Info, X } from 'lucide-react'
import './Toast.css'

// Shows one message at a time. role="status" lets screen readers announce it politely.
export default function Toast({ toast, onDismiss }) {
  return (
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div key={toast.id} className={`toast toast--${toast.type}`}>
          {toast.type === 'success' ? <Check size={18} aria-hidden="true" /> : <Info size={18} aria-hidden="true" />}
          <span>{toast.message}</span>
          <button type="button" className="toast__close" onClick={onDismiss} aria-label="Dismiss message">
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  )
}
