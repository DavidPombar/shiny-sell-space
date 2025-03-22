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

export interface EcommerceData {
  currency: string;
  value: number;
  items: AnalyticsItem[];
  transaction_id?: string;
}

export interface AnalyticsEvent {
  event: string;
  ecommerce?: EcommerceData;
  page_name?: string;
  page_path?: string;
  search_term?: string;
  number_of_results?: number;
  filter_name?: string;
  filter_value?: string;
  from?: string;
  to?: string;
  shipping_tier?: string;
  payment_type?: string;
  [key: string]: any;
}

declare global {
  interface Window {
    dataLayer: AnalyticsEvent[];
  }
} 