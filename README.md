# VELOURA - React E-commerce Storefront (Demo)

A premium, responsive retail storefront built with **React + Vite**, plain CSS and **lucide-react** icons.
It opens on the shopping homepage (never on a login screen) and covers browsing, search, filters, product
details, wishlist, bag, auth UI, contact and newsletter forms.

## Run it on Windows (VS Code)

1. Extract the ZIP (right-click -> **Extract All...**).
2. Open the extracted `veloura-ecommerce` folder in **VS Code** (File -> Open Folder).
3. Open the integrated terminal (**Terminal -> New Terminal**).
4. Install dependencies:
   ```
   npm install
   ```
5. Start the dev server:
   ```
   npm run dev
   ```
6. Open the localhost URL printed by Vite (usually http://localhost:5173).
7. Verify the production build:
   ```
   npm run build
   ```
   (Optional: `npm run preview` serves the built site.)

Requires **Node.js 18+** (https://nodejs.org).

## Dependencies

- `react`, `react-dom` - UI
- `lucide-react` - icons
- `vite`, `@vitejs/plugin-react` - dev server and build (dev dependencies)

No Tailwind, no router, no state library. Navigation is state-based (see `src/context/UIContext.jsx`) and the
browser Back button works.

## Project structure

```
src/
  main.jsx, App.jsx
  config.js            currency + shipping settings (change currency here)
  data/products.js     all demo products, categories and image URLs
  context/             Cart, Wishlist, Toast and UI (navigation/modals) state
  components/          reusable components, each with its own .css file
  pages/               one page per file, each with its own .css file
  hooks/, utils/       scroll-reveal hook, localStorage and validation helpers
  styles/global.css    tokens, reset and shared utilities only
```

## What works (client-side)

- Search with suggestions, category/price/sale filters, sorting, reset, result counts, empty states
- Product details with colour and quantity selection, add to bag, wishlist, related products
- Wishlist and bag saved in `localStorage` (malformed data is ignored safely)
- Slide-in bag drawer and full bag page with live totals and quantity limits
- Login / Register / Forgot-password UI with validation, show/hide password, Escape and backdrop close
- Contact and newsletter forms with validation and accessible feedback

## Demo-only (needs a backend or third-party service)

- **Authentication:** forms validate but nothing is created or signed in; passwords are never stored.
  Real accounts, sessions and password recovery need a secure auth provider or backend.
- **Checkout and payments:** the checkout button explains that no payment provider is connected. No orders are placed.
- **Contact form and newsletter:** validated only; nothing is sent or saved.
- **Ratings, reviews, testimonials, stock levels:** sample data.
- **Images:** loaded from Unsplash; a branded placeholder appears if an image fails (e.g. offline).
