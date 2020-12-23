import nodemailer from 'nodemailer';
import config from '../../config/mail';

const transporter = nodemailer.createTransport({
  host: `${config.host}`,
  port: 25,
  secure: false,
  auth: {
    user: `${config.user}`,
    pass: `${config.pass}`,
  },
  tls: { rejectUnauthorized: false },
});

export default transporter;
