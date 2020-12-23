import { Request, Response } from "express";

/** Transporter NodeMailer */
import transporter from '../modules/mailer';

export default class MailController {
  async contactMail(req: Request, res: Response) {
    const { name, email, phone, subject, message } = req.body;

    const mailOptions = {
      from: email,
      to: 'suporte@artcopias.com.br',
      subject: `Site: ${subject}`,
      html: `<b>Nome</b>: ${name}<br/>
      <b>Phone</b>: ${phone}<br/>
      <b>Mensagem</b>: <br/>
      <i>${message}</i>`,
    };

    transporter.sendMail(mailOptions, function(error: Error|null, info: any) {
      if (error) {
        res.status(400).json({ error: 'E-mail não enviado' });
      } else {
        res.status(200).json(`Email enviado: ${info.response}`);
      }
    });
  }

  async sendCurriculum(req: Request, res: Response) {
    const { pathName } = req.body;
    const extesion = pathName.split('.');

    const mailOptions = {
      from: 'no-reply@artcopias.com.br',
      to: 'gerencia.vendas@artcopias.com.br',
      subject: `[ArtCópias] Currículo`,
      attachments: [
        {
          filename: `CURRICULO.${extesion[1]}`,
          path: `src/tmp/uploads/${pathName}`,
        },
      ],
      html: `<p>CURRÍCULO ENVIADO PELO SITE.</p>`,
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        res.status(400).json({ error: 'E-mail não enviado' });
      } else {
        res.status(200).json(`Email enviado: ${info.response}`);
      }
    });
  }
}