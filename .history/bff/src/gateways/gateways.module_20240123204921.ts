import { Module } from '@nestjs/common';
import { VideoStreamGateway } from './video-stream.gateway';
import { EventsService } from './events.service';

@Module({
  providers: [VideoStreamGateway],
  exports: [VideoStreamGateway],
})
export class GatewaysModule {}
