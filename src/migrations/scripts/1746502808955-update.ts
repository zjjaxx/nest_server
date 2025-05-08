import { MigrationInterface, QueryRunner } from "typeorm";

export class Update1746502808955 implements MigrationInterface {
    name = 'Update1746502808955'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`photo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`url\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`photo\` ADD CONSTRAINT \`FK_4494006ff358f754d07df5ccc87\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`photo\` DROP FOREIGN KEY \`FK_4494006ff358f754d07df5ccc87\``);
        await queryRunner.query(`DROP TABLE \`photo\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
