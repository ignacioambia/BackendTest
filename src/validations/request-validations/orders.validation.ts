import Joi from "joi";
import { Order } from "../../types/Order";
import { RequestValidation } from "../../types/RequestValidation";
import { CustomJoi } from "../joi-extensions";

const typeValidation= Joi.string().valid('type1', 'type2', 'type3');

export const singleOrderParams = CustomJoi.object({
 id: CustomJoi.objectId().required()
});

export const newOrder: RequestValidation = {
 payload: CustomJoi.object<Order>({
  route: CustomJoi.objectId().required(),
  description: Joi.string().min(3).max(100).required(),
  type:  typeValidation.required(),
 })
};

export const getSingleOrder: RequestValidation = {
 params: singleOrderParams
};

export const assignTruck: RequestValidation = {
 params: singleOrderParams,
 payload: CustomJoi.object({
   id_truck: CustomJoi.objectId().required()
  })
};

export const editTruck: RequestValidation = {
 params: singleOrderParams,
 payload: CustomJoi.object({
  route: CustomJoi.objectId(),
  description: CustomJoi.string(),
  type: typeValidation
 }).or('route', 'description', 'type')
};