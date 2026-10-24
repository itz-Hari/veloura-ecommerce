import { useState } from 'react'
import './SmartImage.css'

// A branded SVG placeholder shown if a remote photo fails to load.
const PLACEHOLDER = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500">
    <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#e9dfcb"/><stop offset="1" stop-color="#dfe5d8"/>
    </linearGradient></defs>
    <rect width="400" height="500" fill="url(#g)"/>
    <circle cx="200" cy="215" r="64" fill="#ecd5c6" opacity="0.8"/>
    <path d="M150 195l50 95 50-95" fill="none" stroke="#5b5853" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="200" y="360" text-anchor="middle" font-family="Georgia, serif" font-size="30" letter-spacing="8" fill="#5b5853">VELOURA</text>
  </svg>`,
)}`

// Drop-in <img> replacement with a graceful fallback and lazy loading.
export default function SmartImage({ src, alt, className = '', eager = false }) {
  const [failed, setFailed] = useState(false)

  return (
    <img
      className={`smart-image ${className}`}
      src={failed ? PLACEHOLDER : src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
