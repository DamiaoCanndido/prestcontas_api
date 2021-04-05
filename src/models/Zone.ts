import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from "uuid";
import { Provider } from "./Provider";

@Entity("zones")
class Zone {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    city: string;

    @Column("enum")
    sector: string;

    @Column()
    district: string;

    @Column()
    street: string;

    @Column()
    description: string;

    @Column()
    formatted_address: string;

    @Column("decimal")
    latitude: number;

    @Column("decimal")
    longitude: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(type => Provider)
    @JoinTable({
        name: "providers_zones",
        joinColumn: {
            name: "zoneId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "providerId",
            referencedColumnName: "id"
        }
    })
    providers: Provider[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Zone };