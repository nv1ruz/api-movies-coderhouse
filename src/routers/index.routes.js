import { Router } from 'express';
import { cartsRoutes } from './carts.routes.js';
import { usersRoutes } from './users.routes.js';

class IndexRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.use('/users', usersRoutes.router);
        this.router.use('/carts', cartsRoutes.router);
    }
}

export const indexRoutes = new IndexRoutes();
