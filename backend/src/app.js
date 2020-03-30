import 'dotenv/config';

import express from 'express';
import path from 'path';
import helmet from 'helmet';
import redis from 'redis';
import RateLimit from 'express-rate-limit';
import RateLimitRedis from 'rate-limit-redis';
import cors from 'cors';
import Youch from 'youch';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.midlewares();
    this.routes();
    this.exceptionHandler();
  }

  midlewares() {
    this.server.use(express.json());
    this.server.use(helmet());
    this.server.use(cors());

    // passando o path de onde vao os arquivos upados
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );

    if (process.env.NODE_ENV !== 'development') {
      this.server.use(
        new RateLimit({
          store: new RateLimitRedis({
            client: redis.createClient({
              host: process.env.REDIS_HOST,
              port: process.env.REDIS_PORT,
            }),
          }),
          windowMs: 1000 * 60 * 15,
          max: 100,
        })
      );
    }
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    // mostra erros mais "precisos" quando estiver no desenvolvimento da aplicacao
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const erros = await new Youch(err, req).toJSON();

        return res.status(500).json(erros);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
