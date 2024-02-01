import { Module } from '@nestjs/common';
import { VideoStreamGateway } from './video-stream.gateway';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [KafkaModule],
  providers: [VideoStreamGateway],
  exports: [VideoStreamGateway],
})
export class GatewaysModule {}
