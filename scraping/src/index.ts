import { ScraperManager } from './services/ScraperManager';
import dotenv from 'dotenv';

dotenv.config();

async function main() {
  const scraperManager = new ScraperManager();
  
  // Example usage
  const amazonUrl = 'https://www.amazon.com/s?k=laptop';
  
  try {
    console.log('Available stores:', scraperManager.getAvailableStores());
    
    const result = await scraperManager.scrapeProduct(amazonUrl, 'amazon');
    
    if (result.success && result.data) {
      console.log(`Found ${result.data.length} products:`);
      result.data.forEach((product, index) => {
        console.log(`\nProduct ${index + 1}:`);
        console.log(`Name: ${product.name}`);
        console.log(`Price: ${product.currency} ${product.price}`);
        console.log(`Store: ${product.store}`);
        console.log(`URL: ${product.url}`);
      });
    } else {
      console.error('Scraping failed:', result.error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main().catch(console.error); 