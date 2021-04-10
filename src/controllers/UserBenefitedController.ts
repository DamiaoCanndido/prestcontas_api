import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserBenefitedRepository } from "../repositories/UserBenefitedRepository";

class UserBenefitedController {
    async create(request: Request, response: Response){
        const { benefitedId } = request.params;
        const { user_id } = request.body;
        const userBenefitedRepository = getCustomRepository(UserBenefitedRepository);

        const user_benefited = userBenefitedRepository.create({
            benefited_id: benefitedId,
            user_id,
        })

        await userBenefitedRepository.save(user_benefited);
        return response.status(201).json(user_benefited);
    }
}

export default new UserBenefitedController();