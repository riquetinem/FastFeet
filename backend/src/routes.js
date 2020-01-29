import { Router } from 'express';

// importacao dos controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

// importacao das middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// rotas sem autenticacao

// rotas de usuario
routes.post('/users', UserController.store);

// rota para criar uma sessao
routes.post('/sessions', SessionController.store);

// setando a middleware para as rotas depois dela
routes.use(authMiddleware);

// rotas autenticadas

// rotas de destinatario
routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);

export default routes;
