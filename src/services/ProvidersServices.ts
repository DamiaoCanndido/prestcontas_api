import { getCustomRepository, Repository } from "typeorm";
import generator from "generate-password";
import { User } from "../models/User";
import { IUserCreate } from "../protocols/UserCreate";
import { UserTypes } from "../protocols/UserTypes";
import { UserRepository } from "../repositories/UserRepository";

class ProvidersServices {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async index(adminId: string) {
        const allProviders = await this.userRepository.find({
            where: { type: "provider", admin_id: adminId }
        });
        return allProviders;
    }

    async create({name, adminId, email, cpf_cnpj, phone }: IUserCreate) {
        if (
            !name || 
            !email ||
            !cpf_cnpj || 
            !phone ) {

            throw new Error("Algum dado faltando."); 
        }

        const providerAlreadyExists = await this.userRepository.find({
            where: [
                {email},
                {cpf_cnpj},
                {phone},
            ]
        })

        if(providerAlreadyExists[0]){
            throw new Error("Algum dado já foi cadastrado"); 
        }

        let password = generator.generate({
            length: 6,
            numbers: true,
        })

        const provider = this.userRepository.create({
            name,
            email,
            admin_id: adminId,
            type: UserTypes.PROVIDER,
            cpf_cnpj,
            phone,
            password,
        })

        await this.userRepository.save(provider);

        return { provider, password };
    }
}

export { ProvidersServices };