import express, { Request, Response } from "express";
import "dotenv/config";
import { connectToDatabase } from "./db";
import { verifyToken } from "./middlewares/auth.middleware";

const app = express();

app.use(express.json());

import authRoute from "./routes/auth.routes";
app.use("/auth", authRoute);

connectToDatabase().then(() => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log("Listening to port", port);
  });
});
