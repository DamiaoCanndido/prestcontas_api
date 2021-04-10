import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBenefited1616631102554 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "benefiteds",
                columns: [
                    { 
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    { 
                        name: "zone_id",
                        type: "uuid",
                    },
                    { 
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isNullable: true,
                        isUnique: true,
                    },
                    {
                        name: "number",
                        type: "varchar",
                        isNullable: true,
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
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKZoneId",
                        referencedTableName: "zones",
                        referencedColumnNames: ["id"],
                        columnNames: ["zone_id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                    {
                        name: "FKUserId",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("benefiteds");
    }

}
