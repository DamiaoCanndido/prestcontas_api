import { Column, Entity, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users_benefiteds")
class UserBenefited {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @Column()
    benefited_id: string;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { UserBenefited };