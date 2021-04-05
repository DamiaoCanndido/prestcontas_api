import { EntityRepository, Repository } from "typeorm";
import { Zone } from "../models/Zone";

@EntityRepository(Zone)
class ZoneRepository extends Repository<Zone> {}

export { ZoneRepository };