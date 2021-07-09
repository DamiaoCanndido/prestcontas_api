import { Request, Response } from "express";
import { SuppliesServices } from "../services/SuppliesServices";

class SupplyController {
    async index(request: Request, response: Response){
        const suppliesServices = new SuppliesServices();
        const allSupplies = await suppliesServices.index();
        return response.json(allSupplies);
    }
    async showByProvider(request: Request, response: Response){
        const suppliesServices = new SuppliesServices();
        const suppliesCreated = await suppliesServices.showByProvider(request.userId);
        return response.json(suppliesCreated)
    }
    async create(request: Request, response: Response){
        const { benefitedId } = request.params;
        const { amount } = request.body;
        const userId = request.userId;
        const files = request.files as Express.MulterS3.File[] | Express.Multer.File[];

        const suppliesServices = new SuppliesServices();

        try {
            const supply = await suppliesServices.create({ userId, benefitedId, amount, files });
            return response.status(201).json(supply);
        } catch(err) {
            return response.status(400)
                .json({ error: err.message });
        }
    }

    async destroy(request: Request, response: Response) {
        const { id } = request.params;
        const suppliesServices = new SuppliesServices();

        try {
            const supply = await suppliesServices.destroy(id);
            return response.status(200).json(supply);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
        
    }
}

export default new SupplyController();