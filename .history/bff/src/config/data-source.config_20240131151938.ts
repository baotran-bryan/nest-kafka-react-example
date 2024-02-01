import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import appConfig from './app.config';

const config = appConfig();

dotenv.config();

const conf = config();
export const dataSource = new DataSource(conf.database);
