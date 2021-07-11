import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSupply1616792505591 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "supplies",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    { 
                        name: "user_id",
                        type: "uuid",
                    },
                    { 
                        name: "benefited_id",
                        type: "uuid",
                    },
                    {
                        name: "amount",
                        type: "int"
                    },
                    {
                        name: "keys",
                        type: "varchar",
                        isArray: true,
                    },
                    {
                        name: "photos",
                        type: "varchar",
                        isArray: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
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
        await queryRunner.dropTable("supplies");
    }

}
