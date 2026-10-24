import { useUI } from '../context/UIContext'
import './Logo.css'

// Brand mark: a "V" monogram with a clay accent dot, plus the wordmark.
export default function Logo({ light = false, onNavigate }) {
  const { navigate } = useUI()

  return (
    <button
      type="button"
      className={`logo ${light ? 'logo--light' : ''}`}
      onClick={() => {
        navigate('home')
        if (onNavigate) onNavigate()
      }}
      aria-label="VELOURA - go to homepage"
    >
      <svg className="logo__mark" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M11 13l9 17 9-17" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="8.5" r="1.9" fill="var(--clay)" />
      </svg>
      <span className="logo__word">VELOURA</span>
    </button>
  )
}
