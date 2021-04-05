import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import generator from "generate-password";
import { ProviderRepository } from "../repositories/ProvidersRepository";

class ProviderController {

    async index(request: Request, response: Response){
        const providersRepository = getCustomRepository(ProviderRepository);
        const allProviders = await providersRepository.find({relations:["zones"]});
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
        
        const providersRepository = getCustomRepository(ProviderRepository);

        const providerAlreadyExists = await providersRepository.find({
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

        const provider = providersRepository.create({
            name,
            email,
            cpf,
            phone,
            password,
        })

        await providersRepository.save(provider);

        return response.status(201).json(provider);
    }

    async destroy(request: Request, response: Response) {
        const providersRepository = getCustomRepository(ProviderRepository);
        const { id } = request.params;
        const provider = await providersRepository.findOne({id});

        if (!provider || request.userType !== "admin") {
            return response.json({
                error: "Você não pode fazer isso."
            })
        }

        await providersRepository.delete({ id });
        return response.status(200).json(provider);
    }
} 

export default new ProviderController();