// Types for GA4 ecommerce data
interface GA4EcommerceItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
  item_category?: string;
  item_variant?: string;
  currency?: string;
}

interface GA4EcommerceData {
  currency: string;
  value: number;
  items: GA4EcommerceItem[];
  transaction_id?: string;
  tax?: number;
  shipping?: number;
}

// Initialize data layer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Ensure dataLayer exists
window.dataLayer = window.dataLayer || [];

// Helper function to track page views
export const trackPageView = (path: string = window.location.pathname) => {
  window.dataLayer.push({
    event: 'page_view',
    page_path: path,
    page_title: document.title
  });
};

// Helper function to track e-commerce events
export const trackEcommerceEvent = (
  eventName: string,
  ecommerceData: GA4EcommerceData
) => {
  window.dataLayer.push({
    event: eventName,
    ecommerce: {
      ...ecommerceData
    }
  });
};

// Helper function to track user interactions
export const trackUserInteraction = (
  eventName: string,
  {
    element_type,
    element_text,
    destination,
    ...additionalParams
  }: {
    element_type: string;
    element_text: string;
    destination?: string;
    [key: string]: any;
  }
) => {
  window.dataLayer.push({
    event: eventName,
    element_type,
    element_text,
    destination,
    ...additionalParams
  });
};

// Specific e-commerce event helpers
export const trackViewItemList = (items: GA4EcommerceItem[], listName: string) => {
  trackEcommerceEvent('view_item_list', {
    currency: 'EUR', // TODO: Make this configurable
    value: items.reduce((total, item) => total + item.price, 0),
    items,
  });
};

export const trackViewItem = (item: GA4EcommerceItem) => {
  trackEcommerceEvent('view_item', {
    currency: 'EUR',
    value: item.price,
    items: [item],
  });
};

export const trackAddToCart = (item: GA4EcommerceItem) => {
  trackEcommerceEvent('add_to_cart', {
    currency: 'EUR',
    value: item.price * (item.quantity || 1),
    items: [item],
  });
};

export const trackRemoveFromCart = (item: GA4EcommerceItem) => {
  trackEcommerceEvent('remove_from_cart', {
    currency: 'EUR',
    value: item.price * (item.quantity || 1),
    items: [item],
  });
};

export const trackPurchase = (
  transactionId: string,
  items: GA4EcommerceItem[],
  tax: number = 0,
  shipping: number = 0
) => {
  const value = items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  
  trackEcommerceEvent('purchase', {
    transaction_id: transactionId,
    currency: 'EUR',
    value: value + tax + shipping,
    tax,
    shipping,
    items,
  });
}; 