import { getCustomRepository, Repository } from "typeorm";
import { Vehicle } from "../models/Vehicle";
import { IVehicleCreate } from "../protocols/VehicleCreate";
import { VehicleRepository } from "../repositories/VehicleRepository";

class VehiclesServices {
    private vehicleRepository: Repository<Vehicle>;

    constructor() {
        this.vehicleRepository = getCustomRepository(VehicleRepository);
    }

    async index() {
        const allVehicles = await this.vehicleRepository.find({ 
            relations:["user"]
        });
        return allVehicles;
    }

    async create({ userId, adminId, vehicle, model, brand, manufacturing, license, size }: IVehicleCreate) {
        if (!vehicle || !model || !brand || !manufacturing || !license || !size) {
            throw new Error("Está faltando algum dado.")
        }

        const create_vehicle = this.vehicleRepository.create({
            user_id: userId,
            admin_id: adminId,
            vehicle,
            model,
            brand,
            manufacturing,
            license,
            size,
        })

        await this.vehicleRepository.save(create_vehicle);

        return create_vehicle;
    }

    async destroy(id: string, adminId: string) {
        const vehicleOwner = await this.vehicleRepository.findOne({admin_id: adminId});

        if (!vehicleOwner) {
            throw new Error("Você não pode fazer isso.");
        }

        await this.vehicleRepository.delete({ id });

        return { message: "Veículo deletado." }
    }
}

export { VehiclesServices };