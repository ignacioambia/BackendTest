import express, { Request, Response } from "express";
import testRoute from "./routes/test.routes";

const app = express();

const port = process.env.PORT || 3000;


app.use('/contact', testRoute);

app.get("/test", (request: Request, response: Response) => {
  response.send("Hola mundo!");
});

app.listen(port, () => {
  console.log("Listening to port", port);
});
