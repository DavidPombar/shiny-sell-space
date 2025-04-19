You are an expert in analytics instrumentation for React applications using the GA4 data model. Your task is to fully instrument and document all user interactions in this codebase.

Follow the detailed 4-phase process below and DO NOT skip any interaction.

---

## ✅ Phase 1: Discover All User Interaction Logic

Scan the **entire codebase** and identify all files where user interaction logic may be present.

Include (but do not limit to) the following:

### 🔹 Pages and Routes:
- All files inside `/pages`, `/src/pages`, or any folder that represents a route
- Pages rendered by React Router, Next.js, or similar routing mechanisms

### 🔹 Interactions to Detect:
- **Page loads** → Add a `page_view` event in each renderable page component (on first render via `useEffect`)
- **Click events** on:
  - Buttons
  - Anchor (`<a>`) tags
  - Links (e.g., `Link` components from Next.js, React Router)
  - Menu items (navigation, dropdowns, etc.)
  - CTAs like “Buy now”, “Subscribe”, “Learn more”, etc.
- **Product-related actions**:
  - View product list
  - View product detail
  - Add to cart / Remove from cart
- **Search input interactions**
- **Filter or sort changes**
- **Login and Signup forms**
- **Checkout funnel**: begin checkout, add payment/shipping, purchase

---

## ✅ Phase 2: Create `analytics-doc.md` with Interaction Overview

Create a new file called `analytics-doc.md`.

Start with a table documenting **all discovered interactions** with the following format:

| File / Component     | Interaction Description                   | Suggested GA4 Event Name |
|----------------------|--------------------------------------------|---------------------------|
| `HomePage.jsx`       | Page is loaded and rendered               | `page_view`               |
| `Navbar.jsx`         | User clicks on “Shop” menu item           | `navigation_click`        |
| `ProductCard.jsx`    | User clicks “Add to Cart”                 | `add_to_cart`             |
| `SearchBar.jsx`      | User types and submits a query            | `search`                  |
| `LoginForm.jsx`      | User logs in                              | `login`                   |
| `CheckoutPage.jsx`   | User completes purchase                   | `purchase`                |

**Be exhaustive.** Every button, link, page load or UI interaction must be listed.

---

## ✅ Phase 3: Instrument `dataLayer.push()` for ALL Interactions

Instrument every interaction with `window.dataLayer.push()` **only after making sure the `dataLayer` is properly initialized and not overwritten**.

### 🔐 Data Layer Initialization

At the top level of your app (e.g., in `App.js` or `index.js`), or before the first use of `dataLayer`, insert this line to initialize the data layer if it doesn't exist:

```js
window.dataLayer = window.dataLayer || [];