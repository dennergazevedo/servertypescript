import { Request, Response } from "express";
import { Client } from "../models/Client";

export default class ClientController {
  public searchAll(req: Request, res: Response) {
    Client.findAll<Client>({})
      .then((clients: Array<Client>) => res.json(clients))
      .catch((err: Error) => res.status(500).json(err));
  }
}