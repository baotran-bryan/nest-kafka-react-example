import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamingEvent } from 'database/entities/streaming-events.entity';
import { KafkaModule } from 'kafka/kafka.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([StreamingEvent]),
    KafkaModule,
  ],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
