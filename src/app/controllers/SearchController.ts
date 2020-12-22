import { Request, Response } from "express";
import { Product } from "../models/Product";

export default class SearchController {
  async searchStar(req: Request, res: Response) {
    await Product.findAll<Product>({
      where: { star: true },
    })
      .then((products: Array<Product>) => res.json(products))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar produtos.",
                error: err.name
      }));
  }
}