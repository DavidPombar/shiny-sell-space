// Type definitions for GA4 dataLayer
// Declare global window with dataLayer property
declare global {
  interface Window {
    dataLayer: any[];
  }
}

interface DataLayerItem {
  item_id: string;
  item_name: string;
  price: number;
  item_category?: string;
  quantity?: number;
}

interface AddToCartEventData {
  currency: string;
  value: number;
  items: DataLayerItem[];
}

interface RemoveFromCartEventData {
  currency: string;
  value: number;
  items: DataLayerItem[];
}

interface ViewItemEventData {
  currency: string;
  value: number;
  items: DataLayerItem[];
}

interface ViewCartEventData {
  currency: string;
  value: number;
  items: DataLayerItem[];
}

interface BeginCheckoutEventData {
  currency: string;
  value: number;
  items: DataLayerItem[];
}

interface PurchaseEventData {
  transaction_id: string;
  value: number;
  tax: number;
  shipping: number;
  currency: string;
  items: DataLayerItem[];
}

// Initialize dataLayer if it doesn't exist
export const initializeDataLayer = (): void => {
  window.dataLayer = window.dataLayer || [];
};

// Helper function to push events to dataLayer
export const pushEvent = (eventName: string, eventData: any): void => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ ecommerce: null }); // Clear the previous ecommerce object
  window.dataLayer.push({
    event: eventName,
    ecommerce: eventData,
  });
};

// Track product view
export const trackViewItem = (product: any): void => {
  const eventData: ViewItemEventData = {
    currency: "USD",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        quantity: 1,
      },
    ],
  };
  pushEvent("view_item", eventData);
};

// Track add to cart
export const trackAddToCart = (product: any, quantity: number): void => {
  const eventData: AddToCartEventData = {
    currency: "USD",
    value: product.price * quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        quantity: quantity,
      },
    ],
  };
  pushEvent("add_to_cart", eventData);
};

// Track remove from cart
export const trackRemoveFromCart = (product: any, quantity: number): void => {
  const eventData: RemoveFromCartEventData = {
    currency: "USD",
    value: product.price * quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
        item_category: product.category,
        quantity: quantity,
      },
    ],
  };
  pushEvent("remove_from_cart", eventData);
};

// Track view cart
export const trackViewCart = (items: any[]): void => {
  const mappedItems = items.map((item) => ({
    item_id: item.product.id,
    item_name: item.product.name,
    price: item.product.price,
    item_category: item.product.category,
    quantity: item.quantity,
  }));

  const totalValue = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const eventData: ViewCartEventData = {
    currency: "USD",
    value: totalValue,
    items: mappedItems,
  };

  pushEvent("view_cart", eventData);
};

// Track begin checkout
export const trackBeginCheckout = (items: any[]): void => {
  const mappedItems = items.map((item) => ({
    item_id: item.product.id,
    item_name: item.product.name,
    price: item.product.price,
    item_category: item.product.category,
    quantity: item.quantity,
  }));

  const totalValue = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const eventData: BeginCheckoutEventData = {
    currency: "USD",
    value: totalValue,
    items: mappedItems,
  };

  pushEvent("begin_checkout", eventData);
};

// Track purchase
export const trackPurchase = (
  transactionId: string,
  items: any[],
  tax: number,
  shipping: number
): void => {
  const mappedItems = items.map((item) => ({
    item_id: item.product.id,
    item_name: item.product.name,
    price: item.product.price,
    item_category: item.product.category,
    quantity: item.quantity,
  }));

  const totalValue = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const eventData: PurchaseEventData = {
    transaction_id: transactionId,
    value: totalValue + tax + shipping,
    tax: tax,
    shipping: shipping,
    currency: "USD",
    items: mappedItems,
  };

  pushEvent("purchase", eventData);
}; 