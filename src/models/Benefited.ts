import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Zone } from "./Zone";

@Entity("benefiteds")
class Benefited {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    zone_id: string;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    phone: string;

    @ManyToOne(() => Zone)
    @JoinColumn({ name: "zone_id" })
    zone: Zone;

    @ManyToMany(type => User)
    @JoinTable({
        name: "users_benefiteds",
        joinColumn: {
            name: "benefited_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        }
    })
    users: User[];

    @Column()
    number: string;

    @Column("decimal")
    latitude: number;

    @Column("decimal")
    longitude: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Benefited };