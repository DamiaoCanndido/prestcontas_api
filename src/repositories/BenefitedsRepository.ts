import { EntityRepository, Repository } from "typeorm";
import { Benefited } from "../models/Benefited";

@EntityRepository(Benefited)
class BenefitedRepository extends Repository<Benefited> {}

export { BenefitedRepository };