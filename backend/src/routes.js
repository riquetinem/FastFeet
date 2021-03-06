import { Router } from 'express';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import multer from 'multer';

import multerConfig from './config/multer';

// importacao dos controllers
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import ViewDeliveriesController from './app/controllers/ViewDeliveriesController';
import ChangeDeliveryController from './app/controllers/ChangeDeliveryController';
import AvailableController from './app/controllers/AvailableController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import ProblemsController from './app/controllers/ProblemsController';

// importacao dos validators
import validateSessionStore from './app/validators/SessionStore';
import validateUserStore from './app/validators/UserStore';
import validateProblemStore from './app/validators/ProblemStore';
import validateDeliveryStore from './app/validators/DeliveryStore';
import validateDeliverymanStore from './app/validators/DeliverymanStore';
import validateDeliverymanUpdate from './app/validators/DeliverymanUpdate';

// importacao das middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

// rotas sem autenticacao

// rotas de usuario
routes.post('/users', validateUserStore, UserController.store);

// rota para criar uma sessao
routes.post(
  '/sessions',
  bruteForce.prevent,
  validateSessionStore,
  SessionController.store
);

// mostrar horarios disponiveis
routes.get('/deliveryman/available', AvailableController.index);

// rotas das funcionalidades do entregador
routes.get('/deliveryman/:deliverymanId', DeliverymanController.index);
// listar todas as encomendas do entregador
routes.get(
  '/deliveryman/:deliverymanId/deliveries/:menuContext',
  ViewDeliveriesController.index
);

// alterar o status da entrega
// retirar a entrega do fornecedor
routes.post(
  '/delivery/:deliveryId/start/:deliverymanId',
  ChangeDeliveryController.store
);
// realizar a entrega da encomenda
routes.put(
  '/delivery/:deliveryId/end/:deliverymanId',
  upload.single('file'),
  ChangeDeliveryController.update
);

// rotas relacionadas a problema da entrega
routes.get('/delivery/:deliveryId/problems', DeliveryProblemController.index);
routes.post(
  '/delivery/:deliveryId/problems',
  validateProblemStore,
  DeliveryProblemController.store
);

// setando a middleware para as rotas depois dela
routes.use(authMiddleware);

// rotas autenticadas

// rotas de destinatario
routes.get('/recipient', RecipientController.index);
routes.get('/recipient/:recipientId', RecipientController.index);
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:recipientId', RecipientController.update);
routes.delete('/recipient/:recipientId', RecipientController.delete);

// rotas de entregador
routes.get('/deliveryman', DeliverymanController.index);
routes.post(
  '/deliveryman',
  validateDeliverymanStore,
  DeliverymanController.store
);
routes.put(
  '/deliveryman/:deliverymanId',
  validateDeliverymanUpdate,
  DeliverymanController.update
);
routes.delete('/deliveryman/:deliverymanId', DeliverymanController.delete);

// rotas de problemas da entrega
// listagem de todos as entregas com problemas *
routes.get('/delivery/problems', ProblemsController.index);
// deletar/cancelar a entrega
routes.delete(
  '/problem/:problemId/cancel-delivery',
  ChangeDeliveryController.delete
);

// rotas de entregas
routes.get('/delivery', DeliveryController.index);
routes.get('/delivery/:deliveryId', DeliveryController.index);
routes.post('/delivery', validateDeliveryStore, DeliveryController.store);
routes.put('/delivery/:deliveryId', DeliveryController.update);
routes.delete('/delivery/:deliveryId', DeliveryController.delete);

// rota de envio de arquivo
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
