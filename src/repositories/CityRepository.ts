import { EntityRepository, Repository } from "typeorm";
import { City } from "../models/City";

@EntityRepository(City)
class CityRepository extends Repository<City> {}

export { CityRepository };