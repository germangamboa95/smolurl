import axios from "axios";

export const fireWebhook = async <T>(endpoint: string, payload: T) => {
  await axios.post(endpoint, payload);
};
