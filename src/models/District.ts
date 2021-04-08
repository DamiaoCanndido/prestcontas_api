import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { City } from "./City";
import { Street } from "./Street";

@Entity("districts")
class District {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    city_id: string;

    @Column()
    name: string;

    @ManyToOne(() => City, city => city.district)
    @JoinColumn({name: "city_id"})
    city: City;

    @OneToMany(() => Street, street => street.district)
    @JoinColumn({name: "district_id"})
    streets: Street[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }
}

export { District };