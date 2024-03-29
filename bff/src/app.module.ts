import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KafkaModule } from './kafka/kafka.module';
import { TestConsumer } from './kafka/test.consumer';
import { GatewaysModule } from './gateways/gateways.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';
import { EventModule } from './event/event.module';
import appConfig from 'config/app.config';

@Module({
  imports: [
    GatewaysModule,
    KafkaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return config.get('database') as DataSourceOptions;
      },
      inject: [ConfigService],
    }),
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService, TestConsumer],
})
export class AppModule {}
