
import { useState } from 'react'
import { Mail } from 'lucide-react'
import { validateEmail } from '../utils/validation'
import Reveal from './Reveal'
import './Newsletter.css'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    const emailError = validateEmail(email)

    if (emailError) {
      setError(emailError)
      setDone(false)
      return
    }

    if (!consent) {
      setError('Please agree to receive marketing emails.')
      setDone(false)
      return
    }

    setError('')
    setDone(true)
    setEmail('')
    setConsent(false)
  }

  return (
    <Reveal
      as="section"
      className="container section newsletter"
      aria-labelledby="newsletter-title"
    >
      <div className="newsletter__card">
        <Mail size={30} aria-hidden="true" />

        <p className="newsletter__eyebrow">A LITTLE MORE VELOURA</p>

        <h2 id="newsletter-title" className="section-title">
          Good things, delivered.
        </h2>

        <p>
          Discover new collections, thoughtful stories and exclusive offers
          from the world of Veloura.
        </p>

        <form
          className="newsletter__form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="field">
            <label
              htmlFor="newsletter-email"
              className="visually-hidden"
            >
              Email address
            </label>

            <input
              id="newsletter-email"
              className="input"
              type="email"
              placeholder="Enter your email address"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
                setError('')
                setDone(false)
              }}
              aria-invalid={Boolean(error)}
              required
            />
          </div>

          <button type="submit" className="btn btn-glass">
            Subscribe
          </button>

          <label className="newsletter__consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked)
                setError('')
                setDone(false)
              }}
            />
            <span>
              I'd like to receive Veloura's marketing emails.
              I can unsubscribe at any time.
            </span>
          </label>
        </form>

        <div className="newsletter__feedback" role="status" aria-live="polite">
          {error && <p className="field-error">{error}</p>}

          {done && (
            <p className="form-note">
              Thanks for your interest! This is a demo: your email
              was not sent or saved.
            </p>
          )}
        </div>

        <p className="newsletter__privacy">
          Your inbox should feel as considered as your wardrobe.
        </p>
      </div>
    </Reveal>
  )
}
