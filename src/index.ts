import express, { Request, Response } from "express";
import "dotenv/config";
import { connectToDatabase } from "./db";

const app = express();

app.use(express.json());

import authRoute from "./auth/auth.routes";
app.use("/auth", authRoute);

connectToDatabase().then(() => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log("Listening to port", port);
  });
});
