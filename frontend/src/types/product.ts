export interface PriceData {
  id: string;
  productId: string;
  price: number;
  currency: string;
  timestamp: Date;
  store: string;
  url: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  currentPrice: number;
  priceHistory: PriceData[];
  store: string;
  url: string;
} 