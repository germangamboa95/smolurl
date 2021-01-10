import { createConnection, getConnectionOptions } from "typeorm";

export const initDatabase = async () => {
  const conn = process.env.CONNECTION_NAME;

  const options = await getConnectionOptions(conn);
  console.log(options);
  return createConnection({ ...options, name: "default" });
};
