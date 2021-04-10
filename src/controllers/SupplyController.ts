import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { Supply } from "../models/Supply";
import { BenefitedRepository } from "../repositories/BenefitedsRepository";
import { SuppliesRepository } from "../repositories/SuppliesRepository";

class SupplyController {
    async index(request: Request, response: Response){
        const supplyRepository = getCustomRepository(SuppliesRepository);
        const allSupplies = await supplyRepository.find();
        return response.json(allSupplies);
    }
    async create(request: Request, response: Response){
        const supplyRepository = getCustomRepository(SuppliesRepository);
        const benefitedRepository = getCustomRepository(BenefitedRepository);
        const { benefitedId } = request.params;
        const { amount } = request.body;

        const benefited = await benefitedRepository.findOne({ where: { id: benefitedId } });

        if (!benefited) {
            return response.status(400).json({
                error: "Beneficiário inexistente."
            })
        }

        
        let images: string[] = [];
        let urls: string[] = []; // prod
        let supplies: Supply;

        if (process.env.NODE_ENV === "production") {
            const files = request.files as Express.MulterS3.File[]; // Express.Multer.File[]
            files.map((i) => {
                images.push(i.key);
                urls.push(i.location); // prod
            })
        } else {
            const files = request.files as Express.Multer.File[]
            files.map((i) => {
                images.push(i.filename);
            })
        }

        supplies = supplyRepository.create({
            user_id: request.userId,
            benefited_id: benefitedId,
            amount,
            photos: urls,
            keys: images,
        })

        await supplyRepository.save(supplies);
        return response.status(201).json(supplies);
    }

    async destroy(request: Request, response: Response) {
        const supplyRepository = getCustomRepository(SuppliesRepository);
        const { id } = request.params;
        const supply = await supplyRepository.findOne({id});

        if (!supply) {
            return response.status(403).json({
                error: "Você não pode fazer isso."
            })
        }

        await supplyRepository.remove(supply);
        return response.status(200).json(supply);
    }
}

export default new SupplyController();