import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryColumn, } from "typeorm";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";

@Entity("admins")
class Admin {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    type: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

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

export { Admin };