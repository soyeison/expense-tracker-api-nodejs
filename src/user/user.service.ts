import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
//import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save({
      firstName: createUserDto.firstName,
      lastName: createUserDto.lastName,
      username: createUserDto.username,
      password: createUserDto.password,
      isActive: true,
    });
  }

  async findAll(limit: number = 10, page: number = 1): Promise<User[]> {
    const offset = (page - 1) * limit;
    return await this.userRepository.find({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        isActive: true,
        password: false,
        createdAt: true,
        updatedAt: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }
}
