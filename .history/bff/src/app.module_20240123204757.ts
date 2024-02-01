import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './kafka/test.consumer';
import { EventsModule } from './gateways/events.module';

@Module({
  imports: [EventsModule, KafkaModule],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
