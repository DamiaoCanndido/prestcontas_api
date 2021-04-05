import { EntityRepository, Repository } from "typeorm";
import { Street } from "../models/Street";

@EntityRepository(Street)
class StreetRepository extends Repository<Street> {}

export { StreetRepository };