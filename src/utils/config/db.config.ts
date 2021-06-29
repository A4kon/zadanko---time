//TODO: Refactore migration making process
const DatabaseConfig = () => ({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME || 'test',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  entities: ['dist/utils/entity/*.entity.js'],
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
});

export default DatabaseConfig;
