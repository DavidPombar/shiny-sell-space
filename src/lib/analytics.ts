// Types for GA4 ecommerce events
interface Item {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
  currency?: string;
}

interface BaseEvent {
  event: string;
  [key: string]: any;
}

interface EcommerceEvent extends BaseEvent {
  ecommerce: {
    items?: Item[];
    currency?: string;
    value?: number;
    [key: string]: any;
  };
}

// Initialize dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

window.dataLayer = window.dataLayer || [];

// Utility function to push events to dataLayer
export const pushEvent = (event: BaseEvent | EcommerceEvent) => {
  if (!window.dataLayer) {
    console.warn('DataLayer not initialized');
    return;
  }
  window.dataLayer.push({ ecommerce: null }); // Clear previous ecommerce object
  window.dataLayer.push(event);
};

// Ecommerce event helpers
export const trackViewItem = (item: Item) => {
  pushEvent({
    event: 'view_item',
    ecommerce: {
      currency: 'USD',
      value: item.price,
      items: [item]
    }
  });
};

export const trackAddToCart = (item: Item) => {
  pushEvent({
    event: 'add_to_cart',
    ecommerce: {
      currency: 'USD',
      value: item.price * (item.quantity || 1),
      items: [item]
    }
  });
};

export const trackRemoveFromCart = (item: Item) => {
  pushEvent({
    event: 'remove_from_cart',
    ecommerce: {
      currency: 'USD',
      value: item.price * (item.quantity || 1),
      items: [item]
    }
  });
};

export const trackViewCart = (items: Item[], total: number) => {
  pushEvent({
    event: 'view_cart',
    ecommerce: {
      currency: 'USD',
      value: total,
      items: items
    }
  });
};

export const trackBeginCheckout = (items: Item[], total: number) => {
  pushEvent({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'USD',
      value: total,
      items: items
    }
  });
};

export const trackPurchase = (
  transactionId: string,
  items: Item[],
  total: number,
  tax: number,
  shipping: number
) => {
  pushEvent({
    event: 'purchase',
    ecommerce: {
      transaction_id: transactionId,
      currency: 'USD',
      value: total,
      tax: tax,
      shipping: shipping,
      items: items
    }
  });
};

// Custom event helpers
export const trackCustomEvent = (
  eventName: string,
  eventParams: { [key: string]: any }
) => {
  pushEvent({
    event: eventName,
    ...eventParams
  });
}; 