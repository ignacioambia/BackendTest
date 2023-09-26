import express, { Request, Response } from 'express';
import { PointModel } from '../models/point.model';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
 try{
  const points = await PointModel.find({});
  res.send(points); 
 }catch(error){
  res.status(500).send('Error fetching points');
 }
});

export default router;