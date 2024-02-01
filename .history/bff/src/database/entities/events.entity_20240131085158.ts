import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('events', { schema: 'edgedb' })
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('text', { name: 'event_time' })
  eventTime: string;

  @Column('text', { name: 'event_time' })
  eventType: Date;

  @Column('text', { name: 'camera_location' })
  cameraLocation: string;

  @Column('text', { name: 'image_video' })
  imageVideo: string;

  @Column('integer', { name: 'image_video' })
  priorityLevel: number;
  detectionDetails: string;
  eventDescription: string;
  cameraID: string;
  networkInfo: NetworkInfo;
  adminUserInfo: AdminUserInfo;
  resolutionQuality: ResolutionQuality;
  additionalNotes: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
