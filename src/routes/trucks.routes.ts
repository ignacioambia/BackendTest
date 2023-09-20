import express, { Request, Response } from 'express';
import { TruckModel } from '../models/truck.model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
 try{
  const trucks = await TruckModel.find({});
  res.send(trucks); 
 }catch(error){
  res.status(500).send('Error fetching trucks');
 }
});

export default router;