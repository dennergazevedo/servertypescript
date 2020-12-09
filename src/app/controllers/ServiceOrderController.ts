import { Request, Response } from "express";
import { ServiceOrder, IServiceOrder } from "../models/ServiceOrder";

export default class ServiceOrderController {
  async register(req: Request, res: Response) {
    const params: IServiceOrder = req.body;
    await ServiceOrder.create<ServiceOrder>(params)
      .then((serviceOrder: ServiceOrder) => {
        return res.status(201).json(serviceOrder)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar Ordem de Serviço, verifique os dados!",
          error: err.name,
        })
      });
  }
  async search(req: Request, res: Response) {
    const { id } = req.params;
    await ServiceOrder.findByPk<ServiceOrder>(id)
      .then((serviceOrder: ServiceOrder | null) => {
        if(serviceOrder){
          res.json(serviceOrder);
        }else{
          res.status(404).json({ error: "Ordem de Serviço não encontrada." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar Ordem de Serviço cadastrada.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IServiceOrder = req.body;
    
    const serviceOrder: ServiceOrder | null = await ServiceOrder.findByPk<ServiceOrder>(id);

    if(serviceOrder){
      try{
        await serviceOrder.update(params);
        res.status(200).json("Ordem de Serviço atualizada com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Ordem de Serviço não encontrada." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const serviceOrder: ServiceOrder | null = await ServiceOrder.findByPk<ServiceOrder>(id);

    if(!serviceOrder) res.status(404).json('Ordem de Serviço não encontrada');
    serviceOrder?.destroy();
    res.status(200).json('Ordem de Serviço excluida com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await ServiceOrder.findAll<ServiceOrder>()
      .then((serviceOrders: Array<ServiceOrder>) => res.json(serviceOrders))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar Ordem de Serviço.",
                error: err.name
      }));
  }
}