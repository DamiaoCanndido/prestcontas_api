import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ZoneRepository } from "../repositories/ZoneRepository";
import { ZonesServices } from "../services/ZonesServices";

class ZoneController {
    // boss
    async index(request: Request, response: Response){
        const zoneRepository = getCustomRepository(ZoneRepository);
        const allZones = await zoneRepository.find({relations:["users", "benefiteds"]});
        response.json(allZones);
    }

    async myZones(request: Request, response: Response) {
        const adminId = request.userId;

        const zonesServices = new ZonesServices();

        const zones = await zonesServices.myZones(adminId);

        return response.json(zones);
    }

    async createByCoor(request: Request, response: Response){
        const { latitude, longitude, radius, description, sector } = request.body;
        const adminId = request.userId;

        const zonesServices = new ZonesServices();

        try {
            const zone = await zonesServices.createByCoor({
               adminId ,latitude, longitude, description, radius, sector,
            })
            return response.status(201).json(zone);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
    }

    async destroy(request: Request, response: Response) {
        const { id } = request.params;
        const zonesServices = new ZonesServices();
        
        try {
            const zone = await zonesServices.destroy(id);
            response.json(zone);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
    }
}

export default new ZoneController();