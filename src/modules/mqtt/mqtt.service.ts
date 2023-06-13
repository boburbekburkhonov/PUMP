import { Injectable, OnModuleInit } from '@nestjs/common';
import { IMqttConnectOptions } from 'src/types';
import * as mqtt from 'mqtt';
import { Station, StationDocument } from '../station/schema/station.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataAll, DataAllDocument } from './schema/data.all.schema';
import { LastData, LastDataDocument } from './schema/lastdata.schema';

@Injectable()
export class MqttService implements OnModuleInit {
  constructor(
    @InjectModel(Station.name, 'Station')
    private readonly stationModel: Model<StationDocument>,
    @InjectModel(DataAll.name, 'DataAll')
    private readonly dataAllModel: Model<DataAllDocument>,
    @InjectModel(LastData.name, 'LastData')
    private readonly lastDataModel: Model<LastDataDocument>,
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
              const timeMonth: number = Number(dataArr[1].split('/')[1]) - 1;
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
              const timeForFetch = `${timeYear}${timeMonth}${timeData}${timeHour}${timeMinute}`;

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
                  fetch('89.236.195.198:4010', {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                      code: topic,
                      data: {
                        avg_level: flowRate,
                        volume: totuleFlow,
                        vaqt: timeForFetch,
                      },
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => console.log(data));

                  await this.lastDataModel.findOneAndUpdate(
                    { stationId: existStationModel._id },
                    {
                      stationId: existStationModel._id,
                      time: time,
                      totuleFlow: totuleFlow,
                      positiveFlow: positiveFlow,
                      flowRate: flowRate,
                      velocity: velocity,
                      isWrite: false,
                    },
                  );

                  await this.dataAllModel.create({
                    stationId: existStationModel._id,
                    time: time,
                    totuleFlow: totuleFlow,
                    positiveFlow: positiveFlow,
                    flowRate: flowRate,
                    velocity: velocity,
                    isWrite: false,
                  });
                } else {
                  fetch('89.236.195.198:4010', {
                    method: 'POST',
                    headers: {
                      'content-type': 'application/json',
                    },
                    body: JSON.stringify({
                      code: topic,
                      data: {
                        avg_level: flowRate,
                        volume: totuleFlow,
                        vaqt: timeForFetch,
                      },
                    }),
                  })
                    .then((res) => res.json())
                    .then((data) => console.log(data));

                  await this.lastDataModel.create({
                    stationId: existStationModel._id,
                    time: time,
                    totuleFlow: totuleFlow,
                    positiveFlow: positiveFlow,
                    flowRate: flowRate,
                    velocity: velocity,
                    isWrite: false,
                  });

                  await this.dataAllModel.create({
                    stationId: existStationModel._id,
                    time: time,
                    totuleFlow: totuleFlow,
                    positiveFlow: positiveFlow,
                    flowRate: flowRate,
                    velocity: velocity,
                    isWrite: false,
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
