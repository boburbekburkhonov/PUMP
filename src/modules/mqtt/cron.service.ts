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

  @Cron('38 12 * * *')
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
        $project: {
          day: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$time',
            },
          },
          stationId: '$stationId',
          totuleFlow: '$totuleFlow',
          positiveFlow: '$positiveFlow',
          flowRate: '$flowRate',
          velocity: '$velocity',
        },
      },
      {
        $group: {
          _id: {
            day: '$day',
            stationId: '$stationId',
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
          date: {
            $first: '$day',
          },
          stationId: {
            $first: '$stationId',
          },
        },
      },
    ]);
    console.log(dailyData);

    dailyData.forEach(async (e) => {
      const foundDailyData = await this.dailyDataModel.findOne({
        stationId: e.stationId,
      });

      if (foundDailyData) {
        await this.dailyDataModel.findOneAndUpdate(
          { stationId: e.stationId },
          {
            stationId: e.stationId,
            time: e.date,
            totuleFlowMax: (foundDailyData.totuleFlowMax + e.totuleFlowMax) / 2,
            totuleFlowMin: (foundDailyData.totuleFlowMin + e.totuleFlowMin) / 2,
            totuleFlowAvg: (foundDailyData.totuleFlowAvg + e.totuleFlowAvg) / 2,
            positiveFlowMax:
              (foundDailyData.positiveFlowMax + e.positiveFlowMax) / 2,
            positiveFlowMin:
              (foundDailyData.positiveFlowMin + e.positiveFlowMin) / 2,
            positiveFlowAvg:
              (foundDailyData.positiveFlowAvg + e.positiveFlowAvg) / 2,
            flowRateMax: (foundDailyData.flowRateMax + e.flowRateMax) / 2,
            flowRateMin: (foundDailyData.flowRateMin + e.flowRateMin) / 2,
            flowRateAvg: (foundDailyData.flowRateAvg + e.flowRateAvg) / 2,
            velocityMax: (foundDailyData.velocityMax + e.velocityMax) / 2,
            velocityMin: (foundDailyData.velocityMin + e.velocityMin) / 2,
            velocityAvg: (foundDailyData.velocityAvg + e.velocityAvg) / 2,
          },
        );
      } else {
        const dailyData = new this.dailyDataModel({
          stationId: e.stationId,
          time: e.date,
          totuleFlowMax: e.totuleFlowMax,
          totuleFlowMin: e.totuleFlowMin,
          totuleFlowAvg: e.totuleFlowAvg,
          positiveFlowMax: e.positiveFlowMax,
          positiveFlowMin: e.positiveFlowMin,
          positiveFlowAvg: e.positiveFlowAvg,
          flowRateMax: e.flowRateMax,
          flowRateMin: e.flowRateMin,
          flowRateAvg: e.flowRateAvg,
          velocityMax: e.velocityMax,
          velocityMin: e.velocityMin,
          velocityAvg: e.velocityAvg,
        });

        await dailyData.save();
      }
    });
  }
}
