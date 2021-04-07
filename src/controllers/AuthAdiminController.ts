import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { AdminRepository } from "../repositories/AdminRepository";

class AuthAdminController {
    
    async create(request: Request, response: Response) {
        const adminRepository = getCustomRepository(AdminRepository);
        const { email, password } = request.body;

        if (!email || !password) {
                return response.status(400).json({
                    error: "Algum dado faltando."
                }) 
        }

        const admin = await adminRepository.findOne({email} , {select: ["id", "name", "email", "password"]});
        
        if (!admin) {
            return response.status(401).json({ error: 'Usuário não existe.' });
        }

        const checkPassword = await bcrypt.compare(password, admin.password);

        if (!checkPassword) {
            return response.status(401).json({ error: 'Senha não confere.' });
        }

        const { id, name } = admin;

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

export default new AuthAdminController();