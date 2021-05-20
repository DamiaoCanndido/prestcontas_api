import { Request, Response } from "express";
import { VehiclesServices } from "../services/VehiclesServices";

class VehicleController {
    // admin
    async index(request: Request, response: Response) {
        const vehicleServices = new VehiclesServices();
        const allVehicles = await vehicleServices.index();
        return response.json(allVehicles);
    }
    // admin
    async create(request: Request, response: Response) {
        const { userId } = request.params;
        const { vehicle, model, brand, manufacturing, license, size } = request.body;

        const adminId = request.userId;

        const vehicleServices = new VehiclesServices();

        try {
            const create_vehicle = await vehicleServices.create({
                userId, adminId, vehicle, model, brand, manufacturing, license, size,
            })
            return response.status(201).json(create_vehicle);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
    }

    // admin delete vehicle
    async destroy(request: Request, response: Response) {
        const { id } = request.params;
        const vehicleServices = new VehiclesServices();
        try {
            const vehicle = await vehicleServices.destroy(id, request.userId);
            return response.json(vehicle);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
    }
    
} 

export default new VehicleController();