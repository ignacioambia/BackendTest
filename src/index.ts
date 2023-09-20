import express, { Request, Response } from "express";
import "dotenv/config";
import { connectToDatabase } from "./db";
import { verifyToken } from "./middlewares/auth.middleware";

//Routes
import authRoute from "./routes/auth.routes";
import truckRoute from "./routes/trucks.routes";
import pointsRoute from './routes/points.routes'

const app = express();

app.use(express.json());

app.use("/auth", authRoute);
app.use("/trucks",verifyToken,truckRoute );
app.use("/points",verifyToken,pointsRoute );

connectToDatabase().then(() => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log("Listening to port", port);
  });
});
