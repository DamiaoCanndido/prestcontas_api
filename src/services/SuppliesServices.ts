import { getCustomRepository, Repository } from "typeorm";
import { Benefited } from "../models/Benefited";
import { Supply } from "../models/Supply";
import { ISupplyCreate } from "../protocols/SupplyCreate";
import { BenefitedRepository } from "../repositories/BenefitedsRepository";
import { SuppliesRepository } from "../repositories/SuppliesRepository";

class SuppliesServices {
    private suppliesRepository: Repository<Supply>;
    private benefitedRepository: Repository<Benefited>;

    constructor() {
        this.suppliesRepository = getCustomRepository(SuppliesRepository);
        this.benefitedRepository = getCustomRepository(BenefitedRepository);
    }

    async index() {
        const supplies = await this.suppliesRepository.find();
        return supplies;
    }

    async create({userId, benefitedId, amount, files}: ISupplyCreate) {
        const benefited = await this.benefitedRepository.findOne({ where: { id: benefitedId } });

        if (!benefited) {
            throw new Error("Beneficiário inexistente.");
        }

        let images: string[] = [];
        let urls: string[] = []; // prod
        let supplies: Supply;

        if (process.env.NODE_ENV === "production") {
            const cFiles = files as Express.MulterS3.File[]; // Express.Multer.File[]
            cFiles.map((i) => {
                images.push(i.key);
                urls.push(i.location); // prod
            })
        } else {
            const cFiles = files as Express.Multer.File[]
            cFiles.map((i) => {
                images.push(i.filename);
            })
        }

        supplies = this.suppliesRepository.create({
            user_id: userId,
            benefited_id: benefitedId,
            amount,
            photos: urls,
            keys: images,
        })

        await this.suppliesRepository.save(supplies);

        return supplies;
    }

    async destroy(id: string) {
        const supply = await this.suppliesRepository.findOne({id});

        if (!supply) {
            throw new Error("Você não pode fazer isso.")
        }

        await this.suppliesRepository.remove(supply);

        return supply;
    }
}

export { SuppliesServices };