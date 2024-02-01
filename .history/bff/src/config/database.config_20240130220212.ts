import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('DATABASE', () => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logger: new Logger(),
  entities: [join(__dirname, '../**/database/entities', '*.{ts,js}')],
  migrations: [join(__dirname, '../**/database/migrations', '*.{ts,js}')],
}));
