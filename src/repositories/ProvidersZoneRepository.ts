import { EntityRepository, Repository } from "typeorm";
import { ProviderZone } from "../models/ProviderZone";

@EntityRepository(ProviderZone)
class ProviderZoneRepository extends Repository<ProviderZone>{}

export { ProviderZoneRepository };