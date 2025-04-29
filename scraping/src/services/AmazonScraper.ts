import { BaseScraper } from './BaseScraper';
import { ScraperConfig, ScraperResult } from '../types/scraper';

export class AmazonScraper extends BaseScraper {
  constructor() {
    const config: ScraperConfig = {
      name: 'Amazon',
      baseUrl: 'https://www.amazon.com',
      selectors: {
        product: 'div[data-component-type="s-search-result"]',
        name: 'h2 a span',
        price: 'span.a-price span.a-offscreen',
        image: 'img.s-image',
      },
      pagination: {
        enabled: true,
        selector: '.s-pagination-next',
        maxPages: 5,
      },
      rateLimit: {
        requestsPerMinute: 30,
      },
    };
    super(config);
  }

  public async scrape(url: string): Promise<ScraperResult> {
    try {
      const products = await this.handlePagination(url);
      
      return {
        success: true,
        data: products,
        timestamp: new Date(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date(),
      };
    } finally {
      await this.closeBrowser();
    }
  }
} 