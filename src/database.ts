import { createConnection, getConnectionOptions } from "typeorm";

export const initDatabase = async () => {
  const options = await getConnectionOptions();
  return createConnection(options);
};
