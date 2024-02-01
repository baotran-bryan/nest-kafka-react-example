import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './kafka/test.consumer';
import { EventsModule } from './events/events.module';

@Module({
  imports: [
    EventsModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
