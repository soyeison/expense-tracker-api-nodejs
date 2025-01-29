import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ExpenseModule } from './expense/expense.module';
import { Expense } from './expense/entities/expense.entity';
import { Category } from './category/entities/category.entity';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'supersecret',
      database: 'taskTracker',
      entities: [User, Expense, Category],
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    ExpenseModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
