import { Product, AnalyticsEvent } from '@/types/analytics';

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

export const analyticsHelper = {
  // View events
  pushViewItem: (product: Product) => {
    window.dataLayer.push({
      event: "view_item",
      ecommerce: {
        currency: "USD",
        value: product.price,
        items: [{
          item_name: product.name,
          item_id: product.id,
          price: product.price,
          quantity: 1
        }]
      }
    });
  },

  pushViewItemList: (products: Product[]) => {
    window.dataLayer.push({
      event: "view_item_list",
      ecommerce: {
        currency: "USD",
        value: products.reduce((sum, p) => sum + p.price, 0),
        items: products.map(product => ({
          item_name: product.name,
          item_id: product.id,
          price: product.price,
          quantity: 1
        }))
      }
    });
  },

  // Cart events
  pushAddToCart: (product: Product, quantity: number = 1) => {
    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "USD",
        value: product.price * quantity,
        items: [{
          item_name: product.name,
          item_id: product.id,
          price: product.price,
          quantity: quantity
        }]
      }
    });
  },

  pushRemoveFromCart: (product: Product, quantity: number = 1) => {
    window.dataLayer.push({
      event: "remove_from_cart",
      ecommerce: {
        currency: "USD",
        value: product.price * quantity,
        items: [{
          item_name: product.name,
          item_id: product.id,
          price: product.price,
          quantity: quantity
        }]
      }
    });
  },

  // Checkout events
  pushBeginCheckout: (items: Array<{ product: Product; quantity: number }>, totalValue: number) => {
    window.dataLayer.push({
      event: "begin_checkout",
      ecommerce: {
        currency: "USD",
        value: totalValue,
        items: items.map(({ product, quantity }) => ({
          item_name: product.name,
          item_id: product.id,
          price: product.price,
          quantity: quantity
        }))
      }
    });
  },

  pushPurchase: (items: Array<{ product: Product; quantity: number }>, totalValue: number) => {
    window.dataLayer.push({
      event: "purchase",
      ecommerce: {
        currency: "USD",
        value: totalValue,
        items: items.map(({ product, quantity }) => ({
          item_name: product.name,
          item_id: product.id,
          price: product.price,
          quantity: quantity
        }))
      }
    });
  },

  // Custom events
  pushCustomEvent: (eventName: string, data: any) => {
    window.dataLayer.push({
      event: eventName,
      ...data
    });
  }
}; 