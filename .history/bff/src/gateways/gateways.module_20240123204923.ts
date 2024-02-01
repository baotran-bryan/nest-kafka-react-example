import { Module } from '@nestjs/common';
import { VideoStreamGateway } from './video-stream.gateway';

@Module({
  providers: [VideoStreamGateway],
  exports: [VideoStreamGateway],
})
export class GatewaysModule {}
