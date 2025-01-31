import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Expense } from './entities/expense.entity';
import { CategoryModule } from 'src/category/category.module';
import { AuthGuard } from 'src/guard/auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Expense]), CategoryModule],
  controllers: [ExpenseController],
  providers: [
    ExpenseService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
  ],
})
export class ExpenseModule {}
