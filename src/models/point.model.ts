import mongoose from "mongoose"
import { Point } from "../types/Point";

const pointSchema = new mongoose.Schema<Point>({
 location: {
  name: String,
  placeId: String
 }
});

const PointModel = mongoose.model('Point', pointSchema);

export { PointModel, pointSchema};