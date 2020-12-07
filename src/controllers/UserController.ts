import  { Request, Response } from 'express';

interface IUser{
  name: string;
  email: string;
  subject?: string;
}

class UserController {
  async register(req: Request, res: Response) {
    return res.json({
      name: 'Denner',
      email: 'dennergazevedo@gmail.com',
    })
  }
}
export default new UserController();