import { Module } from '@nestjs/common';
import { StreamingGateway } from './events.gateway';
import { EventsService } from './events.service';

@Module({
  providers: [StreamingGateway, EventsService],
  exports: [EventsService],
})
export class GatewayModule {}
