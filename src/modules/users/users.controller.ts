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

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseGuards(LocalGuard)
  @Post('register')
  register(@Body() body: createDto): Promise<string> {
    return this.service.createUser(body);
  }
}
