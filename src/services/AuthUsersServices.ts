import { getCustomRepository, Repository } from "typeorm";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User } from "../models/User";
import { UserRepository } from "../repositories/UserRepository";

class AuthUsersServices {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getCustomRepository(UserRepository);
    }

    async create(email: string, password: string) {

        if (!email || !password) {
            throw new Error("Algum dado faltando.");
        }

        const user = await this.userRepository.findOne(
            {email}, 
            {select: ["id", "name", "email", "type", "password"]}
        );
        
        if (!user) {
            throw new Error("Usuário não existe.");
        }

        const checkPassword = await bcrypt.compare(password, user.password);

        if (!checkPassword) {
            throw new Error("Senha não confere.");
        }

        const { id, name, type } = user;

        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIREIN,
        });

        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };

        return { id, name, email, type, token, options };
    }
}

export { AuthUsersServices };