import { join } from 'path';
import TypeOrmLogger from 'logging/typeorm.logger';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptions = (): DataSourceOptions => {
  return {
    type: 'postgres' as 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '5432', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    logger: new TypeOrmLogger(),
    entities: [join(__dirname, '../**/database/entities', '*.entity{.ts,.js}')],
    migrations: [join(__dirname, '../**/database/migrations', '*.{ts,js}')],
    migrationsRun: false,
  };
};
