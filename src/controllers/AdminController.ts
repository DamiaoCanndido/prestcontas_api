import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

class AdminController {

    // Irá para o usuário MASTER...
    
    async index(request: Request, response: Response){
        const userRepository = getCustomRepository(UserRepository);
        const allAdmins = await userRepository.find({ type: "admin" });
        return response.status(200).json(allAdmins);
    }
    

    async create(request: Request, response: Response) {
        const { 
            name, 
            email,
            password,
            repeatPassword
         } = request.body;

         if (!name || 
            !email ||
            !password || 
            !repeatPassword) {
                return response.status(400).json({
                    error: "Algum dado faltando."
                })
        }

        const userRepository = getCustomRepository(UserRepository);
        const adminAlreadyExists = await userRepository.findOne({email});

        if(password !== repeatPassword) {
            return response.status(400).json({
                error: "Senhas diferentes."
            })
        }

        if (adminAlreadyExists) {
            return response.status(400).json({
                error: "Algum dado já foi cadastrado"
            });
        }

        const admin = userRepository.create({
            name,
            email,
            type: "admin",
            password,
        })

        await userRepository.save(admin);

        delete admin.password;

        return response.status(201).json(admin);
    }

    async destroy(request: Request, response: Response) {
        const userRepository = getCustomRepository(UserRepository);
        const { id } = request.params;
        const adminOwner = await userRepository.findOne({id: request.userId});

        if (!adminOwner || request.userType === "master") {
            return response.json({
                error: "Admin não existe."
            })
        }

        await userRepository.delete({ id });
        return response.status(200).json({ message: "Admin deletado." });
    }
}

export default new AdminController();