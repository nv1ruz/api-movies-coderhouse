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
        this.router.get('/last_carts/user/:userId', cartsController.getCartsByUserId);
        this.router.get('/last_carts/all', cartsController.getLastCarts);
    }
}

export const cartsRoutes = new CartsRoutes();
