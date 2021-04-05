import { Request, Response, NextFunction } from "express";
import { AdminRepository } from "../repositories/AdminRepository";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";

interface TokenPayload {
    id: string,
    iat: number,
    exp: number,
}

class AuthMiddleware {
    async auth(request: Request, response: Response, next: NextFunction){
        const adminRepository = getCustomRepository(AdminRepository);
        const { authorization } = request.headers;

        if(!authorization) {
            return response.status(401).json({
                error: "Token não existe."
            })
        }

        const token = authorization.replace("Bearer", "").trim();

        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const { id } = data as TokenPayload;
            request.userId = id;
            const user = await adminRepository.findOne({id: request.userId});
            request.userType = user.type;
            return next();
        } catch(err) {
            return response.status(401).json({
                error: "Token não confere."
            })
        }
    }

    protect() {
        return function protect(request: Request, response: Response, next: NextFunction){
            if (request.userType !== "admin") {
                return response
                    .status(401)
                    .json({ 
                        error: 'Não tem permissão.' 
                    });
            }
            return next();
        }
    }
}

export default new AuthMiddleware();