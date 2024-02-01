import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('streaming_events', { schema: 'edgedb' })
export class StreamingEvent {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('text', { name: 'message' })
  message: string;

  @CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
  updatedAt: Date;

  constructor(data: Partial<Event>) {
    Object.assign(this, data);
  }
}
