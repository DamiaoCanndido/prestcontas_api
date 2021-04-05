import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { StreetRepository } from "../repositories/StreetRepository";

class StreetController {
    async index(request: Request, response: Response){
        const streetRepository = getCustomRepository(StreetRepository);
        const { districtId } = request.params;
        const street = await streetRepository.findOne({ districtId }, {relations: ["district"]});
        return response.json(street);
    }

    async create(request: Request, response: Response){
        const streetRepository = getCustomRepository(StreetRepository);
        const { name } = request.body;
        const { districtId } = request.params;
        const street = streetRepository.create({
            districtId,
            name
        });
        await streetRepository.save(street);
        response.status(201).json(street);
    }
}

export default new StreetController();