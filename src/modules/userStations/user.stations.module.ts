import { Module } from '@nestjs/common';
import { UserStationsService } from './user.stations.service';
import { UserStationsController } from './user.stations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserStations,
  userStationsSchema,
} from './schema/user.stations.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Station, stationSchema } from '../station/schema/station.schema';
import { LastData, LastDataSchema } from '../mqtt/schema/lastdata.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: UserStations.name,
          schema: userStationsSchema,
        },
      ],
      'UserStations',
    ),
    MongooseModule.forFeature(
      [
        {
          name: Station.name,
          schema: stationSchema,
        },
      ],
      'Station',
    ),
    MongooseModule.forFeature(
      [
        {
          name: LastData.name,
          schema: LastDataSchema,
        },
      ],
      'LastData',
    ),
    PassportModule,
    JwtModule.register({
      secret: '1q2w3e4r',
    }),
  ],
  providers: [UserStationsService],
  controllers: [UserStationsController],
})
export class UserStationsModule {}
