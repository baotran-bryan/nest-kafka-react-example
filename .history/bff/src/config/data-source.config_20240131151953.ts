import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import appConfig from './app.config';

const config = appConfig();

dotenv.config();

const appConf = appConfig();
export const dataSource = new DataSource(conf.database);
