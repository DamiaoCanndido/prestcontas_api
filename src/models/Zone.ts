import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from "uuid";
import { Benefited } from "./Benefited";
import { User } from "./User";

@Entity("zones")
class Zone {
    @PrimaryColumn()
    readonly id: string;

    @Column("enum")
    sector: string;

    @Column()
    description: string;

    @Column()
    formatted_address: string;

    @Column("decimal")
    latitude: number;

    @Column("decimal")
    longitude: number;

    @Column("decimal")
    radius: number;

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

    @OneToMany(() => Benefited, benefited => benefited.zone)
    @JoinColumn({name: "zone_id"})
    benefiteds: Benefited[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Zone };