import mongoose, { SchemaDefinition, SchemaDefinitionType, Types } from "mongoose"
import { Order, OrderStatus } from "../types/Order";

const orderSchema = new mongoose.Schema<Order>({
 route: {
  type: Types.ObjectId,
  required: true,
 },
 description: {
  type: String,
  required: true
 },
 truck: Types.ObjectId,
 type: {
  type: String,
  enum: ['type1','type2','type3'],
  required: true
 },
 status: {
  type: Number,
  enum: Object.values(OrderStatus).filter((e)=> typeof e == 'number' ), // Enum validation
  default: OrderStatus.Created, // Default value
},
deleted: {
  type: Boolean,
  default: false
 }
});

const OrderModel = mongoose.model('Order', orderSchema);

export { OrderModel, orderSchema };