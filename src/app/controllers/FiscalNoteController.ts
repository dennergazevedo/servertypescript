import { Request, Response } from "express";
import { FiscalNote, IFiscalNote } from "../models/FiscalNote";

export default class FiscalNoteController {
  async register(req: Request, res: Response) {
    const params: IFiscalNote = req.body;
    await FiscalNote.create<FiscalNote>(params)
      .then((fiscalNote: FiscalNote) => {
        return res.status(201).json(fiscalNote)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar Nota Fiscal, verifique os dados!",
          error: err.name,
        })
      });
  }
  async search(req: Request, res: Response) {
    const { id } = req.params;
    await FiscalNote.findByPk<FiscalNote>(id)
      .then((fiscalNote: FiscalNote | null) => {
        if(fiscalNote){
          res.json(fiscalNote);
        }else{
          res.status(404).json({ error: "Nota Fiscal não encontrada." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar Nota Fiscal.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IFiscalNote = req.body;
    
    const fiscalNote: FiscalNote | null = await FiscalNote.findByPk<FiscalNote>(id);

    if(fiscalNote){
      try{
        await fiscalNote.update(params);
        res.status(200).json("Nota Fiscal atualizada com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Nota Fiscal não encontrada." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const fiscalNote: FiscalNote | null = await FiscalNote.findByPk<FiscalNote>(id);

    if(!fiscalNote) res.status(404).json('Nota Fiscal não encontrada');
    fiscalNote?.destroy();
    res.status(200).json('Nota Fiscal excluida com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await FiscalNote.findAll<FiscalNote>()
      .then((fiscalNotes: Array<FiscalNote>) => res.json(fiscalNotes))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar Nota Fiscal.",
                error: err.name
      }));
  }
}