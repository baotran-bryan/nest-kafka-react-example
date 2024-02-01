import { Module } from '@nestjs/common';
import { EventsGateway } from './events.gateway';
import { SocketsCenter } from './socket-center.service';

@Module({
  providers: [EventsGateway, SocketsCenter],
  exports: [SocketsCenter],
})
export class EventsModule {}
