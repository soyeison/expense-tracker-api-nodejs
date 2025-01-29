import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(userId: number, createExpenseDto: CreateExpenseDto) {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new BadRequestException('el usuario no existe');
    }
    const category = await this.categoryService.findById(
      createExpenseDto.categoryId,
    );

    if (!category) {
      throw new BadRequestException('La categoria no existe');
    }

    return await this.expenseRepository.save({
      description: createExpenseDto.description,
      category: category,
      user: user,
      amount: createExpenseDto.amount,
    });
  }

  findAll() {
    return `This action returns all expense`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
