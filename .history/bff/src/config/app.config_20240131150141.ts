export default () => ({
  nodeEnv = process.env.NODE_ENV ?? '__NODE_ENV__',
  database: makeDataSourceOptions(process.env.ENVIRONMENT),
});