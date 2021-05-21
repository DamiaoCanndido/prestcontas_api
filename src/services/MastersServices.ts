import { getCustomRepository, Repository } from "typeorm";
import { User } from "../models/User";
import { IUserCreate } from "../protocols/UserCreate";
import { UserTypes } from "../protocols/UserTypes";
import { UserRepository } from "../repositories/UserRepository";

class MastersServices {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async index() {
        const users = await this.userRepository.find({where: { type: UserTypes.MASTER }});
        return users;
    }

    async create({ name, email, password, repeatPassword }: IUserCreate, type: UserTypes): Promise<User> {
        const userExists = await this.userRepository.findOne({ email });

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
            password,
        })
        
        await this.userRepository.save(user);

        return user;
    }

    async destroy(id: string) {
        const user = await this.userRepository.findOne({id});
        if (!user) {
            throw new Error("Usuário não existe.")
        }
        await this.userRepository.delete({id});

        return { message: "Usuário deletado." };
    }
}

export { MastersServices };