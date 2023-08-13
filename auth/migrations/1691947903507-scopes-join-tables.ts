import { MigrationInterface, QueryRunner } from "typeorm";

export class ScopesJoinTables1691947903507 implements MigrationInterface {
    name = 'ScopesJoinTables1691947903507'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`client_scopes_scope\` (\`clientId\` char(36) NOT NULL, \`scopeId\` char(36) NOT NULL, INDEX \`IDX_275d72bf2ac885ebe3fbf5a64f\` (\`clientId\`), INDEX \`IDX_ee7cdf83913ec8e1261429bf33\` (\`scopeId\`), PRIMARY KEY (\`clientId\`, \`scopeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`authorization_code_scopes_scope\` (\`authorizationCodeId\` varchar(255) NOT NULL, \`scopeId\` char(36) NOT NULL, INDEX \`IDX_96816b93c9828888a06c113ed3\` (\`authorizationCodeId\`), INDEX \`IDX_62bfad8a475c1607e6655373bf\` (\`scopeId\`), PRIMARY KEY (\`authorizationCodeId\`, \`scopeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`token_scopes_scope\` (\`tokenId\` char(36) NOT NULL, \`scopeId\` char(36) NOT NULL, INDEX \`IDX_c364244685df0dbc135805f14f\` (\`tokenId\`), INDEX \`IDX_3711cb89bf79d239a8480ef600\` (\`scopeId\`), PRIMARY KEY (\`tokenId\`, \`scopeId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`client_scopes_scope\` ADD CONSTRAINT \`FK_275d72bf2ac885ebe3fbf5a64fd\` FOREIGN KEY (\`clientId\`) REFERENCES \`client\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`client_scopes_scope\` ADD CONSTRAINT \`FK_ee7cdf83913ec8e1261429bf336\` FOREIGN KEY (\`scopeId\`) REFERENCES \`scope\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`authorization_code_scopes_scope\` ADD CONSTRAINT \`FK_96816b93c9828888a06c113ed3c\` FOREIGN KEY (\`authorizationCodeId\`) REFERENCES \`authorization_code\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`authorization_code_scopes_scope\` ADD CONSTRAINT \`FK_62bfad8a475c1607e6655373bf3\` FOREIGN KEY (\`scopeId\`) REFERENCES \`scope\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`token_scopes_scope\` ADD CONSTRAINT \`FK_c364244685df0dbc135805f14f2\` FOREIGN KEY (\`tokenId\`) REFERENCES \`token\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`token_scopes_scope\` ADD CONSTRAINT \`FK_3711cb89bf79d239a8480ef6004\` FOREIGN KEY (\`scopeId\`) REFERENCES \`scope\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token_scopes_scope\` DROP FOREIGN KEY \`FK_3711cb89bf79d239a8480ef6004\``);
        await queryRunner.query(`ALTER TABLE \`token_scopes_scope\` DROP FOREIGN KEY \`FK_c364244685df0dbc135805f14f2\``);
        await queryRunner.query(`ALTER TABLE \`authorization_code_scopes_scope\` DROP FOREIGN KEY \`FK_62bfad8a475c1607e6655373bf3\``);
        await queryRunner.query(`ALTER TABLE \`authorization_code_scopes_scope\` DROP FOREIGN KEY \`FK_96816b93c9828888a06c113ed3c\``);
        await queryRunner.query(`ALTER TABLE \`client_scopes_scope\` DROP FOREIGN KEY \`FK_ee7cdf83913ec8e1261429bf336\``);
        await queryRunner.query(`ALTER TABLE \`client_scopes_scope\` DROP FOREIGN KEY \`FK_275d72bf2ac885ebe3fbf5a64fd\``);
        await queryRunner.query(`DROP INDEX \`IDX_3711cb89bf79d239a8480ef600\` ON \`token_scopes_scope\``);
        await queryRunner.query(`DROP INDEX \`IDX_c364244685df0dbc135805f14f\` ON \`token_scopes_scope\``);
        await queryRunner.query(`DROP TABLE \`token_scopes_scope\``);
        await queryRunner.query(`DROP INDEX \`IDX_62bfad8a475c1607e6655373bf\` ON \`authorization_code_scopes_scope\``);
        await queryRunner.query(`DROP INDEX \`IDX_96816b93c9828888a06c113ed3\` ON \`authorization_code_scopes_scope\``);
        await queryRunner.query(`DROP TABLE \`authorization_code_scopes_scope\``);
        await queryRunner.query(`DROP INDEX \`IDX_ee7cdf83913ec8e1261429bf33\` ON \`client_scopes_scope\``);
        await queryRunner.query(`DROP INDEX \`IDX_275d72bf2ac885ebe3fbf5a64f\` ON \`client_scopes_scope\``);
        await queryRunner.query(`DROP TABLE \`client_scopes_scope\``);
    }

}
