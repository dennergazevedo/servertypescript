import { Request, Response } from "express";
import { IMarkboard, Markboard } from "../models/Markboard";

export default class MarkboardController {
  async register(req: Request, res: Response) {
    const params: IMarkboard = req.body;
    await Markboard.create<Markboard>(params)
      .then((markboard: Markboard) => {
        return res.status(201).json(markboard)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar marcação, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Markboard.findByPk<Markboard>(id)
      .then((markboard: Markboard | null) => {
        if(markboard){
          res.json(markboard);
        }else{
          res.status(404).json({ error: "Marcação não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar marcação cadastrada.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IMarkboard = req.body;
    
    const markboard: Markboard | null = await Markboard.findByPk<Markboard>(id);

    if(markboard){
      try{
        await markboard.update(params);
        res.status(200).json("Marcação atualizada com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Marcação não encontrada." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const markboard: Markboard | null = await Markboard.findByPk<Markboard>(id);

    if(!markboard) res.status(404).json('Marcação não encontrada');
    markboard?.destroy();
    res.status(200).json('Marcação excluida com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Markboard.findAll<Markboard>()
      .then((markboards: Array<Markboard>) => res.json(markboards))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar marcações cadastradas.",
                error: err.name
      }));
  }
}