import puppeteer from 'puppeteer';
import { ScraperConfig, ScrapedProduct, ScraperResult } from '../types/scraper';

export abstract class BaseScraper {
  protected config: ScraperConfig;
  protected browser: puppeteer.Browser | null = null;

  constructor(config: ScraperConfig) {
    this.config = config;
  }

  protected async initializeBrowser(): Promise<void> {
    if (!this.browser) {
      this.browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });
    }
  }

  protected async closeBrowser(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  protected async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  protected async scrapePage(url: string): Promise<ScrapedProduct[]> {
    await this.initializeBrowser();
    const page = await this.browser!.newPage();
    
    try {
      await page.goto(url, { waitUntil: 'networkidle0' });
      await this.delay(1000); // Basic rate limiting

      const products = await page.evaluate((selectors) => {
        const items = document.querySelectorAll(selectors.product);
        return Array.from(items).map(item => {
          const nameElement = item.querySelector(selectors.name);
          const priceElement = item.querySelector(selectors.price);
          const imageElement = item.querySelector(selectors.image);

          return {
            name: nameElement?.textContent?.trim() || '',
            price: parseFloat(priceElement?.textContent?.replace(/[^0-9.]/g, '') || '0'),
            currency: 'USD', // Default currency, can be overridden
            imageUrl: imageElement?.getAttribute('src') || undefined,
            url: item.querySelector('a')?.href || '',
            store: this.config.name,
            timestamp: new Date(),
          };
        }, this.config.selectors);
      });

      return products;
    } finally {
      await page.close();
    }
  }

  protected async handlePagination(url: string): Promise<ScrapedProduct[]> {
    const allProducts: ScrapedProduct[] = [];
    let currentPage = 1;
    let hasNextPage = true;

    while (hasNextPage && (!this.config.pagination?.maxPages || currentPage <= this.config.pagination.maxPages)) {
      const pageUrl = this.config.pagination?.enabled ? `${url}?page=${currentPage}` : url;
      const products = await this.scrapePage(pageUrl);

      if (products.length === 0) {
        hasNextPage = false;
      } else {
        allProducts.push(...products);
        currentPage++;

        if (this.config.rateLimit) {
          await this.delay((60 * 1000) / this.config.rateLimit.requestsPerMinute);
        }
      }
    }

    return allProducts;
  }

  public abstract scrape(url: string): Promise<ScraperResult>;
} 