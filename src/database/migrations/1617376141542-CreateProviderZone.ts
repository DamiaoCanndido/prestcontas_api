import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProviderZone1617376141542 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "providers_zones",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "providerId",
                        type: "uuid",
                    },
                    {
                        name: "zoneId",
                        type: "uuid",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKProviderId",
                        referencedTableName: "providers",
                        referencedColumnNames: ["id"],
                        columnNames: ["providerId"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                    {
                        name: "FKZoneId",
                        referencedTableName: "zones",
                        referencedColumnNames: ["id"],
                        columnNames: ["zoneId"],
                        onUpdate: "CASCADE",
                        onDelete: "CASCADE",
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("providers_zones");
    }

}
