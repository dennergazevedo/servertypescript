import { Request, Response } from "express";
import { Client, IClient } from "../models/Client";

export default class ClientController {
  async register(req: Request, res: Response) {
    const params: IClient = req.body;
    await Client.create<Client>(params)
      .then((client: Client) => {
        return res.status(201).json(client)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar cliente, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Client.findByPk<Client>(id)
      .then((client: Client | null) => {
        if(client){
          res.json(client);
        }else{
          res.status(404).json({ error: "Cliente não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar cliente cadastrado.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IClient = req.body;
    
    const client: Client | null = await Client.findByPk<Client>(id);

    if(client){
      try{
        await client.update(params);
        res.status(200).json("Cliente atualizado com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Cliente não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const cliente: Client | null = await Client.findByPk<Client>(id);

    if(!cliente) res.status(404).json('Cliente não encontrado');
    cliente?.destroy();
    res.status(200).json('Cliente excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Client.findAll<Client>()
      .then((clients: Array<Client>) => res.json(clients))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar clientes cadastrados.",
                error: err.name
      }));
  }
}