import { Column, Entity, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("users_zones")
class UserZone {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @Column()
    zone_id: string;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { UserZone };