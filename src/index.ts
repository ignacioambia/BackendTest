import express, { Request, Response } from "express";
import testRoute from "./routes/test.routes";
import "dotenv/config";
import { connectToDatabase } from "./db";

const app = express();

app.use("/contact", testRoute);

app.get("/test", (request: Request, response: Response) => {
  response.send("Hola mundo!");
});

connectToDatabase().then(() => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log("Listening to port", port);
  });
});
