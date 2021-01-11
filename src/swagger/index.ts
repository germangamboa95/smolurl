import { Router } from "express";
import swaggerUi from "swagger-ui-express";
import doc from "./v1.json";

const docs = Router();

docs.use("/docs/api/", swaggerUi.serve, swaggerUi.setup(doc));

export { docs };
