import { EntityRepository, Repository } from "typeorm";
import { Provider } from "../models/Provider";

@EntityRepository(Provider)
class ProviderRepository extends Repository<Provider>{}

export { ProviderRepository };