// Small reusable form validators. Each returns an error message or ''.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(value) {
  const email = value.trim()
  if (!email) return 'Please enter your email address.'
  if (!EMAIL_PATTERN.test(email)) return 'Please enter a valid email, e.g. name@example.com.'
  return ''
}

export function validateRequired(value, label) {
  return value.trim() ? '' : `Please enter your ${label}.`
}

export function validatePassword(value) {
  if (!value) return 'Please enter a password.'
  if (value.length < 8) return 'Password must be at least 8 characters.'
  return ''
}
