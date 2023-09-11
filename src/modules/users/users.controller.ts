import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async getSingleUser (@Param('id') id: number, @Body() user: User): Promise<any> {
    return this.usersService.findOne(id);
    
  }

  @Post()
  @HttpCode(201) 
  async create(@Body() user: User): Promise<User> {
    const createdUser = await this.usersService.create(user);
    return createdUser;
  }

  @Put(':id')
  async update (@Param('id') id: number, @Body() user: User): Promise<any> {
    await this.usersService.update(id, user);
    return { message: 'User updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException('User does not exist!');
    }

    await this.usersService.delete(id);
    return { message: 'User deleted successfully' };
  }
}