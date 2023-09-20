import mongoose from "mongoose"

interface Truck {

model: string,
make: string,
year: number,
color: string,
transportWeight: number,
created_at: Date
}

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

export { Truck, TruckModel, truckSchema};