import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Station, stationSchema } from '../station/schema/station.schema';
import { DataAll, dataAllSchema } from './schema/data.all.schema';
import { LastData, LastDataSchema } from './schema/lastdata.schema';

@Module({
  imports: [
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
          name: DataAll.name,
          schema: dataAllSchema,
        },
      ],
      'DataAll',
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
  ],
  controllers: [MqttController],
  providers: [MqttService],
})
export class MqttModule {}
