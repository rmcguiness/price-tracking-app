import { BaseScraper } from './BaseScraper';
import { ScrapedProduct, ScraperResult } from '../types/scraper';
import { AmazonScraper } from './AmazonScraper';

export class ScraperManager {
  private scrapers: Map<string, BaseScraper>;

  constructor() {
    this.scrapers = new Map();
    this.initializeScrapers();
  }

  private initializeScrapers(): void {
    // Add more scrapers here as they are implemented
    this.scrapers.set('amazon', new AmazonScraper());
  }

  public async scrapeProduct(url: string, store: string): Promise<ScraperResult> {
    const scraper = this.scrapers.get(store.toLowerCase());
    
    if (!scraper) {
      return {
        success: false,
        error: `No scraper found for store: ${store}`,
        timestamp: new Date(),
      };
    }

    return scraper.scrape(url);
  }

  public async scrapeMultipleProducts(urls: { url: string; store: string }[]): Promise<ScrapedProduct[]> {
    const results: ScrapedProduct[] = [];
    
    for (const { url, store } of urls) {
      const result = await this.scrapeProduct(url, store);
      if (result.success && result.data) {
        results.push(...result.data);
      }
    }

    return results;
  }

  public getAvailableStores(): string[] {
    return Array.from(this.scrapers.keys());
  }
} 