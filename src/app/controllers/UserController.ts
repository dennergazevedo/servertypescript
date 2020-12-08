import  { Request, Response } from 'express';

interface IUser{
  name: string;
  email: string;
  subject?: string;
}

class UserController {
  async register(req: Request, res: Response) {
    const { email } = req.params;
    return res.json(email)
  }
}
export default new UserController();