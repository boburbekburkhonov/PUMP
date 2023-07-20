import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { LocalGuard } from '../auth/guard/local.guard';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';
import { User } from './schemas/users.schema';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { loginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Get('get/:id')
  getUserById(@Param('id') id: string): Promise<User> {
    return this.service.getUserById(id);
  }

  @Get('get')
  getUser(): Promise<User> {
    return this.service.getUser();
  }

  @Post('login')
  login(@Body() body: loginDto): Promise<string> {
    return this.service.login(body);
  }

  @UseGuards(LocalGuard)
  @Post('register')
  register(@Body() body: createDto): Promise<string> {
    return this.service.createUser(body);
  }

  @UseGuards(JwtGuard)
  @Patch('update/:id')
  updateUser(@Param('id') id: string, @Body() body: updateDto): Promise<User> {
    return this.service.updateUser(id, body);
  }

  @UseGuards(JwtGuard)
  @Delete('delete/:id')
  deleteUser(@Param('id') id: string): Promise<User> {
    return this.service.deleteUser(id);
  }
}
