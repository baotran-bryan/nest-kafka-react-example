import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        console.log(config.get('database'));
        return config.get('database') as DataSourceOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
