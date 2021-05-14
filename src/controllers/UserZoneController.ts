import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserZoneRepository } from "../repositories/UserZoneRepository";
import { ZoneRepository } from "../repositories/ZoneRepository";

class UserZoneController {
    async index(request: Request, response: Response){
        const userZonesRepository = getCustomRepository(UserZoneRepository);
        const zoneRepository = getCustomRepository(ZoneRepository);

        const { userId } = request.params;

        const allPZ = await userZonesRepository.find({where: { user_id: userId }});

        let zonesIds: string[] = [];

        allPZ.forEach((elem) => {
            zonesIds.push(elem.zone_id);
        })

        const zonesOfProvider = await zoneRepository.findByIds(zonesIds);

        return response.json(zonesOfProvider);
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