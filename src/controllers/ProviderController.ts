import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import generator from "generate-password";
import { UserRepository } from "../repositories/UserRepository";

class ProviderController {

    // admin view yours providers
    async index(request: Request, response: Response){
        const usersRepository = getCustomRepository(UserRepository);
        const allProviders = await usersRepository.find({
            where: { type: "provider", admin_id: request.userId }
        });
        return response.status(200).json(allProviders);
    }

    // admin view one provider
    async show(request: Request, response: Response){
        const { id } = request.params;
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

        console.log(password);

        const provider = usersRepository.create({
            name,
            email,
            admin_id: request.userId,
            type: "provider",
            cpf,
            phone,
            password,
        })

        await usersRepository.save(provider);

        return response.status(201).json({provider, password: password});
    }

    // admin delete one provider
    async destroy(request: Request, response: Response) {
        const usersRepository = getCustomRepository(UserRepository);
        const { id } = request.params;
        const providerOwner = await usersRepository.findOne({id: request.userId});

        if (!providerOwner || request.userType !== "admin") {
            return response.json({
                error: "Você não pode fazer isso."
            })
        }

        await usersRepository.delete({ id });
        return response.status(200).json({ message: "Fornecedor deletado." });
    }
} 

export default new ProviderController();