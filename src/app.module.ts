import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { config } from './config';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AuthMiddlewareCreator } from './modules/middleware/role.checker.middleware';
import { RegionModule } from './modules/region/region.module';
import { DistrictModule } from './modules/district/district.module';
import { StationModule } from './modules/station/station.module';
import { BalansOrganizationModule } from './modules/balansOrganization/balans.organization.module';
import { RoleModule } from './modules/role/role.module';
import { MulterModule } from '@nestjs/platform-express';
import { MqttModule } from './modules/mqtt/mqtt.module';
import { UserStationsModule } from './modules/userStations/user.stations.module';

@Module({
  imports: [
    ConfigModule.forRoot(config),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'User',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'UserStations',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'Region',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'District',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'BalansOrganization',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'Station',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'Role',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'Data',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'LastData',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'YesterdayData',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'DailyData',
    }),
    MongooseModule.forRoot(process.env.MONGO_URL, {
      connectionName: 'MonthlyData',
    }),
    UsersModule,
    UserStationsModule,
    AuthModule,
    PassportModule,
    RegionModule,
    DistrictModule,
    StationModule,
    RoleModule,
    BalansOrganizationModule,
    MulterModule.register({
      dest: './uploads',
    }),
    MqttModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddlewareCreator({ value: 'admin' }))
      .forRoutes({ path: '/users/register', method: RequestMethod.POST });
    // consumer
    //   .apply(AuthMiddlewareCreator({ value: 'user' }))
    //   .forRoutes({ path: '/users/register', method: RequestMethod.POST });
  }
}
