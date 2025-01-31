import { config } from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { Category } from './../category/entities/category.entity';
import { Expense } from './../expense/entities/expense.entity';
import { User } from './../user/entities/user.entity';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  entities: [User, Expense, Category],
  synchronize: true,
};
