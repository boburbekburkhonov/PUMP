import { Injectable, OnModuleInit } from '@nestjs/common';
import { IMqttConnectOptions } from 'src/types';
import * as mqtt from 'mqtt';
import { Station, StationDocument } from '../station/schema/station.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data, DataDocument } from './schema/data.schema';
import { LastData, LastDataDocument } from './schema/lastdata.schema';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class MqttService implements OnModuleInit {
  constructor(
    @InjectModel(Station.name, 'Station')
    private readonly stationModel: Model<StationDocument>,
    @InjectModel(Data.name, 'Data')
    private readonly dataAllModel: Model<DataDocument>,
    @InjectModel(LastData.name, 'LastData')
    private readonly lastDataModel: Model<LastDataDocument>,
    private readonly httpService: HttpService,
  ) {}

  private options: IMqttConnectOptions = {
    clean: true,
    connectTimeout: 4000,
    host: '185.196.214.190',
    port: 1883,
    username: 'emqx',
    password: '12345',
  };

  private topic: string = '+/:CWTIO-RTU';

  private mqttClient: any;

  // !MQTT CONNECT
  onModuleInit() {
    this.mqttClient = mqtt.connect(this.options);

    this.mqttClient.on('connect', (): void => {
      this.mqttClient.subscribe(this.topic);
      console.log('Connected');
    });

    this.mqttClient.on('error', (error: unknown): void => {
      console.log(error);
    });

    this.mqttClient.on(
      'message',
      async (topic: string, payload: string): Promise<void> => {
        try {
          const data = payload.toString();

          if (data.split('/')[1] == 'RG4123') {
            const dataArr = data.split('R');
            const topic = dataArr[0]?.slice(1, dataArr[0].length);
            const existStationModel = await this.stationModel.findOne({
              topic: topic,
            });

            if (existStationModel) {
              console.log(dataArr);
              const timeYear = new Date().getFullYear();
              const timeMonth: number = Number(dataArr[1].split('/')[1]);
              const timeData: number = Number(
                dataArr[1].split('/')[2]?.slice(0, 2),
              );
              const timeHour: number = Number(
                dataArr[1].split(' ')[1].slice(0, 2),
              );
              const timeMinute: number = Number(
                dataArr[1].split(' ')[1].slice(3, 5),
              );
              const time = new Date(
                timeYear,
                timeMonth,
                timeData,
                timeHour,
                timeMinute,
              );

              const timeForFetch = `${timeYear}${
                timeMonth < 10 ? '0' + timeMonth : timeMonth
              }${timeData < 10 ? '0' + timeData : timeData}${
                timeHour < 10 ? '0' + timeHour : timeHour
              }${timeMinute < 10 ? '0' + timeMinute : timeMinute}`;

              time.setHours(time.getHours() + 5);

              const foundLastData: any = await this.lastDataModel.find({
                stationId: existStationModel._id,
              });

              const [filterLastData] = foundLastData.filter(
                (e: any) => time.getTime() == e.time.getTime(),
              );
              console.log(filterLastData);

              if (!filterLastData) {
                const flowRate = dataArr[3]?.slice(0, dataArr[3].indexOf(','));
                const velocity = dataArr[4]?.slice(0, dataArr[4].indexOf(','));
                const totuleFlow = dataArr[6]?.slice(
                  0,
                  dataArr[6].indexOf(','),
                );
                const positiveFlow = dataArr[8]?.slice(
                  0,
                  dataArr[8].indexOf(','),
                );

                const existingLastData = await this.lastDataModel.findOne({
                  stationId: existStationModel._id,
                });

                if (existingLastData) {
                  const url = 'http://89.236.195.198:4010/';
                  const data = {
                    code: topic,
                    data: {
                      avg_level: flowRate,
                      volume: totuleFlow,
                      vaqt: timeForFetch,
                    },
                  };
                  const request = await this.httpService
                    .post(url, data)
                    .pipe(map((res) => res.data));

                  const response = await lastValueFrom(request);

                  console.log(response);

                  await this.lastDataModel.findOneAndUpdate(
                    { stationId: existStationModel._id },
                    {
                      stationId: existStationModel._id,
                      time: time,
                      totuleFlow: totuleFlow,
                      positiveFlow: positiveFlow,
                      flowRate: flowRate,
                      velocity: velocity,
                      isWrite: response.message == 'OK' ? true : false,
                    },
                  );
                  await this.dataAllModel.create({
                    stationId: existStationModel._id,
                    time: time,
                    totuleFlow: totuleFlow,
                    positiveFlow: positiveFlow,
                    flowRate: flowRate,
                    velocity: velocity,
                    isWrite: response.message == 'OK' ? true : false,
                  });
                } else {
                  const url = 'http://89.236.195.198:4010/';
                  const data = {
                    code: topic,
                    data: {
                      avg_level: 0,
                      volume: 135141.6875,
                      vaqt: 202306121344,
                    },
                  };
                  const request = await this.httpService
                    .post(url, data)
                    .pipe(map((res) => res.data));

                  const response = await lastValueFrom(request);

                  console.log(response);

                  await this.lastDataModel.create({
                    stationId: existStationModel._id,
                    time: time,
                    totuleFlow: totuleFlow,
                    positiveFlow: positiveFlow,
                    flowRate: flowRate,
                    velocity: velocity,
                    isWrite: response.message == 'OK' ? true : false,
                  });

                  await this.dataAllModel.create({
                    stationId: existStationModel._id,
                    time: time,
                    totuleFlow: totuleFlow,
                    positiveFlow: positiveFlow,
                    flowRate: flowRate,
                    velocity: velocity,
                    isWrite: response.message == 'OK' ? true : false,
                  });
                }
              }
            }
          }
        } catch (err: unknown) {
          console.log(err);
        }
      },
    );
  }
}
