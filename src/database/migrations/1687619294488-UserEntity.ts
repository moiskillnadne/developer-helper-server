import { MigrationInterface, QueryRunner } from 'typeorm'

export class UserEntity1687619294488 implements MigrationInterface {
  name = 'UserEntity1687619294488'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" ADD "username" character varying NOT NULL`)
    await queryRunner.query(
      `ALTER TABLE "user_entity" ADD CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e" UNIQUE ("username")`,
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_entity" DROP CONSTRAINT "UQ_9b998bada7cff93fcb953b0c37e"`)
    await queryRunner.query(`ALTER TABLE "user_entity" DROP COLUMN "username"`)
  }
}
