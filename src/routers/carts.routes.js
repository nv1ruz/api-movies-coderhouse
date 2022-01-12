import { Router } from 'express';
import { cartsController } from '../controllers/carts.controller.js';

class CartsRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/', cartsController.create);
        this.router.get('/', cartsController.get);
    }
}

export const cartsRoutes = new CartsRoutes();
