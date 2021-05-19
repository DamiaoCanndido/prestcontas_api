import { getCustomRepository, Repository } from "typeorm";
import { UserZone } from "../models/UserZone";
import { Zone } from "../models/Zone";
import { UserZoneRepository } from "../repositories/UserZoneRepository";
import { ZoneRepository } from "../repositories/ZoneRepository";

class UsersZonesServices {
    private zoneRepository: Repository<Zone>;
    private userZoneRepository: Repository<UserZone>;

    constructor() {
        this.zoneRepository = getCustomRepository(ZoneRepository);
        this.userZoneRepository = getCustomRepository(UserZoneRepository);
    }

    async index(userId: string) {
        const allPZ = await this.userZoneRepository.find({where: { user_id: userId }});

        let zonesIds: string[] = [];

        allPZ.forEach((elem) => {
            zonesIds.push(elem.zone_id);
        })

        const zonesOfProvider = await this.zoneRepository.findByIds(zonesIds);

        return zonesOfProvider;
    }

    async create(zoneId: string, userId: string){
        const userZoneExists = await this.userZoneRepository.findOne({ user_id: userId, zone_id: zoneId });

        if (userZoneExists) {
            throw new Error("Já existe um fornecedor nessa área."); 
        }

        const user_zone = this.userZoneRepository.create({
            zone_id: zoneId,
            user_id: userId,
        })

        await this.userZoneRepository.save(user_zone);

        return user_zone;
    }
}

export { UsersZonesServices };