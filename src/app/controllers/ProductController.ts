import { Request, Response } from "express";
import { Product, IProduct } from "../models/Product";
const { Op } = require('sequelize');

export default class ProductController {
  async register(req: Request, res: Response) {
    const params: IProduct = req.body;
    await Product.create<Product>(params)
      .then((product: Product) => {
        return res.status(201).json(product)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar produto, verifique os dados!",
          error: err.name,
        })
      });
  }
  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Product.findByPk<Product>(id)
      .then((product: Product | null) => {
        if(product){
          res.json(product);
        }else{
          res.status(404).json({ error: "Produto não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar produto.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IProduct = req.body;
    
    const product: Product | null = await Product.findByPk<Product>(id);

    if(product){
      try{
        await product.update(params);
        res.status(200).json("Produto atualizado com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Produto não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const product: Product | null = await Product.findByPk<Product>(id);

    if(!product) res.status(404).json('Produto não encontrado');
    product?.destroy();
    res.status(200).json('Produto excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Product.findAll<Product>({
      where: { active: 1 },
    })
      .then((products: Array<Product>) => res.json(products))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar produto.",
                error: err.name
      }));
  }

  async searchProductMenu(req: Request, res: Response) {
    const { menu, name } = req.params;
    await Product.findAll<Product>({
      where: {
        name: { [Op.substring]: name },
        menu: { [Op.substring]: menu },
      },
    })
      .then((products: Array<Product>) => res.json(products))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar produto.",
                error: err.name
      }));
  }

  async searchProductName(req: Request, res: Response) {
    const { name } = req.params;
    await Product.findAll<Product>({
      where: {
        name: { [Op.substring]: name },
      },
    })
      .then((products: Array<Product>) => res.json(products))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar produto.",
                error: err.name
      }));
  }

  async searchMenu(req: Request, res: Response) {
    const { menu } = req.params;
    await Product.findAll<Product>({
      where: {
        menu: { [Op.substring]: menu },
      },
    })
      .then((products: Array<Product>) => res.json(products))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar produto.",
                error: err.name
      }));
  }
}