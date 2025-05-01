import puppeteer, { Browser } from 'puppeteer';

async function launchBrowser() {
  let browser: Browser | null = null;

  try {
    console.log('Launching browser...');
    
    browser = await puppeteer.launch({
      headless: false, // Use headless mode
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--disable-gpu',
        '--window-size=1920x1080',
      ],
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
    });

    console.log('Browser launched successfully!');
    console.log('Browser version:', await browser.version());

    // Open a new page
    const page = await browser.newPage();
    console.log('New page created');

    // Navigate to a test URL
    await page.goto('https://www.google.com', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    console.log('Navigated to Google');
    console.log('Page title:', await page.title());

    // Keep the browser open for 10 seconds
    console.log('Keeping browser open for 10 seconds...');
    await new Promise(resolve => setTimeout(resolve, 10000));

  } catch (error) {
    console.error('Error launching browser:', error);
  } finally {
    if (browser) {
      console.log('Closing browser...');
      await browser.close();
      console.log('Browser closed');
    }
  }
}

// Run the script
launchBrowser().catch(console.error); 