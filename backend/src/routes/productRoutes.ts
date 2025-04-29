import express from 'express';
import { productController } from '../controllers/productController';

export const productRoutes = express.Router();

// Get all products
productRoutes.get('/', productController.getAllProducts);

// Get a single product
productRoutes.get('/:id', productController.getProductById);

// Create a new product
productRoutes.post('/', productController.createProduct);

// Update a product
productRoutes.put('/:id', productController.updateProduct);

// Delete a product
productRoutes.delete('/:id', productController.deleteProduct); 