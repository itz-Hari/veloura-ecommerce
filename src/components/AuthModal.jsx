import { useEffect, useRef, useState } from 'react'
import { Eye, EyeOff, X } from 'lucide-react'
import { IMAGES } from '../data/products'
import { useUI } from '../context/UIContext'
import { validateEmail, validatePassword, validateRequired } from '../utils/validation'
import Logo from './Logo'
import SmartImage from './SmartImage'
import './AuthModal.css'

const EMPTY_FORM = { name: '', email: '', password: '', confirm: '' }

const COPY = {
  login: { title: 'Welcome back', sub: 'Sign in to view your wishlist and bag anywhere.' },
  register: { title: 'Create your account', sub: 'Join Veloura for early access and saved favourites.' },
  forgot: { title: 'Reset your password', sub: "Enter your email and we'll show how recovery would work." },
}

// Validates fields for the current mode and returns an errors object.
function validate(mode, form) {
  const errors = {}
  if (mode === 'register') {
    errors.name = validateRequired(form.name, 'full name')
    errors.password = validatePassword(form.password)
    errors.confirm = !form.confirm
      ? 'Please confirm your password.'
      : form.confirm !== form.password
        ? 'Passwords do not match.'
        : ''
  }
  if (mode === 'login') errors.password = form.password ? '' : 'Please enter your password.'
  errors.email = validateEmail(form.email)
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message))
}

export default function AuthModal() {
  const { auth, closeAuth, setAuthMode } = useUI()
  const { mode, reason } = auth
  const [form, setForm] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [result, setResult] = useState('')
  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)

  // Escape closes the dialog; Tab is kept inside it (simple focus trap).
  useEffect(() => {
    const previouslyFocused = document.activeElement
    firstFieldRef.current?.focus()
    document.body.style.overflow = 'hidden'

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        closeAuth()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll(
        'button:not([disabled]), input:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKey)

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [closeAuth])

  const switchMode = (nextMode) => {
    setAuthMode(nextMode)
    setErrors({})
    setResult('')
    setShowPassword(false)
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setResult('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = validate(mode, form)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // There is no backend: nothing is created, saved or signed in. Passwords are never stored.
    setForm(EMPTY_FORM)
    setResult(
      mode === 'forgot'
        ? 'Demo only: no email was sent. Password recovery needs a secure authentication provider.'
        : mode === 'register'
          ? 'Your details look valid, but this demo has no backend, so no account was created.'
          : 'Your details look valid, but this demo has no backend, so you were not signed in.',
    )
  }

  const passwordType = showPassword ? 'text' : 'password'

  return (
    <div
      className="auth"
      onMouseDown={(event) => {
        // Only close when the backdrop itself is pressed, not when dragging out of the dialog.
        if (event.target === event.currentTarget) closeAuth()
      }}
    >
      <div className="auth__dialog" role="dialog" aria-modal="true" aria-labelledby="auth-title" ref={dialogRef}>
        <div className="auth__art">
          <SmartImage src={IMAGES.auth} alt="" eager />
          <div className="auth__art-text">
            <Logo light onNavigate={closeAuth} />
            <p>Quiet luxury, delivered with care.</p>
          </div>
        </div>

        <div className="auth__panel">
          <button type="button" className="icon-btn auth__close" onClick={closeAuth} aria-label="Close">
            <X size={22} aria-hidden="true" />
          </button>

          {mode !== 'forgot' && (
            <div className="auth__tabs" role="group" aria-label="Choose sign in or create account">
              <button type="button" className={mode === 'login' ? 'is-active' : ''} aria-pressed={mode === 'login'} onClick={() => switchMode('login')}>
                Sign in
              </button>
              <button type="button" className={mode === 'register' ? 'is-active' : ''} aria-pressed={mode === 'register'} onClick={() => switchMode('register')}>
                Create account
              </button>
            </div>
          )}

          {/* key={mode} remounts the form so the CSS entrance animation replays on each switch */}
          <form key={mode} className="auth__form" onSubmit={handleSubmit} noValidate>
            <h2 id="auth-title">{COPY[mode].title}</h2>
            <p className="auth__sub">{COPY[mode].sub}</p>
            {reason && <p className="form-note is-info">{reason}</p>}

            {mode === 'register' && (
              <div className="field">
                <label htmlFor="auth-name">Full name</label>
                <input id="auth-name" name="name" className="input" type="text" autoComplete="name" value={form.name} onChange={handleChange} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'auth-name-error' : undefined} ref={firstFieldRef} />
                {errors.name && <p className="field-error" id="auth-name-error">{errors.name}</p>}
              </div>
            )}

            <div className="field">
              <label htmlFor="auth-email">Email</label>
              <input id="auth-email" name="email" className="input" type="email" autoComplete="email" value={form.email} onChange={handleChange} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'auth-email-error' : undefined} ref={mode === 'register' ? undefined : firstFieldRef} />
              {errors.email && <p className="field-error" id="auth-email-error">{errors.email}</p>}
            </div>

            {mode !== 'forgot' && (
              <div className="field">
                <label htmlFor="auth-password">Password</label>
                <div className="auth__password">
                  <input id="auth-password" name="password" className="input" type={passwordType} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={form.password} onChange={handleChange} aria-invalid={Boolean(errors.password)} aria-describedby={errors.password ? 'auth-password-error' : undefined} />
                  <button type="button" onClick={() => setShowPassword((show) => !show)} aria-label={showPassword ? 'Hide password' : 'Show password'}>
                    {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
                  </button>
                </div>
                {errors.password && <p className="field-error" id="auth-password-error">{errors.password}</p>}
              </div>
            )}

            {mode === 'register' && (
              <div className="field">
                <label htmlFor="auth-confirm">Confirm password</label>
                <input id="auth-confirm" name="confirm" className="input" type={passwordType} autoComplete="new-password" value={form.confirm} onChange={handleChange} aria-invalid={Boolean(errors.confirm)} aria-describedby={errors.confirm ? 'auth-confirm-error' : undefined} />
                {errors.confirm && <p className="field-error" id="auth-confirm-error">{errors.confirm}</p>}
              </div>
            )}

            {mode === 'login' && (
              <button type="button" className="auth__forgot" onClick={() => switchMode('forgot')}>
                Forgot your password?
              </button>
            )}

            <button type="submit" className="btn btn-glass btn-block">
              {mode === 'login' ? 'Sign in' : mode === 'register' ? 'Create account' : 'Send reset link'}
            </button>

            <div role="status">{result && <p className="form-note">{result}</p>}</div>

            {mode === 'forgot' && (
              <button type="button" className="auth__forgot" onClick={() => switchMode('login')}>
                Back to sign in
              </button>
            )}

            <p className="auth__disclaimer">
              Demo store: real accounts, sessions and password recovery require a secure authentication
              provider or backend. Passwords entered here are never stored.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
