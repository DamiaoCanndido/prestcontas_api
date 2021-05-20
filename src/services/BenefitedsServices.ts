import { getCustomRepository, Repository } from "typeorm";
import { Benefited } from "../models/Benefited";
import { User } from "../models/User";
import { Zone } from "../models/Zone";
import { IBenefitedCreate } from "../protocols/BenefitedCreate";
import { BenefitedRepository } from "../repositories/BenefitedsRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ZoneRepository } from "../repositories/ZoneRepository";

class BenefitedsServices {
    private benefitedRepository: Repository<Benefited>;
    private zoneRepository: Repository<Zone>;
    private userRepository: Repository<User>;

    constructor() {
        this.benefitedRepository = getCustomRepository(BenefitedRepository);
        this.zoneRepository = getCustomRepository(ZoneRepository);
        this.userRepository = getCustomRepository(UserRepository);
    }

    async index() {
        const allBenefiteds = await this.benefitedRepository.find();
        return allBenefiteds;
    }

    async myBenefiteds(id: string) {
        const myBenefiteds = await this.benefitedRepository.find({
            where: { user_id: id },
            relations: ["zone", "user"] 
        })
        return myBenefiteds;
    }

    async create({ id, name, cpf, phone, number, zone_id, latitude, longitude }: IBenefitedCreate) {
        if (
            !name ||
            !cpf ||
            !zone_id ||
            !latitude ||
            !longitude) {
                
                throw new Error("Algum dado faltando.");
            }

        const zone = await this.zoneRepository.find({ admin_id: id });
        const user = await this.userRepository.find({ id });

        if (!zone) {
            throw new Error("Localidade não existe.");
        }

        if (!user) {
            throw new Error("Usuário não existe.") 
        }

        const benefitedAlreadyExists = await this.benefitedRepository.find({
            where: [
                {cpf},
                {phone},
            ]
        })

        if(benefitedAlreadyExists[0]){ 
            throw new Error("Algum dado já foi cadastrado");
        }

        const benefited = this.benefitedRepository.create({
            name, 
            cpf,
            phone,
            number,
            zone_id,
            user_id: id,
            latitude,
            longitude,
        })

        await this.benefitedRepository.save(benefited);

        return benefited;
    }

    async update(id?: string, name?: string, cpf?: string, phone?: string) {
        const benefitedAlreadyExists = await this.benefitedRepository.find({
            where: [
                {cpf},
                {phone},
            ]
        });

        if(benefitedAlreadyExists[0]){
            throw new Error("Algum dado já foi cadastrado");
        }

        await this.benefitedRepository.update(id, { name, cpf, phone });
        const benefited = await this.benefitedRepository.findOne({ id });

        return benefited;
    }  
    
    async destroy(id: string) {
        const benefited = await this.benefitedRepository.findOne({id});

        if (!benefited) {
            throw new Error("Beneficiário não existe.");
        }

        await this.benefitedRepository.delete({ id });

        return { message: "Beneficiário deletado." }
    }
    
}

export { BenefitedsServices }