import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from "uuid";
import { Zone } from "./Zone";

@Entity("providers")
class Provider {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    cpf: string;

    @Column()
    type: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(type => Zone)
    @JoinTable({
        name: "providers_zones",
        joinColumn: {
            name: "providerId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "zoneId",
            referencedColumnName: "id"
        }
    })
    zones: Zone[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Provider };