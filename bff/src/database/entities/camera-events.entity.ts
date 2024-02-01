import { ApiProperty } from '@nestjs/swagger';
import {
  AdminUserInfo,
  CameraLocation,
  NetworkInfo,
  ResolutionQuality,
} from 'interface/event.interface';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('events', { schema: 'edge' })
export class CameraEvent {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('text', { name: 'event_time' })
  eventTime: string;

  @Column('text', { name: 'event_type' })
  eventType: string;

  @Column('jsonb', { name: 'camera_location' })
  cameraLocation: CameraLocation;

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

  @Column('jsonb', { name: 'network_info' })
  networkInfo: NetworkInfo;

  @Column('jsonb', { name: 'admin_info' })
  adminUserInfo: AdminUserInfo;

  @Column('jsonb', { name: 'resolution' })
  resolutionQuality: ResolutionQuality;

  @Column('text', { name: 'additional_note' })
  additionalNotes: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  constructor(data: Partial<Event>) {
    Object.assign(this, data);
  }
}
