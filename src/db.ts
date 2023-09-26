import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    const { MONGO_CONNECT } = process.env;
    if(MONGO_CONNECT){
        await mongoose.connect(MONGO_CONNECT);
    }else{
      throw new Error('mongo configuration missing')
    }
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
