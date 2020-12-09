import { Request, Response } from "express";
import { Invoice, IInvoice } from "../models/Invoice";

export default class InvoiceController {
  async register(req: Request, res: Response) {
    const params: IInvoice = req.body;
    await Invoice.create<Invoice>(params)
      .then((invoice: Invoice) => {
        return res.status(201).json(invoice)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar fatura, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Invoice.findByPk<Invoice>(id)
      .then((invoice: Invoice | null) => {
        if(invoice){
          res.json(invoice);
        }else{
          res.status(404).json({ error: "fatura não encontrada." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar fatura.",
                error: err.name
      }));
  }
  
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IInvoice = req.body;
    
    const invoice: Invoice | null = await Invoice.findByPk<Invoice>(id);

    if(invoice){
      try{
        await invoice.update(params);
        res.status(200).json("Fatura atualizada com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Fatura não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const invoice: Invoice | null = await Invoice.findByPk<Invoice>(id);

    if(!invoice) res.status(404).json('Fatura não encontrado');
    invoice?.destroy();
    res.status(200).json('Fatura excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Invoice.findAll<Invoice>({
      where: { active: 1 },
    })
      .then((invoices: Array<Invoice>) => res.json(invoices))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar fatura.",
                error: err.name
      }));
  }
}