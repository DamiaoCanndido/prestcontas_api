import { EntityRepository, Repository } from "typeorm";
import { UserZone } from "../models/UserZone";

@EntityRepository(UserZone)
class UserZoneRepository extends Repository<UserZone>{}

export { UserZoneRepository };