import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Station, stationSchema } from '../station/schema/station.schema';
import { Data, dataSchema } from './schema/data.schema';
import { LastData, LastDataSchema } from './schema/lastdata.schema';
import { HttpModule } from '@nestjs/axios';
import { CronService } from './cron.service';
import {
  YesterdayData,
  YesterdayDataSchema,
} from './schema/yesterday.data.schema';
import { DailyData, dailyDataSchema } from './schema/daily.data.schema';

@Module({
  imports: [
    HttpModule,
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
          name: Data.name,
          schema: dataSchema,
        },
      ],
      'Data',
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
    MongooseModule.forFeature(
      [
        {
          name: YesterdayData.name,
          schema: YesterdayDataSchema,
        },
      ],
      'YesterdayData',
    ),
    MongooseModule.forFeature(
      [
        {
          name: DailyData.name,
          schema: dailyDataSchema,
        },
      ],
      'DailyData',
    ),
    ScheduleModule.forRoot(),
  ],
  controllers: [MqttController],
  providers: [MqttService, CronService],
})
export class MqttModule {}
