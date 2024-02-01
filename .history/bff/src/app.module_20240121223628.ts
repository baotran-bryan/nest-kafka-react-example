import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './kafka/test.consumer';
import { EventsModule } from './gateways/gateway.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STREAMING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'streaming',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'streaming-consumer',
          },
        },
      },
    ]),
    EventsModule,
    KafkaModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}