import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserBenefited1618013577057 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users_benefiteds",
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
                    {
                        name: "FKBenefitedId",
                        referencedTableName: "benefiteds",
                        referencedColumnNames: ["id"],
                        columnNames: ["benefited_id"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users_benefiteds");
    }

}
