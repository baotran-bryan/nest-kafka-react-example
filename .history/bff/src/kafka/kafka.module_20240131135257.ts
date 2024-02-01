import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';
import { ConfigModule } from '@nestjs/config';
// import { GatewaysModule } from 'src/gateways/gateways.module';

@Module({
  imports: [ConfigModule],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
