import { ApplicationServer } from "./app";
import { initDatabase } from "./database";


const port = process.env.PORT ? +process.env.PORT : 8080

const boot = async () => {
  await initDatabase();

  const server = new ApplicationServer()

  server.start(port)
};

boot();
