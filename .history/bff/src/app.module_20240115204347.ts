import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'STREAMING_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'streaming',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'streaming-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
