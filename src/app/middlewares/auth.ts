import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { Request, Response, NextFunction, RequestHandler } from 'express';

import authConfig from '../../config/auth';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers["auth"];
  let jwtPayload;

  try {
    jwtPayload = <any>jwt.verify(token, authConfig.secret);
    res.locals.jwtPayload = jwtPayload;
  } catch (error) {
    res.status(401).send('Token não autorizado');
    return;
  }

  try {
    const decoded = <any>await promisify(jwt.verify)(token, authConfig.secret);
    jwtPayload.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token Inválido' });
  }
};
