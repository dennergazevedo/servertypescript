import { Request, Response } from "express";
import { Slideshow, ISlideshow } from "../models/Slideshow";

export default class SlideshowController {
  async register(req: Request, res: Response) {
    const params: ISlideshow = req.body;
    await Slideshow.create<Slideshow>(params)
      .then((address: Slideshow) => {
        return res.status(201).json(address)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar slideshow, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Slideshow.findByPk<Slideshow>(id)
      .then((address: Slideshow | null) => {
        if(address){
          res.json(address);
        }else{
          res.status(404).json({ error: "Slideshow não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar slideshow cadastrado.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: ISlideshow = req.body;
    
    const address: Slideshow | null = await Slideshow.findByPk<Slideshow>(id);

    if(address){
      try{
        await address.update(params);
        res.status(200).json("Slideshow atualizado com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Slideshow não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const address: Slideshow | null = await Slideshow.findByPk<Slideshow>(id);

    if(!address) res.status(404).json('Slideshow não encontrado');
    address?.destroy();
    res.status(200).json('Slideshow excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Slideshow.findAll<Slideshow>()
      .then((slideshows: Array<Slideshow>) => res.json(slideshows))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar slideshows cadastrados.",
                error: err.name
      }));
  }
}