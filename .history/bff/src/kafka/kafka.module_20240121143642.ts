import { Module } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import { ProucerService } from './producer.service';

@Module({
    providers: [ProucerService, ConsumerService],
    exports: [ProucerService, ConsumerService],
})
export class KafkaModule {}
