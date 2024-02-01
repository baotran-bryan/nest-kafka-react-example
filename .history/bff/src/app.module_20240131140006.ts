import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './kafka/test.consumer';
import { GatewaysModule } from './gateways/gateways.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    GatewaysModule,
    KafkaModule,
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
