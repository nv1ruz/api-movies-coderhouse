import { Router } from 'express';
import { usersController } from '../controllers/users.controller.js';
import { validateJWT } from '../middlewares/validate_jwt.js';

class UsersRoutes {
    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.post('/login', usersController.login);
        this.router.post('/register', usersController.register);
        this.router.get('/renew', validateJWT, usersController.renewToken);
    }
}

export const usersRoutes = new UsersRoutes();
