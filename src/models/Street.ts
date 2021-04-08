import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { District } from "./District";

@Entity("streets")
class Street {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    district_id: string;

    @Column()
    name: string;

    @ManyToOne(() => District, district => district.streets)
    @JoinColumn({name: "district_id"})
    district: District;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { Street };