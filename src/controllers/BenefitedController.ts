import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { BenefitedRepository } from "../repositories/BenefitedsRepository";
import { UserBenefitedRepository } from "../repositories/UserBenefitedRepository";
import { UserRepository } from "../repositories/UserRepository";
import { ZoneRepository } from "../repositories/ZoneRepository";

class BenefitedController {
    async index(request: Request, response: Response){
        const benefitedRepository = getCustomRepository(BenefitedRepository);
        const allBenefiteds = await benefitedRepository.find({relations: ["zone", "user"]});
        return response.json(allBenefiteds);
    }

    async myBenefiteds(request: Request, response: Response){
        const benefitedRepository = getCustomRepository(BenefitedRepository);
        const myBenefiteds = await benefitedRepository.find({
             where: { user_id: request.userId } 
        });
        return response.json(myBenefiteds);
    }

    async create(request: Request, response: Response){
        const zoneRepository = getCustomRepository(ZoneRepository);
        const userRepository = getCustomRepository(UserRepository);
        const benefitedRepository = getCustomRepository(BenefitedRepository);

        const {
            name, 
            cpf,
            phone,
            number,
            zone_id,
            latitude,
            longitude,
        } = request.body;

        if (
            !name ||
            !cpf ||
            !zone_id ||
            !latitude ||
            !longitude) {
                return response.status(400).json({
                    error: "Algum dado faltando."
                });
        }

        const zone = await zoneRepository.find({ id: zone_id });
        const user = await userRepository.find({ id: request.userId });

        if (!zone) {
            return response.status(400).json({
                error: "Localidade não existe."
            });
        }

        if (!user) {
            return response.status(400).json({
                error: "Usuário não existe."
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
            name, 
            cpf,
            phone,
            number,
            zone_id,
            user_id: request.userId,
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

        if (request.userType !== "admin") {
            return response.status(400).json({
                error: "Você não pode fazer isso."
            })
        }

        await benefitedRepository.delete({ id });
        return response.status(200).json(benefited);
    }
}

export default new BenefitedController();