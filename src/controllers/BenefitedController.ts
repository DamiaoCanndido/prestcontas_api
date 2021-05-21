import { Request, Response } from "express";
import { BenefitedsServices } from "../services/BenefitedsServices";

class BenefitedController {
    async index(request: Request, response: Response){
        const benefitedsServices = new BenefitedsServices();
        const allBenefiteds = await benefitedsServices.index();
        return response.json(allBenefiteds);
    }

    async myBenefiteds(request: Request, response: Response){
        const benefitedsServices = new BenefitedsServices();
        const myBenefiteds = await benefitedsServices.myBenefiteds(request.userId);
        return response.json(myBenefiteds);
    }

    async create(request: Request, response: Response){
        const benefitedsServices = new BenefitedsServices();
        const {
            name, 
            cpf,
            phone,
            number,
            zone_id,
            latitude,
            longitude,
        } = request.body;

        try {
            const id = request.userId;
            const benefited = await benefitedsServices.create({ 
                id, name, cpf, phone, number, zone_id, latitude, longitude 
            });
            return response.status(201).json(benefited);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
    }

    async update(request: Request, response: Response) {
        const { name, cpf, phone } = request.body;
        const { id } = request.params;

        const benefitedsServices = new BenefitedsServices();

        try {
            const benefited = await benefitedsServices.update(id, name, cpf, phone);
            return response.json(benefited);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
        
    }

    async destroy(request: Request, response: Response) {
        const { id } = request.params;
        const benefitedsServices = new BenefitedsServices();
        
        try {
            const benefited = await benefitedsServices.destroy(id);
            return response.status(200).json(benefited);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
    }
}

export default new BenefitedController();