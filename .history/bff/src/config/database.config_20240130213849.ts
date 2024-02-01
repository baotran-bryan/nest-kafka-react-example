import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
  entities: [], // Add your entities here
  synchronize: true,
}));
