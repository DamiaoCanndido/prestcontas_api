import { Request, Response } from "express";
import { AuthUsersServices } from "../services/AuthUsersServices";

class AuthUserController {
    
    async create(request: Request, response: Response) {
        const { email, password } = request.body;

        const authUsersServices = new AuthUsersServices();

        try {
            const user = await authUsersServices.create(email, password);
            return response
                .cookie("token", user.token, user.options)
                .json({ 
                    id: user.id, 
                    name: user.name, 
                    email: user.email, 
                    type: user.type, 
                    token: user.token 
                }
            );
        } catch (err) {
            return response.status(400)
                .json({ error: err.message });
        } 
    }

    async logout(request: Request, response: Response) {
        response.cookie("token", "", 
            { expires: new Date(Date.now() + 1000) }
        ).json({
            message: "Você saiu."
        });
    }
}

export default new AuthUserController();