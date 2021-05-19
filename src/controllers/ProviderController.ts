import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import generator from "generate-password";
import { UserRepository } from "../repositories/UserRepository";
import { UserTypes } from "../protocols/UserTypes";
import { ProvidersServices } from "../services/ProvidersServices";

class ProviderController {

    // admin view yours providers
    async index(request: Request, response: Response){
        // const usersRepository = getCustomRepository(UserRepository);
        const providersServices = new ProvidersServices();
        const allProviders = await providersServices.index(request.userId);
        return response.json(allProviders);
    }

    // admin, provider view one provider
    async show(request: Request, response: Response){
        const { id } = request.params;
        console.log(request.userId)
        const usersRepository = getCustomRepository(UserRepository);
        const allProviders = await usersRepository
            .find(
                {where: {id, type: "provider", admin_id: request.userId }, 
                relations: ["vehicles", "zones", "zones.benefiteds"]}
            );
        return response.status(200).json(allProviders);
    }

    // admin create provider
    async create(request: Request, response: Response){
        const providersServices = new ProvidersServices();

        const { 
            name, 
            email, 
            cpf_cnpj,
            phone,
         } = request.body;

        try {
            const provider = await providersServices.create({
                name, 
                email, 
                adminId: request.userId, 
                cpf_cnpj, 
                phone
            })

            return response.status(201).json(provider);
        } catch (err) {
            return response.status(400)
                .json({ 
                    error: err.message 
                });
        }
    }

    // admin delete one provider
    async destroy(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UserRepository);
        const { id } = request.params;
        const providerOwner = await usersRepository.findOne({id: request.userId});

        if (providerOwner.id !== request.userId) { 
            return response.json({
                error: "Você não pode fazer isso."
            })
        }

        await usersRepository.delete({ id });
        return response.status(200).json({ message: "Fornecedor deletado." });
    }
} 

export default new ProviderController();