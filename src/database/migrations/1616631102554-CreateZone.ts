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
                        name: "admin_id",
                        type: "uuid",
                    },
                    {
                        name: "sector",
                        type: "enum",
                        enum: ["rural", "urbana"]
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
                foreignKeys: [
                    {
                        name: "FKAdminId",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["admin_id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("zones");
    }

}
