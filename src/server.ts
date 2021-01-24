import { ApplicationServer } from "./app";
import { initDatabase } from "./database";




const boot = async () => {
  await initDatabase();

  const server = new ApplicationServer()

  server.start(8080)
};

boot();
