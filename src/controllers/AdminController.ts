import { Request, Response } from "express";
import { UserTypes } from "../protocols/UserTypes";
import { AdminsServices } from "../services/AdminsServices";

class AdminController {

    // Irá para o usuário MASTER...
    
    async index(request: Request, response: Response){
        const adminsServices = new AdminsServices();
        const allAdmins = await adminsServices.index();
        return response.status(200).json(allAdmins);
    }

    async create(request: Request, response: Response) {
        const { 
            name, 
            email,
            cpf_cnpj,
            password,
            repeatPassword
         } = request.body;

        const adminsServices = new AdminsServices();

        try {
            const user = await adminsServices.create({
                    name,
                    email,
                    cpf_cnpj,
                    password,
                    repeatPassword,
                    masterId: request.userId,
                }, 
                UserTypes.ADMIN,
            )
            return response.status(201).json(user);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
    }

    async destroy(request: Request, response: Response) {
        const { id } = request.params;

        const adminsServices = new AdminsServices();

        try {
            await adminsServices.destroy(id, request.userType);
            return response.status(200).json({ message: "Admin deletado." });
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
    }
}

export default new AdminController();