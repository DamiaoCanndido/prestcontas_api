import { EntityRepository, Repository } from "typeorm";
import { UserBenefited } from "../models/UserBenefited";

@EntityRepository(UserBenefited)
class UserBenefitedRepository extends Repository<UserBenefited> {}

export { UserBenefitedRepository };