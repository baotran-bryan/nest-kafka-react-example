import dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import databaseConfig from './database.config';

dotenv.config();

export const dataSource = new DataSource(databaseConfig as DataSourceOptions);
