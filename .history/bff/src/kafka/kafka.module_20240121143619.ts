import { Module } from '@nestjs/common';
import { ProucerService } from './consumer.service';
import { ConsumerService } from './producer.service';

@Module({
    providers: [ProucerService, ConsumerService],
    exports: [ProucerService, ConsumerService],
})
export class KafkaModule {}
