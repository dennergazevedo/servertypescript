import { Request, Response } from "express";
import { Loss, ILoss } from "../models/Loss";

export default class LossController {
  async register(req: Request, res: Response) {
    const params: ILoss = req.body;
    await Loss.create<Loss>(params)
      .then((loss: Loss) => {
        return res.status(201).json(loss)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar perda, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Loss.findByPk<Loss>(id)
      .then((loss: Loss | null) => {
        if(loss){
          res.json(loss);
        }else{
          res.status(404).json({ error: "Perda não encontrada." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar perda cadastrada.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: ILoss = req.body;
    
    const loss: Loss | null = await Loss.findByPk<Loss>(id);

    if(loss){
      try{
        await loss.update(params);
        res.status(200).json("Perda atualizada com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Perda não encontrada." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const loss: Loss | null = await Loss.findByPk<Loss>(id);

    if(!loss) res.status(404).json('Perda não encontrada');
    loss?.destroy();
    res.status(200).json('Perda excluida com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Loss.findAll<Loss>()
      .then((losses: Array<Loss>) => res.json(losses))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar perdas cadastrados.",
                error: err.name
      }));
  }
}