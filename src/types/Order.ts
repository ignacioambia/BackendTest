import { Schema, Types } from "mongoose";

export type OrderType = 'type1' | 'type2' | 'type3';

export enum OrderStatus  {
 Created = 0,
 InProgress =1,
 Finished =2
}

export interface Order {
 route: Schema.Types.ObjectId,
 description: string,
 truck?: Types.ObjectId,
 type: OrderType,
 status: OrderStatus,
 deleted?: boolean
}

