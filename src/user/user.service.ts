import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number) {
    return await this.userRepository.findBy({ id });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
