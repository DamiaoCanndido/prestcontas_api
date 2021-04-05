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
                        name: "provider_id",
                        type: "uuid",
                    },
                    { 
                        name: "zone_id",
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
                        name: "FKProvider",
                        referencedTableName: "providers",
                        referencedColumnNames: ["id"],
                        columnNames: ["provider_id"],
                        onUpdate: "CASCADE",
                        // ativada em desenvolvimento
                        // onDelete: "CASCADE",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("benefiteds");
    }

}
