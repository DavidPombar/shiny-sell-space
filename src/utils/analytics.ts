import { Product } from '@/types/analytics';

// Initialize dataLayer if it doesn't exist
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

export const analyticsHelper = {
  // Page View Events
  pushPageView: (pageName: string, pagePath: string) => {
    window.dataLayer.push({
      event: "page_view",
      page_name: pageName,
      page_path: pagePath
    });
  },

  // Product View Events
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

  pushViewItemList: (products: Product[], listName: string = "Product List") => {
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
      },
      item_list_name: listName
    });
  },

  // Cart Events
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

  pushViewCart: (items: Array<{ product: Product; quantity: number }>, totalValue: number) => {
    window.dataLayer.push({
      event: "view_cart",
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

  // Checkout Events
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

  pushAddShippingInfo: (items: Array<{ product: Product; quantity: number }>, totalValue: number, shippingMethod: string) => {
    window.dataLayer.push({
      event: "add_shipping_info",
      ecommerce: {
        currency: "USD",
        value: totalValue,
        items: items.map(({ product, quantity }) => ({
          item_name: product.name,
          item_id: product.id,
          price: product.price,
          quantity: quantity
        }))
      },
      shipping_tier: shippingMethod
    });
  },

  pushAddPaymentInfo: (items: Array<{ product: Product; quantity: number }>, totalValue: number, paymentMethod: string) => {
    window.dataLayer.push({
      event: "add_payment_info",
      ecommerce: {
        currency: "USD",
        value: totalValue,
        items: items.map(({ product, quantity }) => ({
          item_name: product.name,
          item_id: product.id,
          price: product.price,
          quantity: quantity
        }))
      },
      payment_type: paymentMethod
    });
  },

  pushPurchase: (items: Array<{ product: Product; quantity: number }>, totalValue: number, transactionId: string) => {
    window.dataLayer.push({
      event: "purchase",
      ecommerce: {
        currency: "USD",
        value: totalValue,
        transaction_id: transactionId,
        items: items.map(({ product, quantity }) => ({
          item_name: product.name,
          item_id: product.id,
          price: product.price,
          quantity: quantity
        }))
      }
    });
  },

  // Search Events
  pushSearch: (searchTerm: string, resultsCount: number) => {
    window.dataLayer.push({
      event: "search",
      search_term: searchTerm,
      number_of_results: resultsCount
    });
  },

  // Filter Events
  pushFilter: (filterName: string, filterValue: string) => {
    window.dataLayer.push({
      event: "filter",
      filter_name: filterName,
      filter_value: filterValue
    });
  },

  // Navigation Events
  pushNavigation: (from: string, to: string) => {
    window.dataLayer.push({
      event: "navigation",
      from: from,
      to: to
    });
  },

  // Custom Events
  pushCustomEvent: (eventName: string, data: any) => {
    window.dataLayer.push({
      event: eventName,
      ...data
    });
  }
}; 