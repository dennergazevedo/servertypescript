import authMiddleware from './app/middlewares/auth';
import ClientController from './app/controllers/ClientController';
import SessionController from './app/controllers/SessionController';

export class Routes {
  public clientController: ClientController = new ClientController();
  public sessionController: SessionController = new SessionController();

  public routes(app: any): void {
    // CLIENT
    app.route("/client").post(this.clientController.register);
    app.route("/client/:id").put(this.clientController.update);
    app.route("/client/:id").get(this.clientController.search);
    app.route("/client/:id").delete(this.clientController.delete);

    //SESSION
    app.route("/login").post(this.sessionController.login);

    // AUTHENTICATION
    app.use(authMiddleware);

    // CLIENT
    app.route("/client").get(this.clientController.searchAll);
  }
}