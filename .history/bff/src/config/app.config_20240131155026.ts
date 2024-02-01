import { dataSourceOptions } from './database';

export default () => ({
  nodeEnv: process.env.NODE_ENV ?? '__NODE_ENV__',
  database: dataSourceOptions(),
  kafka: {
    host: process.env.KAFKA_HOST,
    port: process.env.KAFKA_PORT,
  },
});
