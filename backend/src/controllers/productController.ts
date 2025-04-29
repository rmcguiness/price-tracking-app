import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middleware/errorHandler';
import { prisma } from '../config/prisma';

export const productController = {
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await prisma.product.findMany({
        include: {
          priceHistory: {
            orderBy: {
              timestamp: 'desc',
            },
            take: 1,
          },
        },
      });
      res.json(products);
    } catch (error) {
      next(error);
    }
  },

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await prisma.product.findUnique({
        where: { id: req.params.id },
        include: {
          priceHistory: {
            orderBy: {
              timestamp: 'desc',
            },
          },
        },
      });

      if (!product) {
        throw new AppError('Product not found', 404);
      }

      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, imageUrl, store, url, currentPrice } = req.body;

      const product = await prisma.product.create({
        data: {
          name,
          description,
          imageUrl,
          store,
          url,
          currentPrice,
          priceHistory: {
            create: {
              price: currentPrice,
              currency: 'USD',
              store,
              url,
            },
          },
        },
        include: {
          priceHistory: true,
        },
      });

      res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  },

  async updateProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, imageUrl, store, url, currentPrice } = req.body;

      const product = await prisma.product.update({
        where: { id: req.params.id },
        data: {
          name,
          description,
          imageUrl,
          store,
          url,
          currentPrice,
        },
        include: {
          priceHistory: true,
        },
      });

      res.json(product);
    } catch (error) {
      next(error);
    }
  },

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      await prisma.product.delete({
        where: { id: req.params.id },
      });

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
}; 