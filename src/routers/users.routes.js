import { Router } from 'express';
import { usersController } from '../controllers/users.controller.js';

class UsersRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/login', usersController.login);
        this.router.post('/register', usersController.register);
    }
}

export const usersRoutes = new UsersRoutes();
