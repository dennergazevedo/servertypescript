import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';
import { Client, checkPassword } from "../models/Client";
import { Collaborator } from "../models/Collaborator";

export default class SessionController {
  async verifyToken(req: Request, res: Response) {
    res.status(200).json('Token Válido');
  }

  async loginClient(req: Request, res: Response) {
    if(authConfig.secret){
      const { email, password } = req.body;

    const cliente: Client | null = await Client.findOne<Client>({ where: { email } });

    if (!cliente) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const auth = await checkPassword(<string>password, <string>cliente.password);

    if (!auth) {
      return res.status(401).json({ error: 'Password Inválido!' });
    }

    const { id, name, provider, address_id } = cliente;

    const tokenJwt: string = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({
      user: {
        id,
        name,
        email,
        provider,
        address_id,
      },
      token: tokenJwt,
    });
    }else{
      return res.status(401).json({ error: "authConfig Secret Not Found"})
    }
  }

  async loginCollab(req: Request, res: Response) {
    if(authConfig.secret){
      const { email, password } = req.body;

    const collab: Collaborator | null = await Collaborator.findOne<Collaborator>({ where: { email } });

    if (!collab) {
      return res.status(401).json({ error: 'Colaborador não encontrado' });
    }

    const auth = await checkPassword(<string>password, <string>collab.password);

    if (!auth) {
      return res.status(401).json({ error: 'Password Inválido!' });
    }

    const { id, name, document, phone } = collab;

    const tokenJwt: string = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    collab.update({
      token: tokenJwt,
    })

    return res.json({
      user: {
        id,
        name,
        phone,
        document,
        email,
      },
      token: tokenJwt,
    });
  }else{
    return res.status(401).json({ error: "authConfig Secret Not Found"})
  }
}
}