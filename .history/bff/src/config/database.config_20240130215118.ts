import { Logger } from '@nestjs/common';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logger: new Logger,
  entities: [join(__dirname, '../**/database/herodotus/entity', '*.{ts,js}')],
  migrations: [
    join(__dirname, '../**/database/herodotus/migration', '*.{ts,js}'),
  ],
}));
