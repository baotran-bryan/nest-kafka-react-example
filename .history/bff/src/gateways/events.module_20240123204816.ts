import { Module } from '@nestjs/common';
import { EventsGateway } from './video-stream.gateway';
import { EventsService } from './events.service';

@Module({
  providers: [EventsGateway, EventsService],
  exports: [EventsService, EventsGateway],
})
export class EventsModule {}
