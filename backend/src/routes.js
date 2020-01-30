import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

// importacao dos controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';

// importacao das middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

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
routes.put('/recipient/:recipientId', RecipientController.update);

// rotas de entregador
routes.post('/deliveryman', DeliverymanController.store);

// rota de envio de arquivo
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
