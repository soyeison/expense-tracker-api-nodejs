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
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  @ApiOperation({
    summary: 'Create expense',
    description: 'This endpoint allow you to create an expense',
  })
  create(@UserId() userId: number, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(userId, createExpenseDto);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get()
  @ApiOperation({
    summary: 'Get all expenses',
    description: 'This endpoint allow you to get all expense with many filters',
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'filter', enum: Filteroptions, required: false })
  @ApiQuery({ name: 'from', required: false })
  @ApiQuery({ name: 'to', required: false })
  findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
    @Query('filter') filter?: Filteroptions,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.expenseService.findAll(filter, from, to, limit, page);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get(':id')
  @ApiOperation({
    summary: 'Get an expense by id',
    description: 'This endpoint allow you to get an expense by id',
  })
  findById(@Param('id') id: string) {
    return this.expenseService.findById(+id);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update an expense',
    description:
      'This endpoint allow you to update an expense by id and sending fields that you want update',
  })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(+id, updateExpenseDto);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete an expense',
    description: 'This endpoint allow you to delete an expense by id',
  })
  remove(@Param('id') id: string) {
    return this.expenseService.remove(+id);
  }
}
