import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  username: process.env.username,
  password: process.env.DATABASE_HOST,
  database: process.env.DATABASE_HOST,
  entities: [], // Add your entities here
  synchronize: true,
}));
