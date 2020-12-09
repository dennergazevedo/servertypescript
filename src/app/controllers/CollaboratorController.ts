import { Request, Response } from "express";
import { Collaborator, ICollaborator } from "../models/Collaborator";

export default class CollaboratorController {
  async register(req: Request, res: Response) {
    const params: ICollaborator = req.body;
    await Collaborator.create<Collaborator>(params)
      .then((collab: Collaborator) => {
        return res.status(201).json(collab)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar colaborador, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Collaborator.findByPk<Collaborator>(id)
      .then((collab: Collaborator | null) => {
        if(collab){
          res.json(collab);
        }else{
          res.status(404).json({ error: "Colaborador não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar colaborador cadastrado.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: ICollaborator = req.body;
    
    const collab: Collaborator | null = await Collaborator.findByPk<Collaborator>(id);

    if(collab){
      try{
        await collab.update(params);
        res.status(200).json("Colaborador atualizado com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Colaborador não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const collab: Collaborator | null = await Collaborator.findByPk<Collaborator>(id);

    if(!collab) res.status(404).json('Colaborador não encontrado');
    collab?.destroy();
    res.status(200).json('Colaborador excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Collaborator.findAll<Collaborator>()
      .then((collabs: Array<Collaborator>) => res.json(collabs))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar colaboradores cadastrados.",
                error: err.name
      }));
  }
}