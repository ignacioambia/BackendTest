import express from "express";
import { Document } from 'mongoose'

declare global {
  namespace Express {
    interface Request {
     verified?: string | JwtPayload,
     element?: Document 
    }
  }
 }