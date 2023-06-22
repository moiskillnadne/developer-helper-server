import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserEntity1687474984858 implements MigrationInterface {
  name = 'UserEntity1687474984858'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP DEFAULT now(), "email" character varying NOT NULL, "cognitoId" character varying NOT NULL, "firstName" character varying, "lastName" character varying, CONSTRAINT "UQ_415c35b9b3b6fe45a3b065030f5" UNIQUE ("email"), CONSTRAINT "UQ_26e2419936b3dd3a902709c5803" UNIQUE ("cognitoId"), CONSTRAINT "PK_b54f8ea623b17094db7667d8206" PRIMARY KEY ("id"))`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user_entity"`)
  }
}
