import 'dotenv/config';
import { Dialect, Sequelize } from 'sequelize';
import getEnvVar from './getEnvVar';

export const sequelize = new Sequelize(
  getEnvVar('DB_NAME'),
  getEnvVar('DB_USERNAME'),
  getEnvVar('DB_PASSWORD', false),
  {
    host: getEnvVar('DB_HOST'),
    port: parseInt(getEnvVar('DB_PORT'), 10),
    dialect: getEnvVar('DB_DIALECT') as Dialect,
  },
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};
