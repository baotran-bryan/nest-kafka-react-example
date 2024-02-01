import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from './database.config';

dotenv.config();

const conf = config();
export const dataSource = new DataSource(databaseConfig as DataSourceOptions);
