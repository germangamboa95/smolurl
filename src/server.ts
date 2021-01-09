import "reflect-metadata";
require("dotenv").config();
import app from "./api";
import { initDatabase } from "./database";
import { LinkRepository } from "./links/link.repository";

const boot = async () => {
  await initDatabase();

  const server = await app();
  server.listen(process.env.PORT, () => {
    console.log("Server started");
  });
};

boot();
