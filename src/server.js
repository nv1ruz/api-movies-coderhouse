import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

import { DbConfig } from './config/db_config.js';
import { MongoDB } from './config/db_connection.js';

class Server {
    static app;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config() {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes() {
        // this.app.use('/api', indexRoutes.router);
    }

    start() {
        const PORT = this.app.get('port');

        this.app.listen(PORT, () => {
            console.log('Servidor en puerto: ', PORT);
        });

        const PERSISTENCIA = DbConfig.get().persistencia;
        MongoDB.conectar(PERSISTENCIA.URL);
    }
}

const server = new Server();
server.start();
