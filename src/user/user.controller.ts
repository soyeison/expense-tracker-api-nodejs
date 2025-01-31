import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @HttpCode(201)
  @Post()
  @ApiOperation({
    summary: 'Create user',
    description: 'This endpoint allow you to create one user',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'This endpoint allow you to get all users',
  })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'page', required: false })
  findAll(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
    @Query('page', new ParseIntPipe({ optional: true })) page?: number,
  ) {
    return this.userService.findAll(limit, page);
  }

  @ApiBearerAuth()
  @HttpCode(200)
  @Get(':id')
  @ApiOperation({
    summary: 'Get on user by id',
    description: 'This endpoint allow you to get one user by id',
  })
  findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }
}
