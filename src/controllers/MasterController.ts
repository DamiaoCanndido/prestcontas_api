import { Request, Response } from "express";
import { UserTypes } from "../protocols/UserTypes";
import { MastersServices } from "../services/MastersServices";

class MasterController {
    async create(request: Request, response: Response) {
        const { name, email, password, repeatPassword } = request.body;

        const mastersServices = new MastersServices();

        try {
            const user = await mastersServices.create({
                name,
                email,
                password,
                repeatPassword,
            }, UserTypes.MASTER);

            return response.status(201).json(user);
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        }
    }
}

export default new MasterController();