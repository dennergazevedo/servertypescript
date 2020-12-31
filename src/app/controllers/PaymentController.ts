import { Request, Response } from "express";
const MktPago = require('mercadopago');
const crypto = require('crypto');
const axios = require('axios');

export default class PaymentController {
  async mercadoPago(req: Request, res: Response) {
    const { id, email, title, description, price } = req.body;

    // START CRYPT
    function criptografar(senha: string) {
      const mykey = crypto.createCipher('aes-128-cbc', process.env.DEC);
      let mystr = mykey.update(senha, 'utf8', 'hex');
      mystr += mykey.final('hex');
      return mystr;
    }
    const senhaCript = criptografar(id);
    // END CRYPT

    // START MKTPAGO
    MktPago.configure({
      sandbox: true,
      access_token: process.env.MKTTOKEN,
    });

    let item;
    const purchaseOrder = {
      items: [
        (item = {
          id,
          title,
          description,
          quantity: 1,
          currency_id: 'BRL',
          unit_price: parseFloat(price),
        }),
      ],
      payer: {
        email,
      },
      auto_return: 'all',
      external_reference: '0001',
      back_urls: {
        success: `https://artcopias.com.br/payment-success/${senhaCript}`,
        pending: `https://artcopias.com.br/payment-pending/${senhaCript}`,
        failure: `https://artcopias.com.br/payment-denied/${senhaCript}`,
      },
    };

    try {
      const preference = await MktPago.preferences.create(purchaseOrder);
      return res.json(`${preference.body.init_point}`);
    } catch (err) {
      return res.send(err.message);
    }
  }

  async cielo(req: Request, res: Response) {
    try {
      const {
        orderNumber,
        price,
        cep,
        fretePrice,
        cpf,
        nome,
        email,
        phone,
      } = req.body;
      console.log(req.body);

      let numCep: string = cep;
      numCep = numCep.replace('.', '');
      numCep = numCep.replace('-', '');

      let intCPF = cpf.replace('.', '');
      intCPF = intCPF.replace('.', '');
      intCPF = intCPF.replace('-', '');

      let intPhone = phone.replace('(', '');
      intPhone = intPhone.replace(')', '');
      intPhone = intPhone.replace(' ', '');
      intPhone = intPhone.replace('-', '');

      console.log(numCep);
      console.log(intCPF);
      console.log(intPhone);

      const result = await axios.post(
        'https://cieloecommerce.cielo.com.br/api/public/v1/orders',
        {
          OrderNumber: parseInt(orderNumber, 10),
          SoftDescriptor: 'ArtCopias',
          Cart: {
            Items: [
              {
                Name: `Pedido 0000${orderNumber}`,
                Description: 'Produto Personalizado',
                UnitPrice: parseInt(price, 10),
                Quantity: 1,
                Type: 'Asset',
                Sku: 'ABC001',
                Weight: 500,
              },
            ],
          },
          Shipping: {
            SourceZipCode: '35930004',
            TargetZipCode: parseInt(numCep, 10),
            Type: 'FixedAmount',
            Services: [
              {
                Name: 'Correios',
                Price: parseInt(fretePrice, 10),
                Deadline: 15,
              },
            ],
          },
          Customer: {
            Identity: parseInt(intCPF, 10),
            FullName: nome,
            Email: email,
            Phone: parseInt(intPhone, 10),
          },
          Options: {
            AntifraudEnabled: true,
            ReturnUrl: `https://artcopias.com.br/cielo-success/${orderNumber}`,
          },
        },
        {
          headers: {
            MerchantId: process.env.CIELOID,
            contentType: 'application/json',
          },
        }
      );
      res.status(200).json(result.data.settings.checkoutUrl);
    } catch (err) {
      res.status(400).json('ERRO');
    }
  }
}