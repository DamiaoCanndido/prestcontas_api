import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateDistrict1617484718975 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "districts",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "cityId",
                        type: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKCityId",
                        referencedTableName: "cities",
                        referencedColumnNames: ["id"],
                        columnNames: ["cityId"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("districts");
    }

}
