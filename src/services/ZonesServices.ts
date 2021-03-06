import { getCustomRepository, Repository } from "typeorm";
import { Client, Language } from "@googlemaps/google-maps-services-js";
import { ReverseGeocodingLocationType } from "@googlemaps/google-maps-services-js/dist/geocode/reversegeocode";
import { Zone } from "../models/Zone";
import { UserCoor } from "../protocols/UserCoor";
import { ZoneRepository } from "../repositories/ZoneRepository";

class ZonesServices {

    private zoneRepository: Repository<Zone>;

    constructor() {
        this.zoneRepository = getCustomRepository(ZoneRepository);
    }

    async myZones(adminId: string) {
       const zones = await this.zoneRepository.find({where: {admin_id: adminId}, relations: ["users"]});
       return zones;
    }

    async createByCoor({adminId, latitude, longitude, radius, description, sector }: UserCoor): Promise<Zone> {
        const client = new Client({});

        if (!latitude || !longitude || !radius || !description || !sector) {
            throw new Error("Dados faltando.");
        }

        const res = await client.reverseGeocode({
            params: {
                key: process.env.GOOGLE_API,
                language: Language.pt_BR,
                latlng: { latitude, longitude },
                location_type: [ReverseGeocodingLocationType.GEOMETRIC_CENTER]
            }
        })

        const zone = this.zoneRepository.create({
            admin_id: adminId,
            latitude,
            longitude,
            radius,
            description,
            sector,
            formatted_address: res.data.results[0].formatted_address,
        })
        
        await this.zoneRepository.save(zone);

        return zone;
    }

    async destroy(id: string) {
        const zone = await this.zoneRepository.findOne({id});
        if (!zone) {
            throw new Error("Localidade não existe.")
        }
        await this.zoneRepository.delete({id});

        return { message: "Zona deletada." };
    }
}

export { ZonesServices };