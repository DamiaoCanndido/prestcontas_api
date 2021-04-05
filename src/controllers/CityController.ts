import { Request, Response } from "express";
import { getCustomRepository, getTreeRepository } from "typeorm";
import { CityRepository } from "../repositories/CityRepository";
 
class CityController {
    async index(request: Request, response: Response){
        const cityRepository = getCustomRepository(CityRepository);
        const allcities = await cityRepository.find({relations:["district", "district.streets"]});
        return response.json(allcities);
    }

    async create(request: Request, response: Response){
        const cityRepository = getCustomRepository(CityRepository);
        const { name } = request.body;
        const city = cityRepository.create({
            name
        });
        await cityRepository.save(city);
        response.status(201).json(city);
    }
}

export default new CityController();