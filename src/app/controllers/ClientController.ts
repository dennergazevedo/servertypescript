import { Request, Response } from "express";
import { Client, IClient, checkPassword } from "../models/Client";
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

/** Transporter NodeMailer */
import transporter from '../modules/mailer';

export default class ClientController {
  async register(req: Request, res: Response) {
    const params: IClient = req.body;
    console.log(params);
    await Client.create<Client>(params)
      .then((client: Client) => {
        return res.status(201).json(client)
      })
      .catch((err: Error) => {
        return res.status(500).json({ 
          message: "Falha ao cadastrar cliente, verifique os dados!",
          error: err.name,
        })
      });
  }

  async search(req: Request, res: Response) {
    const { id } = req.params;
    await Client.findByPk<Client>(id)
      .then((client: Client | null) => {
        if(client){
          res.json(client);
        }else{
          res.status(404).json({ error: "Cliente não encontrado." });
        }
      })
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar cliente cadastrado.",
                error: err.name
      }));
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const params: IClient = req.body;
    
    const client: Client | null = await Client.findByPk<Client>(id);

    if(client){
      try{
        await client.update(params);
        res.status(200).json("Cliente atualizado com sucesso!");
      }catch(err){
        res.status(500).json({ error: err });
      }
    }else{
      res.status(404).json({ error: "Cliente não encontrado." });
    }
  }

  async updatePassword(req: Request, res: Response) {
    const { id } = req.params;
    const params: IClient = req.body;
    
    const client: Client | null = await Client.findByPk<Client>(id);

    if(client){
      if(params.oldPassword && params.password && await checkPassword(params.oldPassword, client.password)){
        try{
          const hash = await bcrypt.hash(params.password, 10);
          client.update({
            password: hash,
          })
          res.status(200).json("Senha atualizada com sucesso!");
        } catch(err){
          res.status(500).json({ error: err });
        }
      }else{
        res.status(401).json({ error: "A senha antiga não confere!" });
      }
    }else{
      res.status(404).json({ error: "Cliente não encontrado." });
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    const cliente: Client | null = await Client.findByPk<Client>(id);

    if(!cliente) res.status(404).json('Cliente não encontrado');
    cliente?.destroy();
    res.status(200).json('Cliente excluido com sucesso!');
  }

  async searchAll(req: Request, res: Response) {
    await Client.findAll<Client>()
      .then((clients: Array<Client>) => res.json(clients))
      .catch((err: Error) => res.status(500).json({
                message: "Falha ao localizar clientes cadastrados.",
                error: err.name
      }));
  }

  async forgotPassword(req: Request, res: Response) {
    const { email } = req.body;

    const user = await Client.findOne<Client>({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    user.update({
      reset_pass: token,
      reset_expires: now,
    })

    const mailOptions = {
      from: 'no-reply@artcopias.com.br',
      to: email,
      subject: `[ArtCópias] Esqueci minha senha`,
      html: `
      <h1 style="color: #5e9ca0; text-align: center;"><span style="color: #00ccff;">Recupera&ccedil;&atilde;o de Senha</span></h1>
      <p>Uma&nbsp;solicita&ccedil;&atilde;o&nbsp;de&nbsp;recupera&ccedil;&atilde;o&nbsp;de&nbsp;senha&nbsp;foi&nbsp;realizada&nbsp;para&nbsp;sua&nbsp;conta&nbsp;em&nbsp;nosso&nbsp;site. <br /> <br /> <strong>Se voc&ecirc; n&atilde;o foi o autor, apenas descarte este e-mail.</strong> <br /> <br /> Para continuar a recupera&ccedil;&atilde;o de senha, clique no bot&atilde;o abaixo e crie uma nova senha! <br /> <br /> <br /> <em>Ah, esse link expira em 1 hora!</em> <br /> <br /> <br /> <strong>Abra&ccedil;o!</strong> <br /> <br /> <strong>Equipe ArtC&oacute;pias!</strong></p>
      <p>&nbsp;</p>
      <table style="height: 51px; margin-left: auto; margin-right: auto;" width="211">
      <tbody>
      <tr>
      <td style="width: 201px; height: 50px; background-color: #00ccff; border-radius: 10px; text-align: center;"><a style="color: #fff;" href="https://www.artcopias.com.br/reset-password/${email}/${token}">Criar nova senha</a></td>
      </tr>
      </tbody>
      </table>`,
    };

    transporter.sendMail(mailOptions, function(error: Error|null, info: any) {
      if (error) {
        res.status(400).json({ error: 'E-mail não enviado' });
      } else {
        res.status(200).json(`Email enviado: ${info.response}`);
      }
    });
  return res.send();
  }
}