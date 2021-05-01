import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateZone1616631102554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "zones",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "city",
                        type: "varchar",
                    },
                    {
                        name: "sector",
                        type: "enum",
                        enum: ["rural", "urbana"]
                    },
                    {
                        name: "district",
                        type: "varchar",
                    },
                    {
                        name: "street",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "description",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "formatted_address",
                        type: "varchar"
                    },
                    {
                        name: "latitude",
                        type: "decimal",
                    },
                    {
                        name: "longitude",
                        type: "decimal",
                    },
                    {
                        name: "radius",
                        type: "decimal",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("zones");
    }

}
