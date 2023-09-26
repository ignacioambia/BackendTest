import mongoose from "mongoose"
import { Truck } from "../types/Truck";

const truckSchema = new mongoose.Schema<Truck>({
 model: String,
 make: String,
 year: Number,
 color: String,
 transportWeight: Number,
 created_at: {
  type: Date,
  default: Date.now
 }
});

const TruckModel = mongoose.model('Truck', truckSchema);

export { TruckModel, truckSchema};