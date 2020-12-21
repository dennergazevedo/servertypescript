import { Request, Response } from "express";
import { Taxation, ITaxation } from "../models/Taxation";

export default class TaxationController {
  async register(req: Request, res: Response) {
    const params: ITaxation = req.body;
    await Taxation.create<Taxation>(params)
      .then((address: Taxation) => {
        return res.status(201).json(address)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar imposto, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Taxation.findByPk<Taxation>(id)
      .then((address: Taxation | null) => {
        if(address){
          res.json(address);
        }else{
          res.status(404).json({ error: "Imposto não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar imposto cadastrado.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: ITaxation = req.body;
    
    const address: Taxation | null = await Taxation.findByPk<Taxation>(id);

    if(address){
      try{
        await address.update(params);
        res.status(200).json("Imposto atualizado com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Imposto não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const address: Taxation | null = await Taxation.findByPk<Taxation>(id);

    if(!address) res.status(404).json('Imposto não encontrado');
    address?.destroy();
    res.status(200).json('Imposto excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Taxation.findAll<Taxation>()
      .then((taxations: Array<Taxation>) => res.json(taxations))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar impostos cadastrados.",
                error: err.name
      }));
  }
}