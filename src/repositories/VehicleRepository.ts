import { EntityRepository, Repository } from "typeorm";
import { Vehicle } from "../models/Vehicle";

@EntityRepository(Vehicle)
class VehicleRepository extends Repository<Vehicle> {}

export { VehicleRepository };