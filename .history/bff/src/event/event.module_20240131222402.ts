import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamingEvent } from 'database/entities/streaming-events.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StreamingEvent])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
