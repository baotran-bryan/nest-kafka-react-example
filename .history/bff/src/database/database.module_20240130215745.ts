import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      useFactory: (config: ConfigService) => {
        return config.get('database') as DataSourceOptions;
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
