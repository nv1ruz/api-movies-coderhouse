import { Router } from 'express';
import { usersRoutes } from './users.routes.js';

class IndexRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.use('/users', usersRoutes.router);
    }
}

export const indexRoutes = new IndexRoutes();
