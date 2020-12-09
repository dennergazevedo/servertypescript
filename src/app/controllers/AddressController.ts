import { Request, Response } from "express";
import { Address, IAddress } from "../models/Address";

export default class AddressController {
  async register(req: Request, res: Response) {
    const params: IAddress = req.body;
    await Address.create<Address>(params)
      .then((address: Address) => {
        return res.status(201).json(address)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar endereço, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Address.findByPk<Address>(id)
      .then((address: Address | null) => {
        if(address){
          res.json(address);
        }else{
          res.status(404).json({ error: "Endereço não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar endereço cadastrado.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IAddress = req.body;
    
    const address: Address | null = await Address.findByPk<Address>(id);

    if(address){
      try{
        await address.update(params);
        res.status(200).json("Endereço atualizado com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Endereço não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const address: Address | null = await Address.findByPk<Address>(id);

    if(!address) res.status(404).json('Endereço não encontrado');
    address?.destroy();
    res.status(200).json('Endereço excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Address.findAll<Address>()
      .then((addresses: Array<Address>) => res.json(addresses))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar endereços cadastrados.",
                error: err.name
      }));
  }
}