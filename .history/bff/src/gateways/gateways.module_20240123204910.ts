import { Module } from '@nestjs/common';
import { VideoStreamGateway } from './video-stream.gateway';
import { EventsService } from './events.service';

@Module({
  providers: [EventsGateway, EventsService],
  exports: [EventsService, EventsGateway],
})
export class GatewaysModule {}
