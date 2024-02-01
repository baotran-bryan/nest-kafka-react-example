import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  logger: new Logger(),
  entities: [join(__dirname, '../**/database/entities', '*.{ts,js}')],
  migrations: [join(__dirname, '../**/database/migrations', '*.{ts,js}')],
}));
