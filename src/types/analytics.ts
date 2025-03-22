export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface AnalyticsItem {
  item_name: string;
  item_id: string;
  price: number;
  quantity: number;
}

export interface AnalyticsEvent {
  event: string;
  ecommerce?: {
    currency: string;
    value: number;
    items: AnalyticsItem[];
  };
}

declare global {
  interface Window {
    dataLayer: AnalyticsEvent[];
  }
} 