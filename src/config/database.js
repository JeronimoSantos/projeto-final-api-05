import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const isTest = process.env.NODE_ENV === 'test';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: isTest ? ':memory:' : (process.env.DB_STORAGE || './database.sqlite'),
  logging: false,
});

export async function setupDatabase() {
  await sequelize.sync({ force: true });
}

export async function closeDatabase() {
  await sequelize.close();
}

export default sequelize;
