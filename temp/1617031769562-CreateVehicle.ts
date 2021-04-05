import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateVehicle1617031769562 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "vehicles",
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
                        name: "vehicle",
                        type: "varchar",
                    },
                    {
                        name: "model",
                        type: "varchar",
                    },
                    {
                        name: "brand",
                        type: "varchar",
                    },
                    {
                        name: "manufacturing",
                        type: "varchar",
                    },
                    {
                        name: "license",
                        type: "varchar",
                    },
                    {
                        name: "size",
                        type: "int",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("vehicles");
    }

}
