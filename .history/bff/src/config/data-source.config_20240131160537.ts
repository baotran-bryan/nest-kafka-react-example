import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import appConfig from './app.config';

dotenv.config();

const appConf = appConfig();
export const dataSource = new DataSource(appConf.database);
dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });