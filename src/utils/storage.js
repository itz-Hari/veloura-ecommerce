// Safe localStorage helpers. Storage can be blocked (private mode) or contain
// broken JSON, so every call is wrapped in try/catch and falls back safely.
export function loadJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export function saveJSON(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore: the app still works, it just won't remember data.
  }
}
