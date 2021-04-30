import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { VehicleRepository } from "../repositories/VehicleRepository";

class VehicleController {
    // admin
    async index(request: Request, response: Response) {
        const vehicleRepository = getCustomRepository(VehicleRepository);
        const allVehicles = await vehicleRepository.find({ 
            // where: { user_id: request.userId }, 
            relations:["user"]
        });
        return response.json(allVehicles);
    }
    // admin
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

    // admin delete vehicle
    async destroy(request: Request, response: Response) {
        const vehiclesRepository = getCustomRepository(VehicleRepository);
        const { id } = request.params;
        const vehicleOwner = await vehiclesRepository.findOne({user_id: request.userId});

        if (!vehicleOwner || request.userType !== "admin") {
            return response.json({
                error: "Você não pode fazer isso."
            })
        }

        await vehiclesRepository.delete({ id });
        return response.status(200).json({ message: "Fornecedor deletado." });
    }
    
} 

export default new VehicleController();