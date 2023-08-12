import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1691876487657 implements MigrationInterface {
    name = 'Init1691876487657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` char(36) NOT NULL, \`publicId\` char(36) NOT NULL, \`email\` varchar(50) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`scope\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`client\` (\`id\` char(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`secret\` varchar(255) NULL, \`redirectUris\` text NOT NULL, \`allowedGrants\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`authorization_code\` (\`id\` varchar(255) NOT NULL, \`code\` varchar(255) NOT NULL, \`redirectUri\` varchar(255) NULL, \`codeChallenge\` varchar(255) NULL, \`codeChallengeMethod\` varchar(255) NULL, \`expiresAt\` datetime(3) NOT NULL, \`userId\` char(36) NULL, \`clientId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`token\` (\`id\` char(36) NOT NULL, \`accessToken\` varchar(255) NOT NULL, \`accessTokenExpiresAt\` datetime(3) NOT NULL, \`refreshToken\` varchar(255) NULL, \`refreshTokenExpiresAt\` datetime(3) NULL, \`originatingAuthCodeId\` varchar(255) NULL, \`clientId\` char(36) NULL, \`userId\` char(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`authorization_code\` ADD CONSTRAINT \`FK_c84c3d4d0e6344f36785f679e47\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`authorization_code\` ADD CONSTRAINT \`FK_ffbeadc85eea5dabbbcaf4f6b0e\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`token\` ADD CONSTRAINT \`FK_8139f8b076cfd8723e992c9d9ff\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`token\` ADD CONSTRAINT \`FK_94f168faad896c0786646fa3d4a\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token\` DROP FOREIGN KEY \`FK_94f168faad896c0786646fa3d4a\``);
        await queryRunner.query(`ALTER TABLE \`token\` DROP FOREIGN KEY \`FK_8139f8b076cfd8723e992c9d9ff\``);
        await queryRunner.query(`ALTER TABLE \`authorization_code\` DROP FOREIGN KEY \`FK_ffbeadc85eea5dabbbcaf4f6b0e\``);
        await queryRunner.query(`ALTER TABLE \`authorization_code\` DROP FOREIGN KEY \`FK_c84c3d4d0e6344f36785f679e47\``);
        await queryRunner.query(`DROP TABLE \`token\``);
        await queryRunner.query(`DROP TABLE \`authorization_code\``);
        await queryRunner.query(`DROP TABLE \`client\``);
        await queryRunner.query(`DROP TABLE \`scope\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
