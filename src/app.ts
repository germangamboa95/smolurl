import express from "express";
import api from "./api";
import { docs } from "./swagger";
import web from "./web";

const app = express();

app.set("view engine", "ejs");

app.use(express.json());

app.use(web);
app.use(api);
// app.use(docs);
api.use(function (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (err.name === "EntityNotFound") {
    return res.status(404).json({ message: "Resource missing." });
  }

  res.status(500).send("Something broke!");
});

export { app };
