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
                        name: "district_id",
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
                        columnNames: ["district_id"],
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
