import { 
    BeforeInsert, 
    BeforeUpdate, 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    OneToMany, 
    PrimaryColumn, 
} from "typeorm";
import { v4 as uuid } from "uuid";
import bcrypt from "bcryptjs";
import { Zone } from "./Zone";
import { Vehicle } from "./Vehicle";
import { Benefited } from "./Benefited";
import { UserTypes } from "../protocols/UserTypes";

@Entity("users")
class User {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    admin_id: string;

    @Column()
    master_id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    cpf_cnpj: string;

    @Column({ 
        type: "enum", 
        enum: UserTypes, 
        default: UserTypes.PROVIDER,
    })
    type: UserTypes;

    @Column()
    phone: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({name: "admin_id"})
    admins: User

    @ManyToOne(() => User)
    @JoinColumn({name: "master_id"})
    masters: User

    @OneToMany(() => Vehicle, vehicle => vehicle.user)
    @JoinColumn({name: "user_id"})
    vehicles: Vehicle[]

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

    @ManyToMany(type => Benefited)
    @JoinTable({
        name: "users_benefiteds",
        joinColumn: {
            name: "user_id",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "benefited_id",
            referencedColumnName: "id"
        }
    })
    benefiteds: Benefited[];

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