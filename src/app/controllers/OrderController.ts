import { Request, Response } from "express";
import { Order, IOrder } from "../models/Order";

export default class OrderController {
  async register(req: Request, res: Response) {
    const params: IOrder = req.body;
    await Order.create<Order>(params)
      .then((order: Order) => {
        return res.status(201).json(order)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar Item do Pedido, verifique os dados!",
          error: err,
        })
      });
  }
  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Order.findByPk<Order>(id)
      .then((order: Order | null) => {
        if(order){
          res.json(order);
        }else{
          res.status(404).json({ error: "Item do Pedido não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar Item do Pedido.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IOrder = req.body;
    
    const order: Order | null = await Order.findByPk<Order>(id);
    if(order){
      try{
        await order.update(params);
        res.status(200).json("Item do Pedido atualizado com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Item do Pedido não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const order: Order | null = await Order.findByPk<Order>(id);

    if(!order) res.status(404).json('Item do Pedido não encontrado');
    order?.destroy();
    res.status(200).json('Item do Pedido excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Order.findAll<Order>({
      where: { serviceorder_id: req.params.id },
    })
      .then((orders: Array<Order>) => res.json(orders))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar Item do Pedido.",
                error: err.name
      }));
  }
}