# Analytics Implementation Documentation

## 📘 Table: Interaction Overview

| File / Component | Interaction Description | Implemented GA4 Event Name |
|-----------------|------------------------|------------------------|
| `src/pages/Products.tsx` | User views product list | `view_item_list` |
| `src/pages/Products.tsx` | User applies category filter | `filter_applied` |
| `src/pages/ProductDetail.tsx` | User views product details | `view_item` |
| `src/pages/ProductDetail.tsx` | User adds product to cart | `add_to_cart` |
| `src/pages/Cart.tsx` | User views cart | `view_cart` |
| `src/pages/Cart.tsx` | User removes item from cart | `remove_from_cart` |
| `src/pages/Cart.tsx` | User clears entire cart | `clear_cart` |
| `src/pages/Cart.tsx` | User updates item quantity | `update_cart_quantity` |
| `src/pages/Cart.tsx` | User proceeds to checkout | `begin_checkout` |
| `src/pages/Checkout.tsx` | User starts checkout process | `begin_checkout` |
| `src/pages/Checkout.tsx` | User completes purchase | `purchase` |

## 📊 Final Analytics Event Reference

| Event Name | File / Component | Trigger Description | Parameters Sent |
|------------|-----------------|-------------------|-----------------|
| `view_item_list` | `src/pages/Products.tsx` | User loads products page or changes category | `list_name`, `items: [{item_id, item_name, price, category}]` |
| `filter_applied` | `src/pages/Products.tsx` | User selects a category filter | `filter_type`, `filter_value`, `products_count` |
| `view_item` | `src/pages/ProductDetail.tsx` | User views product details | `item_id`, `item_name`, `price`, `category` |
| `add_to_cart` | `src/pages/ProductDetail.tsx` | User adds product to cart | `item_id`, `item_name`, `price`, `quantity`, `category` |
| `view_cart` | `src/pages/Cart.tsx` | Cart sidebar is opened | `items: [{item_id, item_name, price, quantity}]`, `value` |
| `remove_from_cart` | `src/components/ui/CartItem.tsx` | User removes item from cart | `item_id`, `item_name`, `price`, `quantity` |
| `clear_cart` | `src/pages/Cart.tsx` | User clicks "Clear Cart" button | `cart_total`, `items_count` |
| `update_cart_quantity` | `src/components/ui/CartItem.tsx` | User changes item quantity | `item_id`, `item_name`, `price`, `old_quantity`, `new_quantity`, `change` |
| `begin_checkout` | `src/pages/Cart.tsx` & `Checkout.tsx` | User starts checkout process | `items: [{item_id, item_name, price, quantity}]`, `value` |
| `purchase` | `src/pages/Checkout.tsx` | User completes purchase | `transaction_id`, `value`, `tax`, `shipping`, `items: [{item_id, item_name, price, quantity}]` |

## 🔍 Implementation Details

### GA4 Ecommerce Events
The implementation follows the standard GA4 ecommerce event schema for core shopping interactions:
- Product views
- Cart operations
- Checkout process
- Purchase completion

### Custom Events
Additional custom events have been added to track user behavior more comprehensively:
- Filter interactions
- Cart quantity updates
- Cart clearing

### Data Layer Structure
All events are pushed to the `window.dataLayer` using a standardized helper function that:
1. Clears any previous ecommerce object
2. Pushes the new event with all required parameters

### Helper Functions
The implementation uses centralized helper functions in `src/lib/analytics.ts`:
- Type-safe interfaces for all events
- Standardized tracking functions for each event type
- Utility function for custom events

### Currency Handling
All monetary values are tracked in USD and include:
- Product prices
- Cart totals
- Transaction values
- Tax and shipping costs

### Error Handling
The analytics implementation includes:
- Validation of required parameters
- Fallback for missing values
- Console warnings for debugging

## 📝 Notes
1. All monetary values are tracked in USD
2. Product categories are included where available
3. Quantity changes are tracked with before/after values
4. Transaction IDs are generated randomly for demo purposes
5. Tax is calculated as 10% of cart total
6. Shipping is set to a flat rate of $5 