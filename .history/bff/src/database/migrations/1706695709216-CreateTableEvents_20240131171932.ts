import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableEvents1706695709216 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "edgedb"."events" ("id" SERIAL PRIMARY KEY, "event_time" TIMESTAMP, event_type VARCHAR(255), cameraLocationName VARCHAR(255), cameraLocationLatitude DOUBLE PRECISION, cameraLocationLongitude DOUBLE PRECISION, imageVideo VARCHAR(255), priorityLevel VARCHAR(50), detectionDetails TEXT, eventDescription TEXT, cameraID VARCHAR(100), networkRelatedCameras TEXT, networkStatus VARCHAR(50), adminUserID VARCHAR(100), adminUserNotificationStatus VARCHAR(50), resolutionQualityResolution VARCHAR(50), resolutionQualityQuality VARCHAR(50), additionalNotes TEXT)`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}