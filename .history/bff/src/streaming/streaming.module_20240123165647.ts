import { Module } from '@nestjs/common';
import { StreamingGateway } from './streaming.gateway';
import { SocketsCenter } from './streaming.service';

@Module({
  providers: [StreamingGateway, SocketsCenter],
  exports: [SocketsCenter],
})
export class GatewayModule {}
