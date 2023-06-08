import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { createDto } from './dto/create.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name, 'User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(payload: createDto): Promise<string> {
    const newUser = await this.userModel.create(payload);

    return this.sign(String(newUser._id));
  }

  sign(id: string): string {
    return this.jwtService.sign(id, {
      secret: '1q2w3e4r',
    });
  }

  async validateUser(username: string, password: number): Promise<any> {
    return await this.userModel.find({ username, password });
  }
}
