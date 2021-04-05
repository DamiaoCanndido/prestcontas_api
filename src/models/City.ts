import { Column, Entity, JoinColumn, OneToMany, PrimaryColumn, Tree, TreeChildren } from "typeorm";
import { v4 as uuid } from "uuid";
import { District } from "./District";

@Entity("cities")
class City {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @OneToMany(() => District, district => district.city)
    @JoinColumn({name: "districtId"})
    district: District[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { City };