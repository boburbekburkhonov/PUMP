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
import { loginDto } from './dto/login.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}


  @Post('login')
  login(@Body() body: loginDto): Promise<string> {
    return this.service.login(body)
  }


  @UseGuards(LocalGuard)
  @Post('register')
  register(@Body() body: createDto): Promise<string> {
    return this.service.createUser(body);
  }
}
