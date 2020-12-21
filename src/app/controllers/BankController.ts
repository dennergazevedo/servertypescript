import { Request, Response } from "express";
import { Bank, IBank } from "../models/Bank";

export default class BankController {
  async register(req: Request, res: Response) {
    const params: IBank = req.body;
    await Bank.create<Bank>(params)
      .then((address: Bank) => {
        return res.status(201).json(address)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar banco, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Bank.findByPk<Bank>(id)
      .then((address: Bank | null) => {
        if(address){
          res.json(address);
        }else{
          res.status(404).json({ error: "Banco não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar banco cadastrado.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IBank = req.body;
    
    const address: Bank | null = await Bank.findByPk<Bank>(id);

    if(address){
      try{
        await address.update(params);
        res.status(200).json("Banco atualizado com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Banco não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const address: Bank | null = await Bank.findByPk<Bank>(id);

    if(!address) res.status(404).json('Banco não encontrado');
    address?.destroy();
    res.status(200).json('Banco excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Bank.findAll<Bank>()
      .then((banks: Array<Bank>) => res.json(banks))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar bancos cadastrados.",
                error: err.name
      }));
  }
}