import DatabaseConfig from './db.config';

export default () => ({
  env: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  port: parseInt(process.env.PORT) || 3000,
  db: {
    ...DatabaseConfig(),
  },
});
