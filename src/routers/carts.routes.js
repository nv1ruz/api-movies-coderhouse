import { Router } from 'express';
import { cartsController } from '../controllers/carts.controller.js';

class CartsRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/', cartsController.addCart);
        this.router.get('/:cartId', cartsController.getCartById);
    }
}

export const cartsRoutes = new CartsRoutes();
