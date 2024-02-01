import { dataSourceOptions } from "./database.config";

export default () => ({
  nodeEnv = process.env.NODE_ENV ?? '__NODE_ENV__',
  database: dataSourceOptions(),
  kafka: {
    host:
    port: 
  }
});