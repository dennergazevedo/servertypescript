import authMiddleware from './app/middlewares/auth';

// CONTROLLERS
import ClientController from './app/controllers/ClientController';
import SessionController from './app/controllers/SessionController';
import ServiceOrderController from './app/controllers/ServiceOrderController';
import AddressController from './app/controllers/AddressController';
import CollaboratorController from './app/controllers/CollaboratorController';
import MarkboardController from './app/controllers/MarkboardController';
import NoticeController from './app/controllers/NoticeController';
import LossController from './app/controllers/LossController';
import FileController from './app/controllers/FileController';

export class Routes {
  public clientController: ClientController = new ClientController();
  public collaboratorController: CollaboratorController = new CollaboratorController();
  public sessionController: SessionController = new SessionController();
  public serviceOrderController: ServiceOrderController = new ServiceOrderController();
  public addressController: AddressController = new AddressController();
  public markboardController: MarkboardController = new MarkboardController();
  public noticeController: NoticeController = new NoticeController();
  public lossController: LossController = new LossController();
  public fileController: FileController = new FileController();

  public routes(app: any): void {
    // CLIENT
    app.route("/client").post(this.clientController.register);
    app.route("/client/:id")
      .put(this.clientController.update)
      .get(this.clientController.search)
      .delete(this.clientController.delete);

    //SESSION
    app.route("/login").post(this.sessionController.loginClient);
    app.route("/collab-login").post(this.sessionController.loginCollab);

    // AUTHENTICATION-----------------------------------------------------------
    app.use(authMiddleware);

    // COLLABORATOR
    app.route("/collaborator")
      .post(this.collaboratorController.register)
      .get(this.collaboratorController.searchAll);
    app.route("/collaborator/:id")
      .put(this.collaboratorController.update)
      .get(this.collaboratorController.search)
      .delete(this.collaboratorController.delete);

    // CLIENT
    app.route("/client").get(this.clientController.searchAll);

    // SERVICE ORDER
    app.route("/serviceorder")
      .post(this.serviceOrderController.register)
      .get(this.serviceOrderController.searchAll);
    app.route("/serviceorder/:id")
      .put(this.serviceOrderController.update)
      .get(this.serviceOrderController.search)
      .delete(this.serviceOrderController.delete);
    
    // ADDRESS CONTROLLER
    app.route("/address")
      .post(this.addressController.register)
      .get(this.addressController.searchAll);
    app.route("/address/:id")
      .put(this.addressController.update)
      .get(this.addressController.search)
      .delete(this.addressController.delete);

    // MARKBOARD CONTROLLER
    app.route("/markboard")
      .post(this.markboardController.register)
      .get(this.markboardController.searchAll);
    app.route("/markboard/:id")
      .put(this.markboardController.update)
      .get(this.markboardController.search)
      .delete(this.markboardController.delete);

    // NOTICE CONTROLLER
    app.route("/notice")
      .post(this.noticeController.register)
      .get(this.noticeController.searchAll);
    app.route("/notice/:id")
      .put(this.noticeController.update)
      .get(this.noticeController.search)
      .delete(this.noticeController.delete);

    // LOSS CONTROLLER
    app.route("/loss")
      .post(this.lossController.register)
      .get(this.lossController.searchAll);
    app.route("/loss/:id")
      .put(this.lossController.update)
      .get(this.lossController.search)
      .delete(this.lossController.delete);

    // FILE CONTROLLER
    app.route("/file")
      .post(this.fileController.register)
      .get(this.fileController.searchAll);
    app.route("/file/:id")
      .put(this.fileController.update)
      .get(this.fileController.search)
      .delete(this.fileController.delete);
    }
}