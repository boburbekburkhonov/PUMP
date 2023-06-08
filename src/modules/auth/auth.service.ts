import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../users/schemas/users.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly service: UsersService) {}

  async validateUsers(username: string, password: number): Promise<any> {
    return await this.service.validateUser(username, password);
  }
}
