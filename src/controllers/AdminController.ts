import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AdminRepository } from "../repositories/AdminRepository";

class AdminController {

    async index(request: Request, response: Response){
        const adminRepository = getCustomRepository(AdminRepository);
        const allAdmins = await adminRepository.find();
        allAdmins.map((adm) => {
            delete adm.password;
        })
        return response.status(200).json(allAdmins);
    }

    async create(request: Request, response: Response) {
        const { 
            name, 
            email,
            password,
            repeatPassword
         } = request.body;

         if (
            !name || 
            !email || 
            !password || 
            !repeatPassword) {
                return response.status(400).json({
                    error: "Algum dado faltando."
                })
        }

        const adminRepository = getCustomRepository(AdminRepository);
        const adminAlreadyExists = await adminRepository.findOne({email});

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

        const admin = adminRepository.create({
            name,
            email,
            password,
        })

        await adminRepository.save(admin);

        delete admin.password;

        return response.status(201).json(admin);
    }

    async destroy(request: Request, response: Response) {
        const adminRepository = getCustomRepository(AdminRepository);
        const { id } = request.params;
        const admin = await adminRepository.findOne({id: request.userId});

        if (!admin) {
            return response.json({
                error: "Admin não existe."
            })
        }

        await adminRepository.delete({ id });
        return response.status(200).json(admin);
    }
}

export default new AdminController();