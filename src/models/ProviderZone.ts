import { Column, Entity, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("providers_zones")
class ProviderZone {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    providerId: string;

    @Column()
    zoneId: string;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { ProviderZone };