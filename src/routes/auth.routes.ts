import express, { Request, Response } from 'express';
import { User, UserModel } from '../models/user.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new UserModel({
    email: req.body.email,
    password: hashedPassword
  });

  const savedUser = await newUser.save();
  res.json(savedUser);
  
} catch (error: any) {
  res.status(500).send(error);
}
});

router.post('/login', async (req: Request<{},{}, User>, res: Response) => {

  const { email, password } = req.body;
  const user = await UserModel.findOne({email});

  if(!user)
    return res.status(400).json({error: 'Email is wrong'});

  const validPassword = await bcrypt.compare(password, user.password);
  if(!validPassword)
    return res.status(400).json({error: 'Password is wrong'});
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
  const token = jwt.sign(
    {
      email: user.email
    },
    jwtSecretKey
  );

  res.header("auth-token", token).json({
    error: null,
    data: {
      token,
    },
  });

});

export default router;
