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

  @Column('integer', { name: 'priority_level' })
  priorityLevel: number;

  @Column('text', { name: 'detection_detail' })
  detectionDetail: string;

  @Column('text', { name: 'event_description' })
  eventDescription: string;

  @Column('integer', { name: 'camera_id' })
  cameraID: number;

  @Column('text', { name: 'network_info' })
  networkInfo: NetworkInfo;
  adminUserInfo: AdminUserInfo;
  resolutionQuality: ResolutionQuality;
  additionalNotes: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;
}
