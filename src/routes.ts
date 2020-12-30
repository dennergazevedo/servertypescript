import authMiddleware from './app/middlewares/auth';
import 'dotenv/config';

/** Multer */
import * as multer from 'multer';
import multerConfig from './config/multer';

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
import SearchController from './app/controllers/SearchController';
import SlideshowController from './app/controllers/SlideshowController';
import MailController from './app/controllers/MailController';
import { Router } from 'express';

/** Multer Init */
const upload = multer.default(multerConfig);

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
  public searchController: SearchController = new SearchController();
  public slideshowController: SlideshowController = new SlideshowController();
  public mailController: MailController = new MailController();

  public routes(app: Router): void {
    // SEARCH
    app.get("/search_star", this.searchController.searchStar);
    app.get("/file/:id", this.fileController.search);
    app.get("/slideshow", this.slideshowController.searchAll);

    // MAIL
    app.post("/contact_mail", this.mailController.sendContact);
    app.post("/send_curriculum", this.mailController.sendCurriculum);
    app.post("/send_budget", this.mailController.sendBudget);

    // CLIENT
    app.post("/client", this.clientController.register);
    app.put("/client/:id", this.clientController.update);
    app.get("/client/:id", this.clientController.search);
    app.get("/client_byemail/:email", this.clientController.searchByEmail);
    app.delete("/client/:id", this.clientController.delete);
    app.put("/client_update_pass/:id", this.clientController.updatePassword);
    app.post("/forgot_pass", this.clientController.forgotPassword);
    app.post("/reset_pass", this.clientController.resetPassword)
    app.post("/be_partner", this.clientController.bePartner)

    // COLLAB
    app.put("/collab_update_pass/:id", this.collaboratorController.updatePassword)

    // ORDER
    app.post("/order", this.orderController.register);
    app.put("/order/:id", this.orderController.update);
    app.get("/order/:id", this.orderController.search);
    app.delete("/order/:id", this.orderController.delete);
    app.get("/order_byos/:id", this.orderController.searchAll);

    // PRODUCT
    app.get("/product",this.productController.searchAll);
    app.get("/product/:id", this.productController.search);
    app.get("/menu_product/:menu/:name", this.productController.searchProductMenu);
    app.get("/product_name/:name", this.productController.searchProductName);
    app.get("/product_bymenu/:menu", this.productController.searchMenu);

    // PRICE TABLE
    app.get("/pricetable_byproduct/:id", this.pricetableController.searchAll);
    app.get("/pricetable/:id", this.pricetableController.search);

    // FISCAL NOTE
    app.get("/fiscalnote/:id", this.fiscalnoteController.search);

    // SESSION
    app.post("/login", this.sessionController.loginClient);
    app.post("/collab-login", this.sessionController.loginCollab);

    // FILE
    app.post("/upload_curriculum", upload.single('file'), this.fileController.uploadCurriculo);
    app.get("/download_drive/:id", this.fileController.downloadDrive);
    app.put("/download_auth/:url", this.fileController.downloadAuth);
    app.get("/download_open/:id", this.fileController.downloadOpen);
    app.delete("/delete_file/:url", this.fileController.deleteFile);

    // AUTHENTICATION-----------------------------------------------------------
    app.use(authMiddleware);

    // TOKEN
    app.get("/verify_token", this.sessionController.verifyToken);

    // PRODUCT
    app.post("/product", this.productController.register);
    app.put("/product/:id", this.productController.update);
    app.delete("/product/:id", this.productController.delete);

    // PRICE TABLE
    app.post("/pricetable", this.pricetableController.register);
    app.put("/pricetable/:id", this.pricetableController.update);
    app.delete("/pricetable/:id", this.pricetableController.delete);

    // COLLABORATOR
    app.post("/collaborator", this.collaboratorController.register);
    app.get("/collaborator", this.collaboratorController.searchAll);
    app.put("/collaborator/:id", this.collaboratorController.update);
    app.get("/collaborator/:id", this.collaboratorController.search);
    app.delete("/collaborator/:id", this.collaboratorController.delete);

    // CLIENT
    app.get("/client", this.clientController.searchAll);

    // SERVICE ORDER
    app.post("/serviceorder", this.serviceOrderController.register);
    app.get("/serviceorder", this.serviceOrderController.searchAll);
    app.put("/serviceorder/:id", this.serviceOrderController.update);
    app.get("/serviceorder/:id", this.serviceOrderController.search);
    app.delete("/serviceorder/:id", this.serviceOrderController.delete);
    
    // ADDRESS CONTROLLER
    app.post("/address", this.addressController.register);
    app.get("/address", this.addressController.searchAll);
    app.put("/address/:id", this.addressController.update);
    app.get("/address/:id", this.addressController.search);
    app.delete("/address/:id", this.addressController.delete);

    // MARKBOARD CONTROLLER
    app.post("/markboard", this.markboardController.register);
    app.get("/markboard", this.markboardController.searchAll);
    app.put("/markboard/:id", this.markboardController.update);
    app.get("/markboard/:id", this.markboardController.search);
    app.delete("/markboard/:id", this.markboardController.delete);

    // NOTICE CONTROLLER
    app.post("/notice", this.noticeController.register);
    app.get("/notice", this.noticeController.searchAll);
    app.put("/notice/:id", this.noticeController.update);
    app.get("/notice/:id", this.noticeController.search);
    app.delete("/notice/:id", this.noticeController.delete);

    // LOSS CONTROLLER
    app.post("/loss", this.lossController.register);
    app.get("/loss", this.lossController.searchAll);
    app.put("/loss/:id", this.lossController.update);
    app.get("/loss/:id", this.lossController.search);
    app.delete("/loss/:id", this.lossController.delete);

    // FILE CONTROLLER
    app.post("/file", this.fileController.register);
    app.get("/file", this.fileController.searchAll);
    app.put("/file/:id", this.fileController.update);
    app.delete("/file/:id", this.fileController.delete);

      // INVOICE
      app.post("/invoice", this.invoiceController.register);
      app.get("/invoice", this.invoiceController.searchAll);
      app.put("/invoice/:id", this.invoiceController.update);
      app.get("/invoice/:id", this.invoiceController.search);
      app.delete("/invoice/:id", this.invoiceController.delete);

      // FISCAL NOTE
      app.post("/fiscalnote", this.fiscalnoteController.register);
      app.get("/fiscalnote", this.fiscalnoteController.searchAll);
      app.put("/fiscalnote/:id", this.fiscalnoteController.update);
      app.delete("/fiscalnote/:id", this.fiscalnoteController.delete);

      // BANK
      app.post("/bank", this.bankController.register);
      app.get("/bank", this.bankController.searchAll);
      app.get("/bank/:id", this.bankController.search);
      app.put("/bank/:id", this.bankController.update);
      app.delete("/bank/:id", this.bankController.delete);

      // INVOICE INSTALLMENT
      app.post("/invoiceinstallment", this.invoiceInstallmentController.register);
      app.get("/invoiceinstallment", this.invoiceInstallmentController.searchAll);
      app.get("/invoiceinstallment/:id", this.invoiceInstallmentController.search);
      app.put("/invoiceinstallment/:id", this.invoiceInstallmentController.update);
      app.delete("/invoiceinstallment/:id", this.invoiceInstallmentController.delete);

      // TAXATION
      app.post("/taxation", this.taxationController.register);
      app.get("/taxation", this.taxationController.searchAll);
      app.get("/taxation/:id", this.taxationController.search);
      app.put("/taxation/:id", this.taxationController.update);
      app.delete("/taxation/:id", this.taxationController.delete);

      // SLIDESHOW
      app.post("/slideshow", this.slideshowController.register);
      app.put("/slideshow/:id", this.slideshowController.update);
      app.get("/slideshow/:id", this.slideshowController.search);
      app.delete("/slideshow/:id", this.slideshowController.delete);
    }
}