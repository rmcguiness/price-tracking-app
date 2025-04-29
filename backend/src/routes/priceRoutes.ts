import express from 'express';
import { priceController } from '../controllers/priceController';

export const priceRoutes = express.Router();

// Get price history for a product
priceRoutes.get('/product/:productId', priceController.getPriceHistory);

// Add a new price record
priceRoutes.post('/', priceController.addPriceRecord);

// Get price statistics
priceRoutes.get('/stats/:productId', priceController.getPriceStatistics); 