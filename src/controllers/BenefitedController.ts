import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { BenefitedRepository } from "../repositories/BenefitedsRepository";

class BenefitedController {
    async index(request: Request, response: Response){
        const benefitedRepository = getCustomRepository(BenefitedRepository);
        const allBenefiteds = await benefitedRepository.find({
            relations: ["provider"],
        });
        return response.json(allBenefiteds);
    }

    async myBenefiteds(request: Request, response: Response){
        const benefitedRepository = getCustomRepository(BenefitedRepository);
        const myBenefiteds = await benefitedRepository.find({
             where: { provider_id: request.userId } 
        });
        return response.json(myBenefiteds);
    }

    async create(request: Request, response: Response){
        const benefitedRepository = getCustomRepository(BenefitedRepository);

        const {
            name, 
            cpf,
            phone,
            city,
            type,
            district,
            street,
            number,
            latitude,
            longitude,
        } = request.body;

        if (
            !name ||
            !cpf ||
            !city ||
            !type ||
            !district||
            !street ||
            !latitude ||
            !longitude) {
                return response.status(400).json({
                    error: "Algum dado faltando."
                });
        }

        const benefitedAlreadyExists = await benefitedRepository.find({
            where: [
                {cpf},
                {phone},
            ]
        })

        if(benefitedAlreadyExists[0]){
            return response.status(400).json({
                error: "Algum dado já foi cadastrado"
            }) 
        }

        const benefited = benefitedRepository.create({
            provider_id: request.userId,
            name, 
            cpf,
            phone,
            city,
            type,
            district,
            street,
            number,
            latitude,
            longitude,
        })

        await benefitedRepository.save(benefited);

        return response.status(201).json(benefited);
    }

    async update(request: Request, response: Response) {
        const { cpf, phone } = request.body;
        const benefitedRepository = getCustomRepository(BenefitedRepository);
        const { id } = request.params;

        const benefitedAlreadyExists = await benefitedRepository.find({
            where: [
                {cpf},
                {phone},
            ]
        });

        if(benefitedAlreadyExists[0]){
            return response.status(400).json({
                error: "Algum dado já foi cadastrado"
            }) 
        }

        await benefitedRepository.update(id, request.body);
        const benefited = await benefitedRepository.findOne({ id });
        
        return response.json(benefited);
    }

    async destroy(request: Request, response: Response) {
        const benefitedRepository = getCustomRepository(BenefitedRepository);
        const { id } = request.params;
        const benefited = await benefitedRepository.findOne({id});

        if (benefited.provider_id !== request.userId) {
            return response.status(403).json({
                error: "Você não pode fazer isso."
            })
        }

        await benefitedRepository.delete({ id });
        return response.status(200).json(benefited);
    }
}

export default new BenefitedController();