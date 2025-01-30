import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { UserId } from 'src/decorator/user-id.decorator';
import { Filteroptions } from './dto/filter.dto';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @HttpCode(201)
  @Post()
  create(@UserId() userId: number, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(userId, createExpenseDto);
  }

  @HttpCode(200)
  @Get()
  findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('filter') filter?: Filteroptions,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.expenseService.findAll(filter, from, to, limit, page);
  }

  @HttpCode(200)
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.expenseService.findById(+id);
  }

  @HttpCode(201)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
