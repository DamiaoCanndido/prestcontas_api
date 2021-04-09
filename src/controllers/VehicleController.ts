import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { VehicleRepository } from "../repositories/VehicleRepository";

class VehicleController {
    async create(request: Request, response: Response) {
        const vehicleRepository = getCustomRepository(VehicleRepository);
        const { userId } = request.params;
        const { vehicle, model, brand, manufacturing, license, size } = request.body;

        if (!vehicle || !model || !brand || !manufacturing || !license || !size) {
            return response.status(400).json({
                error: "Está faltando algum dado."
            });
        }

        const create_vehicle = vehicleRepository.create({
            user_id: userId,
            vehicle,
            model,
            brand,
            manufacturing,
            license,
            size,
        })

        await vehicleRepository.save(create_vehicle);
        return response.status(201).json(create_vehicle);
    }
} 

export default new VehicleController();