import { EntityRepository, Repository } from "typeorm";
import { Supply } from "../models/Supply";

@EntityRepository(Supply)
class SuppliesRepository extends Repository<Supply>{}

export { SuppliesRepository };