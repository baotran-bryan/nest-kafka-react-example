import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEdgeSchema1706689922455 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createSchema('edgedb', true);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropSchema('edgedb', true);
  }
}
