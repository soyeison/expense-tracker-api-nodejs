import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  HttpCode,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  @ApiOperation({
    summary: 'Create one category',
    description: 'This endpoint allow you to create one category',
  })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get()
  @ApiOperation({
    summary: 'Get all categories',
    description: 'This endpoint allow you to get all categories',
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
  ) {
    return this.categoryService.findAll(limit, page);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get(':id')
  @ApiOperation({
    summary: 'Get one category by id',
    description: 'This endpoint allow you to get one category by id',
  })
  findById(@Param('id') id: string) {
    return this.categoryService.findById(+id);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Patch(':id')
  @ApiOperation({
    summary: 'Update one category',
    description:
      'This endpoint allow you to update one category by id and passing field that you want to update',
  })
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Delete(':id')
  @ApiOperation({
    summary: 'Delete one category',
    description: 'This endpoint allow you to delete one category by id',
  })
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
