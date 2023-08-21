import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    const { MONGO_USERNAME, MONGO_PASSWORD, ENV } = process.env;
    await mongoose.connect(
      `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ow41zyc.mongodb.net/${ENV}`
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}
