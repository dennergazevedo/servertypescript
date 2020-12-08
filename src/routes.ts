import authMiddleware from './app/middlewares/auth';
import ClientController from './app/controllers/ClientController';

export class Routes {
  public clientController: ClientController = new ClientController();

  public routes(app: any): void {
    app.route("/client").post(this.clientController.register);
    app.route('/client/:id').put(this.clientController.update);
    app.route("/client/:id").get(this.clientController.search);
    app.route("/client/:id").delete(this.clientController.delete);
    app.route("/client").get(this.clientController.searchAll);
    app.route(authMiddleware);
  }
}