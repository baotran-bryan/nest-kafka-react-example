import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import databaseConfig from './database.config';

dotenv.config();

const conf = config();
export const dataSource = new DataSource(conf.database);
