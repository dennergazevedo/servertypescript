import { Router } from 'express';
import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
const routes = Router();

routes.get('/:email', UserController.register);
routes.use(authMiddleware);
routes.get('/block/:email', UserController.register);

export default routes;