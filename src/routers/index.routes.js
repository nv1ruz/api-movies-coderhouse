import { Router } from 'express';
import { validateJWT } from '../middlewares/validate_jwt.js';
import { cartsRoutes } from './carts.routes.js';
import { productsRoutes } from './products.routes.js';
import { usersRoutes } from './users.routes.js';

class IndexRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.use('/users', usersRoutes.router);
        this.router.use('/products', validateJWT, productsRoutes.router);
        this.router.use('/carts', validateJWT, cartsRoutes.router);
    }
}

export const indexRoutes = new IndexRoutes();
