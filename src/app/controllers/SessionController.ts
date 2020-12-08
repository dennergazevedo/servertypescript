import { Request, Response } from "express";
import { Client, checkPassword } from "../models/Client";
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

export default class SessionController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const cliente: Client | null = await Client.findOne<Client>({ where: { email } });

    if (!cliente) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const auth = await checkPassword(<string>password, <string>cliente.password);
    console.log(auth);

    if (!auth) {
      return res.status(401).json({ error: 'Password Inválido!' });
    }

    const { id, name, document, phone } = cliente;

    const tokenJwt: string = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    cliente.update({
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
  }
}