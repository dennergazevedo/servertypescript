import { Request, Response } from "express";
import { Notice, INotice } from "../models/Notice";

export default class NoticeController {
  async register(req: Request, res: Response) {
    const params: INotice = req.body;
    await Notice.create<Notice>(params)
      .then((notice: Notice) => {
        return res.status(201).json(notice)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar evento, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Notice.findByPk<Notice>(id)
      .then((notice: Notice | null) => {
        if(notice){
          res.json(notice);
        }else{
          res.status(404).json({ error: "Evento não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar evento cadastrado.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: INotice = req.body;
    
    const notice: Notice | null = await Notice.findByPk<Notice>(id);

    if(notice){
      try{
        await notice.update(params);
        res.status(200).json("Evento atualizado com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Evento não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const notice: Notice | null = await Notice.findByPk<Notice>(id);

    if(!notice) res.status(404).json('Evento não encontrado');
    notice?.destroy();
    res.status(200).json('Evento excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Notice.findAll<Notice>()
      .then((notices: Array<Notice>) => res.json(notices))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar eventos cadastrados.",
                error: err.name
      }));
  }
}