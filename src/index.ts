import express, { Request, Response } from "express";
import testRoute from "./routes/test.routes";
import "dotenv/config";

const { MONGO_USERNAME, MONGO_PASSWORD } = process.env;

const app = express();

const port = process.env.PORT || 3000;

app.use("/contact", testRoute);

app.get("/test", (request: Request, response: Response) => {
  response.send("Hola mundo!" + MONGO_USERNAME + MONGO_PASSWORD);
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
