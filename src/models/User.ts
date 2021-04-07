import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn, } from "typeorm";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { Zone } from "./Zone";

@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    cpf: string;

    @Column("enum")
    type: string;

    @Column()
    phone: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(type => Zone)
    @JoinTable({
        name: "users_zones",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "zone_id",
            referencedColumnName: "id"
        }
    })
    zones: Zone[];

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

    @BeforeUpdate()
    @BeforeInsert()
    async cryptPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
}

export { User };