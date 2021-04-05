import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateStreet1617490701863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "streets",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "districtId",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKDistrictId",
                        referencedTableName: "districts",
                        referencedColumnNames: ["id"],
                        columnNames: ["districtId"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("streets");
    }

}
