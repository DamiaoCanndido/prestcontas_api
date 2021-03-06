import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1616323962196 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "master_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "admin_id",
                        type: "uuid",
                        isNullable: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "cpf_cnpj",
                        type: "varchar",
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: "phone",
                        type: "varchar",
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "type",
                        type: "enum",
                        enum: ["provider", "admin", "master"],
                        default: "'provider'",
                        // enumname same name
                        enumName: "UserTypes"
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
                    {
                        name: "FKMasterId",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["master_id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
