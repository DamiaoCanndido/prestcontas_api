import { getCustomRepository, Repository } from "typeorm";
import { User } from "../models/User";
import { Zone } from "../models/Zone";
import { UserCoor } from "../protocols/UserCoor";
import { ZoneRepository } from "../repositories/ZoneRepository";

class ZonesServices {

    private zoneRepository: Repository<Zone>;

    constructor() {
        this.zoneRepository = getCustomRepository(ZoneRepository);
    }

    async createByCoor({ latitude, longitude, radius, description, sector }: UserCoor): Promise<Zone> {

        if (!latitude || !longitude || !radius) {
            throw new Error("Dados faltando.");
        }

        const zone = this.zoneRepository.create({
            latitude,
            longitude,
            radius,
            description,
            sector,
        })
        
        await this.zoneRepository.save(zone);

        return zone;
    }
}

export { ZonesServices };