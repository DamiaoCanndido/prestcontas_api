import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { City } from "./City";
import { Street } from "./Street";

@Entity("districts")
class District {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    cityId: string;

    @Column()
    name: string;

    @ManyToOne(() => City, city => city.district)
    @JoinColumn({name: "cityId"})
    city: City;

    @OneToMany(() => Street, street => street.district)
    @JoinColumn({name: "districtId"})
    streets: Street[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { District };