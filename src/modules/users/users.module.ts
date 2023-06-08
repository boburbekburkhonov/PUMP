import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt/dist';
import { UsersController } from './users.controller';
import { User, userSchema } from './schemas/users.schema';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '../auth/auth.module';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { LocalStrategy } from '../auth/strategy/local.strategy';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema: userSchema,
        },
      ],
      'User',
    ),
    PassportModule,
    JwtModule.register({
      secret: '1q2w3e4r',
    }),
  ],
  providers: [UsersService, AuthService, JwtStrategy, LocalStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
