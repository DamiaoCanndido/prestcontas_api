import { EntityRepository, Repository } from "typeorm";
import { District } from "../models/District";

@EntityRepository(District)
class DistrictRepository extends Repository<District> {}

export { DistrictRepository };