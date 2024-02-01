import { Logger } from '@nestjs/common';
import { join } from 'path';

import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions = (): DataSourceOptions => {
  return {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logger: new Logger(),
    entities: [join(__dirname, '../**/database/entities', '*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../**/database/migrations', '*.{ts,js}')],
    migrationsRun: false,
  };
};
