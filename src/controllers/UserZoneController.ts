import { Request, Response } from "express";
import { UsersZonesServices } from "../services/UsersZonesServices";

class UserZoneController {
    async index(request: Request, response: Response) {
        const userZoneServices = new UsersZonesServices();
        const allUserZones = await userZoneServices.index(); 
        return response.json(allUserZones);
    }
    async showZones(request: Request, response: Response){
        const { userId } = request.params;

        const userZoneServices = new UsersZonesServices();

        try {
            const zonesOfProvider = await userZoneServices.showZones(userId);
            return response.json(zonesOfProvider);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
        
    }

    async create(request: Request, response: Response){
        const { zoneId } = request.params;
        const { user_id } = request.body;
        
        const userZoneServices = new UsersZonesServices();

        try {
            const user_zone = await userZoneServices.create(zoneId, user_id);
            return response.status(201).json(user_zone);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
    }

    async destroy(request: Request, response: Response) {
        const { userZoneId } = request.params;

        const userZonesServices = new UsersZonesServices();

        try {
            const userZone = await userZonesServices.destroy(userZoneId);
            return response.json(userZone);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }

    }
}

export default new UserZoneController();