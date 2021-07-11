import { 
    BeforeInsert, 
    BeforeRemove, 
    Column, 
    CreateDateColumn, 
    Entity, 
    JoinColumn,
    ManyToOne, 
    PrimaryColumn 
} from "typeorm";
import aws from "aws-sdk";
import fs from "fs";
import { promisify } from "util";
import path from "path";
import { v4 as uuid } from "uuid";
import { User } from "./User";

const s3 = new aws.S3();

@Entity("supplies")
class Supply {
    @PrimaryColumn()
    readonly id: string;

    @Column()
    user_id: string;

    @Column()
    benefited_id: string;

    @Column()
    amount: number;

    @Column("text", {array:true})
    keys: string[];

    @Column("text", {array:true})
    photos: string[];

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    constructor() {
        if(!this.id) {
            this.id = uuid();
        }
    }

    @BeforeInsert()
    createPhoto(){
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV === "development"){
            const photos = this.keys.map((i) => {
                return `${process.env.APP_URL}/files/${i}`
            })
            this.photos = photos;
        }
    }

    @BeforeRemove()
    async remove() {
        if (process.env.NODE_ENV === "production") {
            this.keys.forEach((elem) => {
                s3.deleteObject({
                    Bucket: "prestcontas",
                    Key: elem
                }).promise();
            });
        } else {
            this.keys.forEach((elem) => {
                return promisify(fs.unlink)(
                    path.resolve(__dirname, "..", "..", "uploads", elem)
                )
            })
        }
    }
}

export { Supply };