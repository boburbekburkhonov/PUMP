import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { createDto } from './dto/create.dto';
import { updateDto } from './dto/update.dto';
import { loginDto } from './dto/login.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name, 'User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  // ! login -----
  async login(payload: loginDto): Promise<any> {

    const file = path.join(process.cwd(), 'users.json');
    const readStream = fs.createReadStream(file);
    readStream.on('data', async (chunk: any) => {
      const defaultUsers = await JSON.parse(chunk);

      const dUsername = process.env.DEFAULT_USERNAME;
      const dPassword = process.env.DEFAULT_PASSWORD;

      const dFindUser = await this.userModel.findOne({
        username: dUsername,
        password: dPassword,
      });
  
      if (!dFindUser) {
        await defaultUsers.map((e) => this.userModel.create(e));
      }
      
    })
    readStream.on('error', (err) => {throw new BadRequestException(err.message)});


    // FOUND USER
    const findUserf = await this.userModel.findOne(payload);

    if (!findUserf) {
      throw new NotFoundException('user not found');
    }

    return this.sign(String(findUserf._id));
  }

  //! GET USER
  async getUser(): Promise<User> {
    const foundUser: any = await this.userModel.find()

    return foundUser
  }

  // ! CREATE USER
  async createUser(payload: createDto): Promise<string> {
    const newUser = await this.userModel.create(payload);

    return this.sign(String(newUser._id));
  }

  sign(id: string): string {
    return this.jwtService.sign(id, {
      secret: '1q2w3e4r',
    });
  }

  // ! VALIDATE USER
  async validateUser(username: string, password: number): Promise<any> {
    return await this.userModel.find({ username, password });
  }

  // ! UPDATE USER
  async updateUser(id: string, payload: updateDto): Promise<User> {
    const foundUser = await this.userModel.findById(id);

    if (!foundUser) {
      throw new NotFoundException('Foydalanuvchi topilmadi!');
    }

    const updateUser: any = await this.userModel
      .findByIdAndUpdate({ _id: id }, payload)
      .catch((err: unknown) => console.log(err));

    if (updateUser) {
      return updateUser;
    }
  }

  // ! DELETE USER
  async deleteUser(id: string): Promise<User> {
    const foundUser = await this.userModel.findById(id);

    if (!foundUser) {
      throw new NotFoundException('Foydalanuvchi topilmadi!');
    }

    const deleteUser: any = await this.userModel
      .findByIdAndDelete(id)
      .catch((err: unknown) => console.log(err));

    if (deleteUser) {
      return deleteUser;
    }
  }
}
