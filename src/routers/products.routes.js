import { Router } from 'express';
import { productsController } from '../controllers/products.controller.js';

class ProductsRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get('/', productsController.getProducts);
        this.router.post('/', productsController.addProduct);
        this.router.put('/:productId', productsController.updateProduct);
    }
}

export const productsRoutes = new ProductsRoutes();
