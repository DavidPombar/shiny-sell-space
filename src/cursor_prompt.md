```text
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
```

Never overwrite it if it already exists. Only initialize it if undefined.

To safely push events from anywhere, use this pattern before every push:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "your_event_name",
  ... // event payload
});
```

Alternatively, define a helper function like:

```js
function trackEvent(event) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}
```

Then use `trackEvent({...})` across components.

---

### 🔹 Page Views

Add a `page_view` event at the top of every renderable page (use `useEffect`):

```js
useEffect(() => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "page_view",
    page_path: window.location.pathname,
    page_title: document.title
  });
}, []);
```

This must be added to **every route/page component**.

---

### 🔹 Click Events

Add tracking for **every click interaction**, even if it seems minor. Use these GA4 events depending on the context:

#### For generic buttons or promotional CTAs:
```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "cta_click",
  cta_label: "Subscribe Now",
  destination: "/subscribe"
});
```

#### For navigation:
```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "navigation_click",
  link_text: "Shop",
  destination: "/shop"
});
```

#### For product selection:
```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "select_item",
  ecommerce: {
    items: [{
      item_id: "SKU123",
      item_name: "Running Shoes"
    }]
  }
});
```

If the element is inside a map (e.g., list of product cards), ensure the dynamic data (`item_id`, `item_name`, etc.) is used.

---

### 🔹 E-commerce Actions (GA4 Schema Required)

Use full GA4 ecommerce schema for:

- `view_item`
- `add_to_cart`
- `remove_from_cart`
- `view_cart`
- `begin_checkout`
- `purchase`

Example:

```js
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "add_to_cart",
  ecommerce: {
    currency: "EUR",
    value: 59.99,
    items: [
      {
        item_id: "SKU123",
        item_name: "Running Shoes",
        price: 59.99,
        quantity: 1
      }
    ]
  }
});
```

Add as many contextual properties as possible. If values are missing, add `TODO` comments indicating what's required.

---

## ✅ Phase 4: Update `analytics-doc.md` with Full Details

Update the documentation with all the implemented events. Use this format:

| Event Name     | File / Component     | Trigger Description              | Parameters Sent                                                             |
|----------------|----------------------|----------------------------------|------------------------------------------------------------------------------|
| `page_view`    | `HomePage.jsx`       | Page is loaded                   | `page_path`, `page_title`                                                  |
| `add_to_cart`  | `ProductCard.jsx`    | User clicks “Add to Cart”        | `item_id`, `item_name`, `price`, `quantity`, `currency`                    |
| `cta_click`    | `HeroSection.jsx`    | User clicks "Subscribe Now" CTA | `cta_label`, `destination`                                                 |
| `navigation_click` | `Navbar.jsx`     | User clicks on "Shop" menu       | `link_text`, `destination`                                                 |

Include **all properties** pushed to the `dataLayer`, as well as the **exact file and user trigger**.

---

🎯 Final Goal: Every page load and every meaningful interaction must be tracked with a `dataLayer.push()` event and fully documented in `analytics-doc.md`, using GA4 conventions and naming. DataLayer must be safely initialized and never overwritten.

Be precise, exhaustive, and explicit.
```