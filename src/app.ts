import express from "express";
import bodyParser from "body-parser";
import { Routes } from "./routes";
import cors from 'cors';

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    require('dotenv').config();
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
