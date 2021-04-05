import { EntityRepository, Repository } from "typeorm";
import { Admin } from "../models/Admin";

@EntityRepository(Admin)
class AdminRepository extends Repository<Admin>{}

export { AdminRepository };