import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableEvents1706695709216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "edge"."events" ("id" SERIAL PRIMARY KEY, "event_time" TIMESTAMP, "event_type" VARCHAR(255), "camera_location" JSONB, "image_video" VARCHAR(255), "priority_level" VARCHAR(50), "detection_detail" TEXT, "event_description" TEXT, "camera_id" INTEGER, "network_info" JSONB, "admin_info" JSONB, "resolution" JSONB, "additional_note" TEXT, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now())`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "edge"."events"`, undefined);
  }
}
