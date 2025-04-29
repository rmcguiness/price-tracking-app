import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';
import { prisma } from '../config/prisma';

export const priceController = {
  async getPriceHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;
      const { limit = 30 } = req.query;

      const priceHistory = await prisma.priceData.findMany({
        where: { productId },
        orderBy: { timestamp: 'desc' },
        take: Number(limit),
      });

      res.json(priceHistory);
    } catch (error) {
      next(error);
    }
  },

  async addPriceRecord(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, price, currency = 'USD', store, url } = req.body;

      // Update product's current price
      await prisma.product.update({
        where: { id: productId },
        data: { currentPrice: price },
      });

      // Add new price record
      const priceRecord = await prisma.priceData.create({
        data: {
          productId,
          price,
          currency,
          store,
          url,
        },
      });

      res.status(201).json(priceRecord);
    } catch (error) {
      next(error);
    }
  },

  async getPriceStatistics(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId } = req.params;

      const priceHistory = await prisma.priceData.findMany({
        where: { productId },
        orderBy: { timestamp: 'desc' },
      });

      if (priceHistory.length === 0) {
        throw new AppError('No price history found for this product', 404);
      }

      const currentPrice = priceHistory[0].price;
      const highestPrice = Math.max(...priceHistory.map(p => p.price));
      const lowestPrice = Math.min(...priceHistory.map(p => p.price));
      const averagePrice = priceHistory.reduce((sum, p) => sum + p.price, 0) / priceHistory.length;

      const priceChange = ((currentPrice - priceHistory[1]?.price) / priceHistory[1]?.price) * 100 || 0;

      res.json({
        currentPrice,
        highestPrice,
        lowestPrice,
        averagePrice,
        priceChange,
        priceHistoryCount: priceHistory.length,
      });
    } catch (error) {
      next(error);
    }
  },
}; 