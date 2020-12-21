import authMiddleware from './app/middlewares/auth';
import 'dotenv/config';

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
import OrderController from './app/controllers/OrderController';
import ProductController from './app/controllers/ProductController';
import PricetableController from './app/controllers/PricetableController';
import InvoiceController from './app/controllers/InvoiceController';
import FiscalNoteController from './app/controllers/FiscalNoteController';
import BankController from './app/controllers/BankController';
import InvoiceInstallmentController from './app/controllers/InvoiceInstallmentController';
import TaxationController from './app/controllers/TaxationController';

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
  public orderController: OrderController = new OrderController();
  public productController: ProductController = new ProductController();
  public pricetableController: PricetableController = new PricetableController();
  public invoiceController: InvoiceController = new InvoiceController();
  public fiscalnoteController: FiscalNoteController = new FiscalNoteController();
  public bankController: BankController = new BankController();
  public invoiceInstallmentController: InvoiceInstallmentController = new InvoiceInstallmentController();
  public taxationController: TaxationController = new TaxationController();

  public routes(app: any): void {
    // CLIENT
    app.route("/client").post(this.clientController.register);
    app.route("/client/:id")
      .put(this.clientController.update)
      .get(this.clientController.search)
      .delete(this.clientController.delete);
    app.route("/client_update_pass/:id")
      .put(this.clientController.updatePassword);

    // COLLAB
    app.route("/collab_update_pass/:id")
      .put(this.collaboratorController.updatePassword);

    // ORDER
    app.route("/order").post(this.orderController.register);
    app.route("/order/:id")
      .put(this.orderController.update)
      .get(this.orderController.search)
      .delete(this.orderController.delete);
    app.route("/order_byos/:id").get(this.orderController.searchAll);

    // PRODUCT
    app.route("/product").get(this.productController.searchAll);
    app.route("/product/:id").get(this.productController.search);

    // PRICE TABLE
    app.route("/pricetable_byproduct/:id").get(this.pricetableController.searchAll);
    app.route("/pricetable/:id").get(this.pricetableController.search);

    // FISCAL NOTE
    app.route("/fiscalnote/:id").get(this.fiscalnoteController.search);

    // SESSION
    app.route("/login").post(this.sessionController.loginClient);
    app.route("/collab-login").post(this.sessionController.loginCollab);

    // AUTHENTICATION-----------------------------------------------------------
    app.use(authMiddleware);

    // PRODUCT
    app.route("/product").post(this.productController.register);
    app.route("/product/:id")
      .put(this.productController.update)
      .delete(this.productController.delete);

    // PRICE TABLE
    app.route("/pricetable").post(this.pricetableController.register);
    app.route("/pricetable/:id")
      .put(this.pricetableController.update)
      .delete(this.pricetableController.delete);

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

      // INVOICE
      app.route("/invoice")
        .post(this.invoiceController.register)
        .get(this.invoiceController.searchAll);
      app.route("/invoice/:id")
        .put(this.invoiceController.update)
        .get(this.invoiceController.search)
        .delete(this.invoiceController.delete);

      // FISCAL NOTE
      app.route("/fiscalnote")
        .post(this.fiscalnoteController.register)
        .get(this.fiscalnoteController.searchAll);
      app.route("/fiscalnote/:id")
        .put(this.fiscalnoteController.update)
        .delete(this.fiscalnoteController.delete);

      // BANK
      app.route("/bank")
        .post(this.bankController.register)
        .get(this.bankController.searchAll);
      app.route("/bank/:id")
        .get(this.bankController.search)
        .put(this.bankController.update)
        .delete(this.bankController.delete);

      // INVOICE INSTALLMENT
      app.route("/invoiceinstallment")
        .post(this.invoiceInstallmentController.register)
        .get(this.invoiceInstallmentController.searchAll);
      app.route("/invoiceinstallment/:id")
        .get(this.invoiceInstallmentController.search)
        .put(this.invoiceInstallmentController.update)
        .delete(this.invoiceInstallmentController.delete);

      // TAXATION
      app.route("/taxation")
        .post(this.taxationController.register)
        .get(this.taxationController.searchAll);
      app.route("/taxation/:id")
        .get(this.taxationController.search)
        .put(this.taxationController.update)
        .delete(this.taxationController.delete);
    }
}