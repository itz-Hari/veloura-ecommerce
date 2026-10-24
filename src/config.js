// One place to change the store currency and shipping rules.
export const CURRENCY = {
  code: 'INR',
  locale: 'en-IN',
}

export const FREE_SHIPPING_THRESHOLD = 3000
export const FLAT_SHIPPING_FEE = 199
export const MAX_QUANTITY = 10

// Formats a number using the currency above, e.g. 4990 -> "₹4,990"
export function formatPrice(amount) {
  return new Intl.NumberFormat(CURRENCY.locale, {
    style: 'currency',
    currency: CURRENCY.code,
    maximumFractionDigits: 0,
  }).format(amount)
}
