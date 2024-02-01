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

  @Column()
  eventTime: string;

  @Column()
  eventType: Date;

  // Add more columns as needed

  // Add relationships with other entities here
}
