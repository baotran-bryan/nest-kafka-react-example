import dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import appConfig from './app.config';

dotenv.config();

const appConf = appConfig();
export const AppDataSource = new DataSource(appConf.database as DataSourceOptions);
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
