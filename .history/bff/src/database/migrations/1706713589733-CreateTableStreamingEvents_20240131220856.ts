import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableStreamingEvents1706713589733
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "edge"."streaming_events" ("id" SERIAL PRIMARY KEY, "message" TEXT, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ecoai"."streaming_events"`, undefined);
  }
}
