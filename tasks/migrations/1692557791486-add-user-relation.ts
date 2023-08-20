import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRelation1692557791486 implements MigrationInterface {
    name = 'AddUserRelation1692557791486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` ADD \`assigneeId\` char(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`task\` ADD CONSTRAINT \`FK_7384988f7eeb777e44802a0baca\` FOREIGN KEY (\`assigneeId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`task\` DROP FOREIGN KEY \`FK_7384988f7eeb777e44802a0baca\``);
        await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`assigneeId\``);
    }

}
