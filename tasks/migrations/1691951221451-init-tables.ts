import { MigrationInterface, QueryRunner } from "typeorm";

export class InitTables1691951221451 implements MigrationInterface {
    name = 'InitTables1691951221451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` char(36) NOT NULL, \`publicId\` char(36) NOT NULL, \`email\` varchar(50) NOT NULL, \`name\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`task\` (\`id\` char(36) NOT NULL, \`publicId\` char(36) NOT NULL, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`assignationFee\` float NOT NULL, \`completionReward\` float NOT NULL, \`isCompleted\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`task\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
