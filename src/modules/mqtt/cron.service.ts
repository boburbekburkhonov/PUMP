import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import {
  YesterdayData,
  YesterdayDataDocument,
} from './schema/yesterday.data.schema';
import { Model } from 'mongoose';
import { Data, DataDocument } from './schema/data.schema';
import { DailyData, DailyDataDocument } from './schema/daily.data.schema';

@Injectable()
export class CronService {
  constructor(
    @InjectModel(Data.name, 'Data')
    private readonly dataModel: Model<DataDocument>,
    @InjectModel(YesterdayData.name, 'YesterdayData')
    private readonly yesterdayDataModel: Model<YesterdayDataDocument>,
    @InjectModel(DailyData.name, 'DailyData')
    private readonly dailyDataModel: Model<DailyDataDocument>,
  ) {}

  @Cron('* * * * * *')
  async filterData() {
    //! YESTERDAY DATA DATE
    let startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);

    let endDate = new Date();
    endDate.setUTCHours(23, 59, 59, 999);

    //! YESTERDAY DATA
    const foundPresentData = await this.dataModel.find({
      time: {
        $gte: startDate,
        $lt: endDate,
      },
    });

    foundPresentData.forEach(async (e) => {
      const yesterdayData = new this.yesterdayDataModel({
        stationId: e.stationId,
        time: e.time,
        totuleFlow: e.totuleFlow,
        positiveFlow: e.positiveFlow,
        flowRate: e.flowRate,
        velocity: e.velocity,
        isWrite: e.isWrite,
      });

      await yesterdayData.save();
    });

    // ! DAILY DATA
    const dailyData = await this.dataModel.aggregate([
      {
        $group: {
          _id: {
            time: '$time',
            stationId: '$stationId',
          },
          time: {
            $first: '$time',
          },
          stationId: {
            $first: '$stationId',
          },
          isWrite: {
            $first: '$isWrite',
          },
          totuleFlowMax: {
            $max: '$totuleFlow',
          },
          totuleFlowMin: {
            $min: '$totuleFlow',
          },
          totuleFlowAvg: {
            $avg: '$totuleFlow',
          },
          positiveFlowMax: {
            $max: '$positiveFlow',
          },
          positiveFlowMin: {
            $min: '$positiveFlow',
          },
          positiveFlowAvg: {
            $avg: '$positiveFlow',
          },
          flowRateMax: {
            $max: '$flowRate',
          },
          flowRateMin: {
            $min: '$flowRate',
          },
          flowRateAvg: {
            $avg: '$flowRate',
          },
          velocityMax: {
            $max: '$velocity',
          },
          velocityMin: {
            $min: '$velocity',
          },
          velocityAvg: {
            $avg: '$velocity',
          },
        },
      },
    ]);

    // dailyData.forEach(async (e) => {
    //   const foundDailyData = await this.dailyDataModel.findOne({
    //     stationId: e,
    //   });
    // });
  }
}
