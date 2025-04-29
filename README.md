# Price Tracking Application

A full-stack application for tracking product prices across multiple online stores, analyzing price history, and setting up price alerts.

## Features

- **Modern UI**: Built with Next.js and Tailwind CSS
- **RESTful API**: Node.js backend with Express
- **Database**: PostgreSQL with Prisma ORM
- **Web Scraping**: Automated price tracking from multiple stores
- **Price Analytics**: Historical price data and trends
- **Price Alerts**: Email notifications for price drops

## Project Structure

```
price-tracking-app/
├── frontend/                 # Next.js frontend application
│   ├── components/          # Reusable UI components
│   ├── pages/              # Next.js pages
│   ├── public/             # Static assets
│   ├── styles/             # Global styles
│   └── types/              # TypeScript type definitions
│
├── backend/                 # Node.js backend application
│   ├── src/
│   │   ├── controllers/    # Request handlers
│   │   ├── middleware/     # Express middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Utility functions
│   └── prisma/            # Database schema and migrations
│
└── scraping/               # Web scraping service
    ├── src/
    │   ├── services/      # Scraper implementations
    │   ├── types/         # TypeScript type definitions
    │   └── utils/         # Utility functions
    └── package.json       # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/price_tracking"
   PORT=3001
   ```

4. Generate Prisma client:

   ```bash
   npx prisma generate
   ```

5. Run database migrations:

   ```bash
   npx prisma migrate dev
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

### Scraping Service Setup

1. Navigate to the scraping directory:

   ```bash
   cd scraping
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the scraping service:
   ```bash
   npm run dev
   ```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get a specific product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product

### Prices

- `GET /api/prices` - Get all price data
- `POST /api/prices` - Add new price data
- `GET /api/prices/:productId` - Get price history for a product

## Database Schema

### Product

```prisma
model Product {
  id          String      @id @default(uuid())
  name        String
  description String?
  url         String
  store       String
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
  prices      PriceData[]
}
```

### PriceData

```prisma
model PriceData {
  id        String   @id @default(uuid())
  productId String
  price     Float
  currency  String
  timestamp DateTime @default(now())
  product   Product  @relation(fields: [productId], references: [id])
}
```

## Web Scraping Service

The scraping service is built with Puppeteer and supports multiple online stores. Currently implemented scrapers:

- Amazon
- (More stores can be added by extending the BaseScraper class)

### Adding a New Store Scraper

1. Create a new scraper class in `scraping/src/services/`:

   ```typescript
   import { BaseScraper } from "./BaseScraper";
   import { ScraperConfig } from "../types/scraper";

   export class NewStoreScraper extends BaseScraper {
     constructor() {
       const config: ScraperConfig = {
         name: "New Store",
         baseUrl: "https://store.com",
         selectors: {
           product: "product-selector",
           name: "name-selector",
           price: "price-selector",
           image: "image-selector",
         },
         pagination: {
           enabled: true,
           selector: "next-page-selector",
           maxPages: 5,
         },
         rateLimit: {
           requestsPerMinute: 30,
         },
       };
       super(config);
     }
   }
   ```

2. Register the scraper in `ScraperManager`:
   ```typescript
   private initializeScrapers(): void {
     this.scrapers.set('newstore', new NewStoreScraper());
   }
   ```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
