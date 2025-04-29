export interface ScrapedProduct {
  name: string;
  price: number;
  currency: string;
  imageUrl?: string;
  url: string;
  store: string;
  timestamp: Date;
}

export interface ScraperConfig {
  name: string;
  baseUrl: string;
  selectors: {
    product: string;
    name: string;
    price: string;
    image?: string;
  };
  pagination?: {
    enabled: boolean;
    selector?: string;
    maxPages?: number;
  };
  rateLimit?: {
    requestsPerMinute: number;
  };
}

export interface ScraperResult {
  success: boolean;
  data?: ScrapedProduct[];
  error?: string;
  timestamp: Date;
} 