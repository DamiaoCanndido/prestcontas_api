import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./User";

@Entity("vehicles")
class Vehicle {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @Column()
    admin_id: string;

    @Column()
    vehicle: string;

    @Column()
    model: string;

    @Column()
    brand: string;

    @Column()
    manufacturing: string;

    @Column()
    license: string;

    @Column()
    size: number;

    @ManyToOne(() => User)
    @JoinColumn({name: "user_id"})
    user: User;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Vehicle };