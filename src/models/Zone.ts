import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

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

    @ManyToMany(type => User)
    @JoinTable({
        name: "users_zones",
        joinColumn: {
            name: "zone_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    })
    users: User[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Zone };