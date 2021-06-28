import { ConnectionOptions } from 'typeorm';
import DatabaseConfig from './db.config';
import * as dotenv from 'dotenv';
dotenv.config();
const typeormConfig = DatabaseConfig() as ConnectionOptions;
export default typeormConfig;
