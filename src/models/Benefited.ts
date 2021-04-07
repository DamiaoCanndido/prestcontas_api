import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";
import { Zone } from "./Zone";

@Entity("benefiteds")
class Benefited {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    provider_id: string;

    @Column()
    zone_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    users: User;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    phone: string;

    @ManyToOne(() => Zone)
    @JoinColumn({ name: "zone_id" })
    zone: Zone;

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