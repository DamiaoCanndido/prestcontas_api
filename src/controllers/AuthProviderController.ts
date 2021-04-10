import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

class AuthProviderController {
    
    async create(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const { email, cpf, password } = request.body;

        if (!password) {
                return response.status(400).json({
                    error: "Algum dado faltando."
                }) 
        }

        const provider = await userRepository.find({ 
            where: [ { email }, { cpf }, {type: "provider"} ] 
        });
        
        if (provider.length <= 0) {
            return response.status(401).json({ error: 'Usuário não existe.' });
        }
        
        const checkPassword = await bcrypt.compare(password, provider[0].password);

        if (!checkPassword) {
            return response.status(401).json({ error: 'Senha não confere.' });
        }

        const { id, name } = provider[0];

        const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIREIN,
        });

        const options = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };

        return response
            .cookie("token", token, options)
            .json({ id, name, email, token }
        );
    }

    async logout(request: Request, response: Response) {
        response.cookie("token", "", 
            { expires: new Date(Date.now() + 1000) }
        ).json({
            message: "Você saiu."
        });
    }
}

export default new AuthProviderController();