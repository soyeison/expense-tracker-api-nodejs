import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryService } from 'src/category/category.service';
import { Filteroptions } from './dto/filter.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
    private readonly categoryService: CategoryService,
  ) {}

  async create(userId: number, createExpenseDto: CreateExpenseDto) {
    const category = await this.categoryService.findById(
      createExpenseDto.categoryId,
    );

    if (!category) {
      throw new BadRequestException('La categoria no existe');
    }

    return await this.expenseRepository.save({
      description: createExpenseDto.description,
      amount: createExpenseDto.amount,
      categoryId: createExpenseDto.categoryId,
      userId: userId,
    });
  }

  async findAll(
    filter?: Filteroptions,
    from?: string,
    to?: string,
    limit: number = 5,
    page: number = 1,
  ) {
    let fromDate: Date = new Date();
    let toDate: Date = new Date();

    if (filter) {
      if (filter == Filteroptions.week) {
        fromDate = new Date();
        fromDate = new Date(fromDate.setDate(fromDate.getDate() - 7));
      } else if (filter == Filteroptions.month) {
        fromDate = new Date();
        fromDate = new Date(fromDate.setMonth(fromDate.getMonth() - 1));
      } else if (filter == Filteroptions.three_months) {
        fromDate = new Date();
        fromDate = new Date(fromDate.setMonth(fromDate.getMonth() - 3));
      }
    } else if (from && to) {
      fromDate = new Date(from);
      toDate = new Date(to);
      if (fromDate > toDate) {
        throw new BadRequestException('Parametros invalidos');
      }
    } else {
      fromDate = new Date();
      fromDate = new Date(fromDate.setDate(fromDate.getDate() - 7));
    }

    const offset = (page - 1) * limit;

    return await this.expenseRepository.find({
      where: { createdAt: Between(fromDate, toDate) },
      order: { createdAt: 'DESC' },
      skip: offset,
      take: limit,
    });
  }

  async findById(id: number) {
    return await this.expenseRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    await this.expenseRepository.update(id, { ...updateExpenseDto });
    return await this.expenseRepository.findOne({
      where: { id },
      relations: {
        category: true,
      },
    });
  }

  async remove(id: number) {
    await this.expenseRepository.delete(id);
    return {
      id,
    };
  }
}
