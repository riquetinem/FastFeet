import { Router } from 'express';
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

// importacao das middlewares
import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// rotas sem autenticacao

// rotas de usuario
routes.post('/users', UserController.store);

// rota para criar uma sessao
routes.post('/sessions', SessionController.store);

// rotas das funcionalidades do entregador
// listar todas as encomendas do entregador
routes.get(
  '/deliveryman/:deliverymanId/deliveries',
  ViewDeliveriesController.index
);

// mostrar horarios disponiveis
routes.get('/deliveryman/available', AvailableController.index);

// alterar o status da entrega
// retirar a entrega do fornecedor
routes.put(
  '/delivery/:deliveryId/start/:deliverymanId',
  ChangeDeliveryController.store
);

// setando a middleware para as rotas depois dela
routes.use(authMiddleware);

// rotas autenticadas

// rotas de destinatario
routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:recipientId', RecipientController.update);

// rotas de entregador
routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:deliverymanId', DeliverymanController.update);
routes.delete('/deliveryman/:deliverymanId', DeliverymanController.delete);

// rotas de entregas
routes.get('/delivery', DeliveryController.index);
routes.post('/delivery', DeliveryController.store);
routes.put('/delivery/:deliveryId', DeliveryController.update);
routes.delete('/delivery/:deliveryId', DeliveryController.delete);

// rota de envio de arquivo
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
