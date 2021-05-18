import { getCustomRepository, Repository } from "typeorm";
import { User } from "../models/User";
import { IUserCreate } from "../protocols/UserCreate";
import { UserTypes } from "../protocols/UserTypes";
import { UserRepository } from "../repositories/UserRepository";

class AdminsServices {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async index() {
        const allAdmins = await this.userRepository.find({ type: UserTypes.ADMIN });
        return allAdmins;
    }

    async create({ name, email, cpf_cnpj, password, repeatPassword }: IUserCreate, type: UserTypes): Promise<User> {
        const userExists = await this.userRepository.findOne({ email });

        if (!name || 
            !email ||
            !cpf_cnpj ||
            !password || 
            !repeatPassword) {
                throw new Error("Dados faltando."); 
        }

        if (userExists) {
            throw new Error("Usuário já existe.");
        }

        if (password !== repeatPassword) {
            throw new Error("Senhas não conferem.");
        }

        const user = this.userRepository.create({
            name,
            email,
            type,
            cpf_cnpj,
            password,
        })
        
        await this.userRepository.save(user);

        return user;
    }

    async destroy(id: string, userType: string) {
        const adminOwner = await this.userRepository.findOne({id});

        if (!adminOwner || userType !== "master") {
            throw new Error("Admin não existe.");
        }

        await this.userRepository.delete(id);

        return { message: "Admin deletado." };
    }
}

export { AdminsServices };