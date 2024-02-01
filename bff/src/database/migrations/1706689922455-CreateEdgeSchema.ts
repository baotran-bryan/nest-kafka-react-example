import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEdgeSchema1706689922455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createSchema('edge', true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropSchema('edge', true);
  }
}
