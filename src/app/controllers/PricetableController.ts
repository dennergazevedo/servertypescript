import { Request, Response } from "express";
import { Pricetable, IPricetable } from "../models/Pricetable";

export default class PricetableController {
  async register(req: Request, res: Response) {
    const params: IPricetable = req.body;
    await Pricetable.create<Pricetable>(params)
      .then((pricetable: Pricetable) => {
        return res.status(201).json(pricetable)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar tabela, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Pricetable.findByPk<Pricetable>(id)
      .then((pricetable: Pricetable | null) => {
        if(pricetable){
          res.json(pricetable);
        }else{
          res.status(404).json({ error: "Tabela não encontrada." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar tabela.",
                error: err.name
      }));
  }
  
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IPricetable = req.body;
    
    const pricetable: Pricetable | null = await Pricetable.findByPk<Pricetable>(id);

    if(pricetable){
      try{
        await pricetable.update(params);
        res.status(200).json("Tabela atualizada com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Tabela não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const pricetable: Pricetable | null = await Pricetable.findByPk<Pricetable>(id);

    if(!pricetable) res.status(404).json('Tabela não encontrado');
    pricetable?.destroy();
    res.status(200).json('Tabela excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Pricetable.findAll<Pricetable>({
      where: { product_id: req.params.id },
    })
      .then((prices: Array<Pricetable>) => {
        const tables: Array<Pricetable> = prices.sort(function (
          a: Pricetable,
          b: Pricetable,
        ) {
          if (a.up > b.up) {
            return 1;
          }
          if (a.up < b.up) {
            return -1;
          }
          return 0;
        })
        res.json(tables)
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar tabela.",
                error: err.name
      }));
  }
}