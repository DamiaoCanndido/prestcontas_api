import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { DistrictRepository } from "../repositories/DistrictRepository";
 
class DistrictController {
    async index(request: Request, response: Response){
        const districtRepository = getCustomRepository(DistrictRepository);
        const { cityId } = request.params;
        const district = await districtRepository.findOne({ city_id: cityId }, { relations: ["city", "streets"] });
        return response.json(district);
    }

    async create(request: Request, response: Response){
        const districtRepository = getCustomRepository(DistrictRepository);
        const { name } = request.body;
        const { cityId } = request.params;
        const district = districtRepository.create({
            city_id: cityId,
            name
        });
        await districtRepository.save(district);
        response.status(201).json(district);
    }
}

export default new DistrictController();