import { Link } from "./link.model";
import { getRepository } from "typeorm";

export const LinkRepository = () => getRepository(Link);
