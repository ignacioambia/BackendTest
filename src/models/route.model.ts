import mongoose, { SchemaDefinition, SchemaDefinitionType, Types } from "mongoose"
import { PointModel } from "./point.model";
import { Route } from "../types/Route";

const routePoint: SchemaDefinition<SchemaDefinitionType<{}>> = {
 type: Types.ObjectId,
 ref: PointModel,
 index: true,
 required: true
}

const routeSchema = new mongoose.Schema<Route>({
 from: routePoint,
 to: routePoint,
 deleted: {
  type: Boolean,
  default: false
 }
});

const RouteModel = mongoose.model('Route', routeSchema);

export { RouteModel, routeSchema };