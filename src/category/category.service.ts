import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save({
      name: createCategoryDto.name,
    });
  }

  async findAll(limit: number = 5, page: number = 1) {
    const offset = (page - 1) * limit;
    return await this.categoryRepository.find({ skip: offset, take: limit });
  }

  async findById(id: number) {
    return await this.categoryRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.update(id, {
      name: updateCategoryDto.name,
    });
  }

  async remove(id: number) {
    return await this.categoryRepository.delete(id);
  }
}
