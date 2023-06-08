import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/users.schema';
import { JwtService } from '@nestjs/jwt';
import { createDto, loginDto } from './dto/create.dto';
import { log } from 'console';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name, 'User')
    private readonly userModel: Model<UserDocument>,
  ) {}

  // ! login -----
  async login (payload: loginDto): Promise<any> {

    const defaultUsers = [
      {
        name:"super admin",
        username: "super admin",
        password: "123456",
        telephone:"123",
        role:"superAdmin"
      },
      {
        name:"admin",
        username: "admin",
        password: "123",
        telephone:"123",
        role:"admin"
      },
      {
        name:"nodir",
        username: "nodirbek",
        password: "123",
        telephone:"123",
        role:"user"
      },
    ]

    const dUsername ='super admin'
    const dPassword ='123456'

    const dFindUser = await this.userModel.findOne({ username: dUsername, password: dPassword })


    if(!dFindUser){
      await defaultUsers.map(e=> this.userModel.create(e))
    }

    // ---
    const findUserf = await this.userModel.findOne(payload)

    if(!findUserf){
      throw new NotFoundException('user not fount')
    }
   
    console.log(findUserf);
    
    return this.sign(String(findUserf._id));

  }

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
