import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProducerService } from './producer.service';
import { EventsModule } from 'src/gateways/gateways.module';

@Module({
  imports: [EventsModule],
  providers: [ProducerService, ConsumerService],
  exports: [ProducerService, ConsumerService],
})
export class KafkaModule {}
