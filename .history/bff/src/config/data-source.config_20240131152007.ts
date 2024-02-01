import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import appConfig from './app.config';

dotenv.config();

const appConf = appConfig();
export const dataSource = new DataSource(appConf.database);
