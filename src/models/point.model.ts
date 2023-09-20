import mongoose from "mongoose"

interface Point {
 location: {
  name: string,
  placeId: string
 }
}

const pointSchema = new mongoose.Schema<Point>({
 location: {
  name: String,
  placeId: String
 }
});

const PointModel = mongoose.model('Point', pointSchema);

export { Point, PointModel, pointSchema};