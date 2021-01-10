import { Link } from "./link.model";
import { getRepository } from "typeorm";
import { Hit } from "./hit.model";

export const LinkRepository = () => getRepository(Link);

export const HitRepository = () => getRepository(Hit);
