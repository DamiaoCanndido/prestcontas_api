import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import generator from "generate-password";
import { UserRepository } from "../repositories/UserRepository";

class ProviderController {

    async index(request: Request, response: Response){
        const usersRepository = getCustomRepository(UserRepository);
        const allProviders = await usersRepository.find({type: "provider"});
        return response.status(200).json(allProviders);
    }

    async create(request: Request, response: Response){
        const { 
            name, 
            email, 
            cpf, 
            phone,
         } = request.body;

        if (
            !name || 
            !email || 
            !cpf || 
            !phone ) {

                return response.status(400).json({
                    error: "Algum dado faltando."
                }) 
        }
        
        const usersRepository = getCustomRepository(UserRepository);

        const providerAlreadyExists = await usersRepository.find({
            where: [
                {email},
                {cpf},
                {phone},
            ]
        })

        if(providerAlreadyExists[0]){
            return response.status(400).json({
                error: "Algum dado já foi cadastrado"
            }) 
        }

        let password = generator.generate({
            length: 6,
            numbers: true,
        })

        const provider = usersRepository.create({
            name,
            email,
            type: "provider",
            cpf,
            phone,
            password,
        })

        await usersRepository.save(provider);

        return response.status(201).json(provider);
    }

    async destroy(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UserRepository);
        const { id } = request.params;
        const provider = await usersRepository.findOne({id: request.userId});

        if (!provider || request.userType !== "admin") {
            return response.json({
                error: "Você não pode fazer isso."
            })
        }

        await usersRepository.delete({ id });
        return response.status(200).json(provider);
    }
} 

export default new ProviderController();