import express, { Request, Response } from 'express';
import { User, UserModel, userSchema } from './user.model';

const router = express.Router();

router.post('/register', async (req: Request<{},{}, User>, res: Response) => {
 try {

  try{
    const user = new UserModel(req.body);
    await user.validate();
  }catch(error){
    res.status(400).send(error);
    return;
  }

  const newUser = new UserModel(req.body);
  const savedUser = await newUser.save();
  res.json(savedUser);
  
} catch (error: any) {
  res.status(500).send(error);
}
});

export default router;
