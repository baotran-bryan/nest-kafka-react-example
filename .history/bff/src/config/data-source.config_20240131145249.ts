import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import databaseConfig from './database.config';

dotenv.config();

export const dataSource = new DataSource(databaseConfig);
