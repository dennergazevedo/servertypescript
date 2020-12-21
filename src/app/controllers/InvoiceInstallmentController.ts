import { Request, Response } from "express";
import { InvoiceInstallment, IInvoiceInstallment } from "../models/InvoiceInstallment";

export default class InvoiceInstallmentController {
  async register(req: Request, res: Response) {
    const params: IInvoiceInstallment = req.body;
    await InvoiceInstallment.create<InvoiceInstallment>(params)
      .then((address: InvoiceInstallment) => {
        return res.status(201).json(address)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar parcela, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await InvoiceInstallment.findByPk<InvoiceInstallment>(id)
      .then((address: InvoiceInstallment | null) => {
        if(address){
          res.json(address);
        }else{
          res.status(404).json({ error: "Parcela não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar parcela cadastrado.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IInvoiceInstallment = req.body;
    
    const address: InvoiceInstallment | null = await InvoiceInstallment.findByPk<InvoiceInstallment>(id);

    if(address){
      try{
        await address.update(params);
        res.status(200).json("Parcela atualizada com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Parcela não encontrada." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const address: InvoiceInstallment | null = await InvoiceInstallment.findByPk<InvoiceInstallment>(id);

    if(!address) res.status(404).json('Parcela não encontrada');
    address?.destroy();
    res.status(200).json('Parcela excluida com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await InvoiceInstallment.findAll<InvoiceInstallment>()
      .then((invoiceinstallments: Array<InvoiceInstallment>) => res.json(invoiceinstallments))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar parcelas cadastradas.",
                error: err.name
      }));
  }
}