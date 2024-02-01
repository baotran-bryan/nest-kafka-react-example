import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableEvents1706695709216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        ``,
        undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
