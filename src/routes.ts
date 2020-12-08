import authMiddleware from './app/middlewares/auth';
import ClientController from './app/controllers/ClientController';

export class Routes {
  public clientController: ClientController = new ClientController();

  public routes(app: any): void {
    app.route("/clients").get(this.clientController.searchAll);
    app.route(authMiddleware);
  }
}