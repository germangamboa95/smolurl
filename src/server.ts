import "reflect-metadata";
require("dotenv").config();
import { app as server } from "./app";
import { initDatabase } from "./database";

const boot = async () => {
  await initDatabase();

  server.listen(process.env.PORT, () => {
    console.log("Server started");
  });
};

boot();
