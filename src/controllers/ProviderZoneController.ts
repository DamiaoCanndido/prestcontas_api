import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ProviderZoneRepository } from "../repositories/ProvidersZoneRepository";

class ProviderZoneController {
    async index(request: Request, response: Response){
        const providersZonesRepository = getCustomRepository(ProviderZoneRepository);
        const allPZ = await providersZonesRepository.find();
        return response.json(allPZ);
    }

    async create(request: Request, response: Response){
        const { zoneId } = request.params;
        const { providerId } = request.body;
        const providersZonesRepository = getCustomRepository(ProviderZoneRepository);

        const provider_zone = providersZonesRepository.create({
            zoneId,
            providerId,
        })

        await providersZonesRepository.save(provider_zone);
        return response.status(201).json(provider_zone);
    }
}

export default new ProviderZoneController();