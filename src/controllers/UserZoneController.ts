import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserZoneRepository } from "../repositories/UserZoneRepository";

class UserZoneController {
    async index(request: Request, response: Response){
        const userZonesRepository = getCustomRepository(UserZoneRepository);
        const allPZ = await userZonesRepository.find();
        return response.json(allPZ);
    }

    async create(request: Request, response: Response){
        const { zoneId } = request.params;
        const { user_id } = request.body;
        const userZonesRepository = getCustomRepository(UserZoneRepository);

        const userZoneExists = await userZonesRepository.findOne({ user_id, zone_id: zoneId });

        if (userZoneExists) {
            return response.status(400).json({ 
                error: "Já existe um fornecedor nessa área." 
            })
        }

        const user_zone = userZonesRepository.create({
            zone_id: zoneId,
            user_id,
        })

        await userZonesRepository.save(user_zone);
        return response.status(201).json(user_zone);
    }
}

export default new UserZoneController();