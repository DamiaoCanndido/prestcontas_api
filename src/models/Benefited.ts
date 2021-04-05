import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from "uuid";
import { Provider } from "./Provider";

@Entity("benefiteds")
class Benefited {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    provider_id: string;

    @ManyToOne(() => Provider)
    @JoinColumn({ name: "provider_id" })
    provider: Provider;

    @Column()
    name: string;

    @Column()
    cpf: string;

    @Column()
    phone: string;

    @Column()
    city: string;

    @Column("enum")
    type: string;

    @Column()
    district: string;

    @Column()
    street: string;

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