import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('events', { schema: 'edgedb' })
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventTime: string;

  @Column()
  eventType: Date;

  // Add more columns as needed

  // Add relationships with other entities here
}