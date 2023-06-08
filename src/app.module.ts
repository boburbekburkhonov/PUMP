import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'User',
    }),
    UsersModule,
    AuthModule,
    PassportModule,
  ],
})
export class AppModule {}
