import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export function verifyToken(req: Request, res: Response, next: NextFunction){
 const token = req.headers.authorization?.split(' ')[1];
 if(!token) return res.status(401).json({error: "Access denied"});
 try{
 req.verified = jwt.verify(token, process.env.JWT_SECRET_KEY as string);
  next();
 }catch(error){
  res.status(400).json({error: 'Invalid token'});
 }
}