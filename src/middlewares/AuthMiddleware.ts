import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
    id: string,
    type: string,
    iat: number,
    exp: number,
}

class AuthMiddleware {
    async auth(request: Request, response: Response, next: NextFunction){
        const { authorization } = request.headers;

        if(!authorization) {
            return response.status(401).json({
                error: "Token não existe."
            })
        }

        const token = authorization.replace("Bearer", "").trim();

        try {
            const data = jwt.verify(token, process.env.JWT_SECRET);
            const { id, type  } = data as TokenPayload;
            request.userId = id;
            request.userType = type;
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