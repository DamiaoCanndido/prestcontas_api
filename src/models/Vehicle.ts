import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("vehicles")
class Vehicle {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

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

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Vehicle };